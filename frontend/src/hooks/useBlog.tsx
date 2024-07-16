import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config/env';
import toast from 'react-hot-toast';
import useSession from './useSession';
import { Blog } from '../config/types';

export default function useBlog(id?: string) {
  const { session } = useSession();
  const token = session.token;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        if (!token || !id) {
          setBlog(null);
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response?.data?.post ?? {});
      } catch (error) {
        toast.error('Failed to fetch blogs.');
      }
      setIsLoading(false);
    };

    fetchBlog();
  }, [token, id]);

  return { isLoading, blog };
}
