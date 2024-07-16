import { useParams } from 'react-router-dom';
import useBlog from '../hooks/useBlog';
import Avatar from '../components/ui/Avatar';
import AppBar from '../components/AppBar';
import PageSkeleton from '../components/ui/PageSkeleton';

export default function BlogDetails() {
  const { id } = useParams();
  const { isLoading, blog } = useBlog(id);

  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <AppBar />
      {isLoading ? (
        <PageSkeleton />
      ) : (
        <div className='flex flex-col md:grid md:grid-cols-12 px-5 md:h-full'>
          <div className='col-span-9 flex flex-col w-full h-full p-5 space-y-5 md:border-r'>
            <h1 className='text-3xl font-extrabold text-slate-900'>
              {blog?.title}
            </h1>
            <p className='text-slate-700'>{blog?.content}</p>
          </div>
          <div className='col-span-3 flex flex-col w-full items-start p-5 space-y-5'>
            <div>
              <Avatar label={blog?.author?.name ?? ''} size='lg' />
            </div>
            <span className='font-bold text-xl text-slate-900'>
              {blog?.author?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
