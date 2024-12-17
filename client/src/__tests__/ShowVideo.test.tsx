import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ShowVideo from "@/components/common-component/ShowVideo";
import { useAuth } from "@/context/AuthContext";
import "@testing-library/jest-dom";

// Mock the AuthContext
jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock child components
jest.mock("@/components/common-component/ShowAdvertisement", () => {
  return function MockShowAdvertisement() {
    return <div data-testid="mock-advertisement">Advertisement</div>;
  };
});

jest.mock("@/components/common-component/ShowComment", () => {
  return function MockShowComment() {
    return <div data-testid="mock-comment">Comments</div>;
  };
});

const mockProps = {
  id: "123",
  title: "Test Video",
  description: "Test Description",
  thumbnail: "/test-thumbnail.jpg",
  profilePic: "/test-profile.jpg",
  name: "Test User",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-02T00:00:00.000Z",
  location: "/test-video.mp4",
};

describe("ShowVideo Component", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: "mock-token" });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ comments: [] }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with all required elements", async () => {
    render(<ShowVideo {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();
    expect(screen.getByAltText("Video Thumbnail")).toBeInTheDocument();
    expect(screen.getByAltText("User Profile")).toBeInTheDocument();
    expect(screen.getByTitle("Video Viewer")).toBeInTheDocument();
    expect(screen.getByText("Download Video")).toBeInTheDocument();
  });

  it("fetches comments on component mount", async () => {
    render(<ShowVideo {...mockProps} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_API}api/comment/comments?contentId=${mockProps.id}`,
        expect.any(Object)
      );
    });
  });

  it("handles fetch error correctly", async () => {
    const errorMessage = "Failed to fetch comments";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ msg: errorMessage }),
      })
    ) as jest.Mock;

    render(<ShowVideo {...mockProps} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("renders default profile picture when profilePic is null", () => {
    const propsWithoutProfile = { ...mockProps, profilePic: null };
    render(<ShowVideo {...propsWithoutProfile} />);

    const profileImg = screen.getByAltText("User Profile");
    expect(profileImg).toHaveAttribute("src", "/default.jpg");
  });

  it("formats dates correctly", () => {
    render(<ShowVideo {...mockProps} />);

    const createdDate = new Date(mockProps.createdAt).toLocaleDateString();
    const updatedDate = new Date(mockProps.updatedAt).toLocaleDateString();

    expect(screen.getByText(`Created at: ${createdDate}`)).toBeInTheDocument();
    expect(screen.getByText(`Updated at: ${updatedDate}`)).toBeInTheDocument();
  });

  it("renders advertisement component", () => {
    render(<ShowVideo {...mockProps} />);
    expect(screen.getByTestId("mock-advertisement")).toBeInTheDocument();
  });

  it("renders comment component", () => {
    render(<ShowVideo {...mockProps} />);
    expect(screen.getByTestId("mock-comment")).toBeInTheDocument();
  });

  it("renders video iframe with correct source", () => {
    render(<ShowVideo {...mockProps} />);
    const iframe = screen.getByTitle("Video Viewer");
    expect(iframe).toHaveAttribute(
      "src",
      `${process.env.NEXT_PUBLIC_BACKEND_API}${mockProps.location}`
    );
  });

  it("renders download link with correct href", () => {
    render(<ShowVideo {...mockProps} />);
    const downloadLink = screen.getByText("Download Video");
    expect(downloadLink).toHaveAttribute(
      "href",
      `${process.env.NEXT_PUBLIC_BACKEND_API}${mockProps.location}`
    );
  });
});
