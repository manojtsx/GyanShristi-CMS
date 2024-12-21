import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Logout from "@/components/Logout";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Logout Component", () => {
  const mockLogout = jest.fn();
  const mockOnClose = jest.fn();
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when isOpen is false", () => {
    render(<Logout isOpen={false} onClose={mockOnClose} />);
    expect(
      screen.queryByText("Are you sure you want to logout?")
    ).not.toBeInTheDocument();
  });

  it("renders modal content when isOpen is true", () => {
    render(<Logout isOpen={true} onClose={mockOnClose} />);
    expect(
      screen.getByText("Are you sure you want to logout?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(<Logout isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  // it("calls onClose when X button is clicked", () => {
  //   render(<Logout isOpen={true} onClose={mockOnClose} />);
  //   const closeIcon =
  //     screen.getByTitle("close") || screen.getByLabelText("close");
  //   fireEvent.click(closeIcon);
  //   expect(mockOnClose).toHaveBeenCalled();
  // });

  it("calls logout when Yes is clicked", async () => {
    render(<Logout isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  // it("handles logout error gracefully", async () => {
  //   const consoleErrorSpy = jest
  //     .spyOn(console, "error")
  //     .mockImplementation(() => {});

  //   mockLogout.mockRejectedValueOnce("Logout failed");

  //   render(<Logout isOpen={true} onClose={mockOnClose} />);
  //   fireEvent.click(screen.getByRole("button", { name: "Yes" }));

  //   await waitFor(() => {
  //     expect(consoleErrorSpy).toHaveBeenCalledWith("Logout failed");
  //   });

  //   consoleErrorSpy.mockRestore();
  // });
});
