import useSession from '../hooks/useSession';
import Avatar from './ui/Avatar';
import logo from '/logo.png';

export default function AppBar() {
  const { session } = useSession();
  const user = session?.user?.name ?? '';

  return (
    <div className='flex w-full justify-between px-1 bg-slate-300 h-16'>
      <div className='flex items-center aspect-auto w-48'>
        <img src={logo} alt='CodePortal Logo' />
      </div>
      <div className='flex items-center px-5'>
        <Avatar label={user} size='md' />
      </div>
    </div>
  );
}
