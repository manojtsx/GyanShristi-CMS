import { useRouter } from 'next/navigation';
import { useNotifications } from '@/context/NotificationContext';

interface UseHandleDeleteProps {
  successRedirect?: string;
}

// Call the backend api
const API = process.env.NEXT_PUBLIC_BACKEND_API;

export const useHandleDelete = ({ successRedirect }: UseHandleDeleteProps = {}) => {
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleDelete = async (id: string, token: string|null, apiUrl?: string) => {
    try {
      const response = await fetch(`${API}api/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || 'Failed to delete the resource');
      }

      addNotification(result.msg, 'success');
      window.location.reload();

      if (successRedirect) {
        router.push(successRedirect);
      }
    } catch (error: any) {
      console.error('Error deleting resource:', error);
      addNotification(error.message || 'Error deleting resource', 'error');
    }
  };

  return { handleDelete };
};
