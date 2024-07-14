import Avatar from './ui/Avatar';

interface BlogCardProps {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  author,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  const calculateReadTime = (str: string) => {
    return Math.ceil(str.length / 100);
  };

  return (
    <div className='border border-slate-200 shadow p-5 m-5 rounded-lg'>
      <div className='flex space-x-2 mb-2'>
        <Avatar label={author} size='sm' />
        <span className='flex items-center'>{author}</span>
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
