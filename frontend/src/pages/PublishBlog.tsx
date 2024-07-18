import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import InputField from '../components/ui/InputField';
import { Blog } from '../config/types';
import InputTextArea from '../components/ui/InputTextArea';
import Button from '../components/ui/Button';
import axios from 'axios';
import { BACKEND_URL } from '../config/env';
import toast from 'react-hot-toast';
import useSession from '../hooks/useSession';

export default function PublishBlog() {
  const { session } = useSession();
  const [blog, setBlog] = useState<Pick<Blog, 'title' | 'content'>>({
    title: '',
    content: '',
  });

  const handlePostBlog = () => {
    try {
      axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: blog.title,
          content: blog.content,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      );
      toast.success('Blog published.');
      setBlog({ title: '', content: '' });
    } catch (error) {
      toast.error('Failed to publish blog.');
    }
  };
  return (
    <div className='flex flex-col items-center w-full h-screen'>
      <AppBar />
      <div className='flex flex-col w-full h-full max-w-5xl overflow-auto'>
        <div className='flex flex-col w-full items-center px-5'>
          <InputField
            type='text'
            value={blog.title}
            onChange={(value) => setBlog((prev) => ({ ...prev, title: value }))}
            placeholder={'Enter a suitable title...'}
            label={'Title'}
            containerClasses='my-2 w-full'
          />
          <InputTextArea
            value={blog.content}
            onChange={(value) =>
              setBlog((prev) => ({ ...prev, content: value }))
            }
            placeholder={"Enter the blog's content"}
            label={'Content'}
            containerClasses='my-2 w-full'
          />
          <Button
            label='Publish'
            onClick={() => handlePostBlog()}
            cssClasses='mt-5'
          />
        </div>
      </div>
    </div>
  );
}
