import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { screen } from "@testing-library/dom";
import Login from "@/components/Login";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/context/NotificationContext");
jest.mock("@/context/AuthContext");

describe("Login Component", () => {
  const mockAddNotification = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useNotifications as jest.Mock).mockReturnValue({
      addNotification: mockAddNotification,
    });

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form elements and links", () => {
    render(<Login />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot your password\?/i)).toBeInTheDocument();
  });

  test("updates form state on input change", () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("password123");
  });


  test("handles empty form submission", async () => {
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockAddNotification).toHaveBeenCalledWith(
      expect.any(String),
      "error"
    );
  });

  test("handles successful login", async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          token: "test-token",
          login: { user_id: "123" },
          msg: "Login successful",
        }),
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(mockResponse));

    render(<Login />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await act(async () => {
      const form = screen.getByPlaceholderText("Username").closest("form");
      if (form) {
        fireEvent.submit(form);
      }
    });

    expect(mockLogin).toHaveBeenCalledWith("test-token", "123");
    expect(mockAddNotification).toHaveBeenCalledWith(
      "Login successful",
      "success"
    );
  });
  test("handles validation error response", async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ msg: "Invalid credentials" }),
    };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(mockResponse));

    const { container } = render(<Login />);
    const loginForm = container.querySelector("form");

    if (loginForm) {
      await act(async () => {
        fireEvent.submit(loginForm);
      });
    }

    expect(mockAddNotification).toHaveBeenCalledWith(
      "Invalid credentials",
      "error"
    );
  });
});
