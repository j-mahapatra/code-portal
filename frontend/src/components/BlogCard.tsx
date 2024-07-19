import { useNavigate } from 'react-router-dom';
import Avatar from './ui/Avatar';
import useSession from '../hooks/useSession';
import { User } from '../config/types';

interface BlogCardProps {
  id: string;
  author: User;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  id,
  author,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  const navigate = useNavigate();
  const { session } = useSession();

  const calculateReadTime = (str: string) => {
    return Math.ceil(str.length / 100);
  };

  return (
    <div
      className='border border-slate-200 shadow p-5 m-5 rounded-lg cursor-pointer'
      onClick={() => navigate(`/blogs/${id}`)}
    >
      <div className='flex space-x-2 mb-2'>
        <Avatar label={author.name} size='sm' />
        <span className='flex items-center'>
          {session.user?.email === author.email ? 'You' : author.name}
        </span>
        <span className='flex items-center before:flex before:w-1 before:h-1 before:items-center before:justify-center before:bg-slate-600 before:rounded-full before:mr-2'>
          {publishedDate}
        </span>
      </div>
      <div className='font-extrabold text-3xl my-2'>{title}</div>
      <div className='line-clamp-2 text-ellipsis'>{content}</div>
      <div className='mt-3 text-sm'>{`${calculateReadTime(
        content
      )} mins read`}</div>
    </div>
  );
}
