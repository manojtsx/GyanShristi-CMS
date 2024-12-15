import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CategoryTable from "@/components/common-component/CategoryTable";
import { NotificationProvider } from "@/context/NotificationContext";
import { AuthProvider } from "@/context/AuthContext";

// Mock the environment variable
process.env.NEXT_PUBLIC_BACKEND_API = "http://test-api.com/";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
      refresh: () => jest.fn(),
      prefetch: () => jest.fn(),
      replace: () => jest.fn(),
    };
  },
  usePathname() {
    return "/";
  },
}));

// Mock notification context
const mockAddNotification = jest.fn();
const mockNotificationValue = {
  addNotification: mockAddNotification,
  notifications: [],
};

jest.mock("@/context/NotificationContext", () => ({
  NotificationProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useNotifications: () => mockNotificationValue,
}));

// Mock AuthContext
jest.mock("@/context/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: { role: "admin" },
    token: "mock-token",
    loading: false,
  }),
}));

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("CategoryTable", () => {
  const mockCategoryData = [
    {
      id: 1,
      title: "Test Category",
      user: {
        name: "Test User",
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the table headers correctly", async () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <CategoryTable />
        </NotificationProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("SN")).toBeInTheDocument();
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Created By")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  it("fetches and displays category data", async () => {
    // Mock the fetch response with the correct data structure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategoryData),
      })
    ) as jest.Mock;

    render(
      <AuthProvider>
        <NotificationProvider>
          <CategoryTable />
        </NotificationProvider>
      </AuthProvider>
    );

    // Wait for the component to render with the data
    await waitFor(
      () => {
        expect(screen.getByText("Test Category")).toBeInTheDocument();
        expect(screen.getByText("Test User")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
