import AppBar from '../components/AppBar';
import BlogCard from '../components/BlogCard';
import Skeleton from '../components/ui/Skeleton';
import useBlogs from '../hooks/useBlogs';

export default function Blogs() {
  const { isLoading, blogs } = useBlogs();

  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <AppBar />
      <div className='flex flex-col w-full h-full max-w-5xl overflow-auto'>
        {isLoading ? (
          <div className='flex flex-col w-full'>
            {Array.from({ length: 4 }).map((_, index) => {
              return <Skeleton key={index} />;
            })}
          </div>
        ) : (
          blogs?.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.title}
              author={blog.author.name}
              publishedDate='3 July, 2024'
              title={blog.title}
              content={blog.content}
            />
          ))
        )}
      </div>
    </div>
  );
}
