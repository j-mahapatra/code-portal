import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config/env';
import toast from 'react-hot-toast';
import useSession from './useSession';
import { Blogs } from '../config/types';

export default function useBlogs() {
  const { session } = useSession();
  const token = session.token;
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        if (!token) {
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response?.data?.posts ?? []);
      } catch (error) {
        toast.error('Failed to fetch blogs.');
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, [token]);

  return { isLoading, blogs };
}
