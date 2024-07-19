import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import BlogCard from '../components/BlogCard';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import useBlogs from '../hooks/useBlogs';
import { formatToDate } from '../utils/date-formatters';

export default function Blogs() {
  const navigate = useNavigate();
  const { isLoading, blogs } = useBlogs();

  return (
    <div className='flex flex-col items-center w-full h-screen bg-slate-200'>
      <AppBar />
      <div className='flex flex-col w-full h-full overflow-auto items-center'>
        {isLoading ? (
          <div className='flex flex-col w-full items-center'>
            {Array.from({ length: 4 }).map((_, index) => {
              return <Skeleton key={index} />;
            })}
          </div>
        ) : (
          <div className='flex flex-col w-full'>
            <div className='flex justify-end mt-5'>
              <Button
                label='Publish a Post'
                onClick={() => {
                  navigate('/blogs/publish');
                }}
              />
            </div>
            <div className='flex flex-col w-full items-center'>
              {blogs?.map((blog) => (
                <BlogCard
                  id={blog.id}
                  key={blog.title}
                  author={blog.author}
                  publishedDate={formatToDate(blog.createdAt)}
                  title={blog.title}
                  content={blog.content}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
