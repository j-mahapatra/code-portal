import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import logo from '/logo-no-bg.png';

export default function AppBar() {
  const navigate = useNavigate();

  return (
    <div className='flex w-full justify-between px-1 bg-slate-900 h-16'>
      <div className='flex items-center aspect-auto w-48'>
        <img
          src={logo}
          alt='CodePortal Logo'
          className='invert cursor-pointer'
          onClick={() => navigate('/blogs')}
        />
      </div>
      <div className='flex items-center px-5'>
        <ProfileDropdown />
      </div>
    </div>
  );
}
