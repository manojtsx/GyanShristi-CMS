import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContentTable from "@/components/common-component/ContentTable";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useRouter } from "next/navigation";

jest.mock("@/context/AuthContext");
jest.mock("@/context/NotificationContext");
jest.mock("next/navigation");

const mockContent = [
  {
    _id: "1",
    title: "Test Content",
    user_id: { name: "Test User", _id: "user1" },
    category_id: { title: "Test Category", _id: "cat1" },
    created_at: "2024-01-01",
  },
];

describe("ContentTable Component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      token: "test-token",
      user: { _id: "user1" },
    });

    (useNotifications as jest.Mock).mockReturnValue({
      addNotification: jest.fn(),
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    global.fetch = jest.fn();
  });

  it("handles API error gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("API Error"));
    render(<ContentTable />);

    await waitFor(() => {
      expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    });
  });

  it("filters content based on search input", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ content: mockContent }),
    });

    render(<ContentTable />);
    const searchInput = screen.getByPlaceholderText("Search...");

    await waitFor(() => {
      fireEvent.change(searchInput, { target: { value: "Test" } });
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: "NonExistent" } });
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("handles delete operation failure", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ content: mockContent }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ msg: "Delete failed" }),
      });

    render(<ContentTable />);

    await waitFor(() => {
      const deleteButton = screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "svg" &&
          element?.getAttribute("viewBox") === "0 0 24 24" &&
          element?.classList.contains("text-[#011936]")
        );
      });
      fireEvent.click(deleteButton);
    });
  });

  it("updates pagination when data changes", async () => {
    const manyItems = Array(15)
      .fill(null)
      .map((_, index) => ({
        ...mockContent[0],
        _id: `${index}`,
        title: `Content ${index}`,
      }));

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ content: manyItems }),
    });

    render(<ContentTable />);

    await waitFor(() => {
      expect(screen.getByText("Content 0")).toBeInTheDocument();
      const page2Buttons = screen.getAllByText("2");
      fireEvent.click(page2Buttons[0]); // Click the first "2" button
      expect(screen.queryByText("Content 0")).not.toBeInTheDocument();
    });
  });

  it("sorts content by creation date", async () => {
    const sortedContent = [
      { ...mockContent[0], created_at: "2024-01-02" },
      { ...mockContent[0], _id: "2", created_at: "2024-01-01" },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ content: sortedContent }),
    });

    render(<ContentTable />);

    await waitFor(() => {
      const dates = screen.getAllByText(/1\/[12]\/2024/);
      expect(dates[0]).toBeInTheDocument();
    });
  });
});
