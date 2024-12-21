import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShowPost from '@/components/common-component/ShowPost';
import { useAuth } from '@/context/AuthContext';
import '@testing-library/jest-dom';
import { useParams, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/components/common-component/ShowAdvertisement', () => {
  return function MockShowAdvertisement() {
    return <div data-testid="mock-advertisement">Advertisement</div>;
  };
});

jest.mock('@/components/common-component/ShowComment', () => {
  return function MockShowComment() {
    return <div data-testid="mock-comment">Comments</div>;
  };
});

const mockContentData = {
  _id: '123',
  title: 'Test Post',
  description: 'Test Description',
  blog: '<p>Test blog content</p>',
  thumbnail: '/test-thumbnail.jpg',
  created_at: '2023-01-01T00:00:00.000Z',
  updated_at: '2023-01-02T00:00:00.000Z',
  userOwner: {
    name: 'Test User',
    profile_pic: '/test-profile.jpg'
  },
  location: '/test-location',
  content_type: 'blog',
  status: 'active',
  category_id: ['1', '2'],
  user_id: 'user123',
  fileContent: 'test content'
};

describe('ShowPost Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ token: 'mock-token' });
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (usePathname as jest.Mock).mockReturnValue('/post/123');
    
    // Mock fetch for content data
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('api/content/post')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockContentData),
        });
      }
      // Mock for comments fetch
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ comments: [] }),
      });
    });

    // Mock SpeechSynthesis
    global.speechSynthesis = {
      speak: jest.fn(),
      cancel: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      speaking: false,
      paused: false,
    } as unknown as SpeechSynthesis;
    
    global.SpeechSynthesisUtterance = jest.fn().mockImplementation(() => ({
      onend: jest.fn(),
    }));

    // Remove console.log from the component
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with content data', async () => {
    render(<ShowPost />);
    
    await waitFor(() => {
      expect(screen.getByText(mockContentData.title, { exact: false })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('fetches content data on mount', async () => {
    render(<ShowPost />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_API}api/content/post/123`,
        expect.any(Object)
      );
    });
  });

  it('handles speech synthesis controls', async () => {
    render(<ShowPost />);

    await waitFor(() => {
      const speakButton = screen.getByText('Speak');
      fireEvent.click(speakButton);
      expect(global.SpeechSynthesisUtterance).toHaveBeenCalled();
    });
  });

  it('renders advertisement component', async () => {
    render(<ShowPost />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mock-advertisement')).toBeInTheDocument();
    });
  });

  it('renders comment component', async () => {
    render(<ShowPost />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mock-comment')).toBeInTheDocument();
    });
  });

  it('formats dates correctly', async () => {
    render(<ShowPost />);
    
    await waitFor(() => {
      const createdDate = new Date(mockContentData.created_at).toLocaleDateString();
      expect(screen.getByText(new RegExp(createdDate))).toBeInTheDocument();
    });
  });

  it('handles download functionality', async () => {
    render(<ShowPost />);
    
    await waitFor(() => {
      const downloadButton = screen.getByTitle('Download');
      expect(downloadButton).toBeInTheDocument();
    });
  });
});
