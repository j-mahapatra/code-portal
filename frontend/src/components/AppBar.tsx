import ProfileDropdown from './ProfileDropdown';
import logo from '/logo-no-bg.png';

export default function AppBar() {
  return (
    <div className='flex w-full justify-between px-1 bg-slate-900 h-16'>
      <div className='flex items-center aspect-auto w-48'>
        <img src={logo} alt='CodePortal Logo' className='invert' />
      </div>
      <div className='flex items-center px-5'>
        <ProfileDropdown />
      </div>
    </div>
  );
}
