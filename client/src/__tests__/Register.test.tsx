import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "@/components/Register";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/context/NotificationContext", () => ({
  useNotifications: jest.fn(),
}));

describe("Register Component", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockAddNotification = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useNotifications as jest.Mock).mockReturnValue({
      addNotification: mockAddNotification,
    });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the first form initially", () => {
    render(<Register />);
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
  });
  it("switches to second form when clicking Next", () => {
    render(<Register />);
    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    render(<Register />);

    // Navigate to second form
    fireEvent.click(screen.getByText("Next"));

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { name: "username", value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { name: "confirm_password", value: "password456" },
    });

    // Submit the form using the form element directly
    const form = screen
      .getByPlaceholderText("Confirm Password")
      .closest("form");
    fireEvent.submit(form!);

    expect(mockAddNotification).toHaveBeenCalledWith(
      "Please match the password.",
      "error"
    );
  });

  it("handles successful OTP sending", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ msg: "OTP sent successfully" }),
    });

    render(<Register />);

    // Fill first form and move to second
    fireEvent.click(screen.getByText("Next"));

    // Fill second form
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { name: "username", value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { name: "confirm_password", value: "password123" },
    });

    // Submit form directly using the form element
    const form = screen
      .getByPlaceholderText("Confirm Password")
      .closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalledWith(
        "OTP sent successfully",
        "success"
      );
    });
  });

  it('handles successful registration', async () => {
    // Mock both API calls with successful responses
    (global.fetch as jest.Mock)
      .mockImplementation((url) => {
        if (url.includes('sendOTP')) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ msg: 'OTP sent successfully' })
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({ msg: 'Registration successful' })
        });
      });

    render(<Register />);
    
    // Fill first form
    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { name: 'name', value: 'Test User' }
    });
    fireEvent.change(screen.getByPlaceholderText('Email ID'), {
      target: { name: 'email', value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText('Contact Number'), {
      target: { name: 'phone_number', value: '1234567890' }
    });
    fireEvent.change(screen.getByPlaceholderText('Address'), {
      target: { name: 'address', value: 'Test Address' }
    });
    
    // Move to second form
    fireEvent.click(screen.getByText('Next'));
    
    // Fill second form
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { name: 'username', value: 'testuser' }
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { name: 'password', value: 'password123' }
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { name: 'confirm_password', value: 'password123' }
    });

    // Submit registration form
    const registrationForm = screen.getByPlaceholderText('Confirm Password').closest('form');
    fireEvent.submit(registrationForm!);

    // Wait for OTP form to appear and fill it
    await waitFor(() => {
      const otpInput = screen.getByPlaceholderText('Enter OTP');
      fireEvent.change(otpInput, { target: { name: 'otp', value: '123456' } });
    });

    // Submit OTP form
    const otpForm = screen.getByPlaceholderText('Enter OTP').closest('form');
    fireEvent.submit(otpForm!);

    // Verify navigation to login page
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    }, { timeout: 5000 });
});


  it("handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ msg: "API Error" }),
    });

    render(<Register />);

    // Fill and submit form
    fireEvent.click(screen.getByText("Next"));

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { name: "username", value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { name: "password", value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { name: "confirm_password", value: "password123" },
    });

    // Submit form directly using the form element
    const form = screen
      .getByPlaceholderText("Confirm Password")
      .closest("form");
    fireEvent.submit(form!);

    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalledWith("API Error", "error");
    });
  });
});
