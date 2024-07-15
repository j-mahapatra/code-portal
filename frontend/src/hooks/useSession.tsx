import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config/env';
import { User } from '../config/types';

export default function useSession() {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken ?? '');
    const fetchUserDetails = async (token?: string) => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };
    fetchUserDetails(savedToken ?? '');
  }, []);

  return { session: { token, user } };
}
