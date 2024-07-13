import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from './ui/InputField';
import Button from './ui/Button';

interface AuthProps {
  type: 'signin' | 'signup';
}

interface InputType {
  name: string;
  email: string;
  password: string;
}

export default function Auth({ type }: AuthProps) {
  const [input, setInput] = useState<InputType>({
    name: '',
    email: '',
    password: '',
  });

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <span className='text-2xl font-bold'>
        {type === 'signup' ? 'Create an account' : 'Log into an account'}
      </span>
      <div className='flex w-full text-slate-500 space-x-2 justify-center items-center'>
        <span>
          {type === 'signup'
            ? 'Already have an account?'
            : "Don't have an account?"}
        </span>
        <Link
          to={type === 'signup' ? '/signin' : '/signup'}
          className='text-blue-500 !my-0'
        >
          {type === 'signup' ? 'Sign in' : 'Sign up'}
        </Link>
      </div>
      <div className='flex flex-col w-1/2'>
        {type === 'signup' && (
          <InputField
            type='text'
            value={input.name}
            onChange={(value) => setInput((prev) => ({ ...prev, name: value }))}
            placeholder={'John Doe'}
            label={'Name'}
            containerClasses='mt-4 mb-2'
          />
        )}
        <InputField
          type='email'
          value={input.email}
          onChange={(value) => setInput((prev) => ({ ...prev, email: value }))}
          placeholder={'johndoe@email.com'}
          label={'Email'}
          containerClasses='my-2'
        />
        <InputField
          type='password'
          value={input.password}
          onChange={(value) =>
            setInput((prev) => ({ ...prev, password: value }))
          }
          placeholder={'Password'}
          label={'Password'}
          containerClasses='my-2'
        />
        <Button
          label={type === 'signup' ? 'Sign up' : 'Sign in'}
          onClick={() => {}}
          cssClasses='mt-5'
        />
      </div>
    </div>
  );
}
