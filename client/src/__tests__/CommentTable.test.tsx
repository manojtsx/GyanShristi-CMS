import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentTable from "@/components/common-component/CommentTable";
import { useAuth } from "@/context/AuthContext";
import Pagination from "@/components/mini-component/Pagination";

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/components/mini-component/Pagination", () => {
  return jest.fn(({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  ));
});

global.fetch = jest.fn();

const mockComments = [
  {
    _id: "1",
    user: { email: "user1@example.com", name: "User One", username: "user1" },
    content: { title: "Post One", description: "Post Description One" },
    description: "First comment",
    created_at: "2024-06-01T12:00:00Z",
  },
  {
    _id: "2",
    user: { email: "user2@example.com", name: "User Two", username: "user2" },
    content: { title: "Post Two", description: "Post Description Two" },
    description: "Second comment",
    created_at: "2024-06-02T12:00:00Z",
  },
];

describe("CommentTable Component", () => {
  const mockToken = "test-token";

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: mockToken });
    jest.clearAllMocks();
  });

  it("fetches and displays comments", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ comments: mockComments }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ comments: [] }),
      });

    render(<CommentTable />);

    await waitFor(() => expect(screen.getByText("User One")).toBeInTheDocument());

    await waitFor(() => {
      expect(screen.getByText("User One")).toBeInTheDocument();
      expect(screen.getByText("Post One")).toBeInTheDocument();
      expect(screen.getByText("First comment")).toBeInTheDocument();
    });
  });

  it("handles search input", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ comments: mockComments }),
    });

    render(<CommentTable />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "User One" } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("search=User One"),
        expect.anything()
      );
    });
  });

  it("handles pagination", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ comments: mockComments }),
    });

    render(<CommentTable />);

    await waitFor(() => {
      expect(screen.getByText("User One")).toBeInTheDocument();
    });

    const nextButton = screen.getAllByText("Next")[0];
    fireEvent.click(nextButton);

    await waitFor(() => {
      // Use a function to match the dynamic pagination text
      expect(screen.getByText((content) => content.includes("Page 2 of"))).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("page=2"),
        expect.anything()
      );
    });
  });

  it("handles delete comment action", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ comments: mockComments }),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    render(<CommentTable />);

    await waitFor(() => {
      expect(screen.getByText("First comment")).toBeInTheDocument();
    });

    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/comment/delete/1`),
        expect.anything()
      );
    });
  });

  it("handles API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ msg: "Failed to fetch comments" }),
    });

    render(<CommentTable />);

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes("Error: Failed to fetch comments"))).toBeInTheDocument();
    });
  });
});