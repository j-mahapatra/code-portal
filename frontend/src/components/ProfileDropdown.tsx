import React, { useState } from 'react';
import Avatar from './ui/Avatar';
import useSession from '../hooks/useSession';
import { useNavigate } from 'react-router-dom';

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session } = useSession();
  const user = session?.user?.name ?? '';

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <div className='relative inline-block text-left'>
      <div className='cursor-pointer' onClick={toggleDropdown}>
        <Avatar label={user} size='md' />
      </div>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='py-1'>
            <button
              onClick={handleLogout}
              className='block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-100'
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
