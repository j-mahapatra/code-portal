import logo from '/logo.png';

export default function ProductDescription() {
  return (
    <div className='hidden md:flex flex-col bg-slate-300 h-screen items-center justify-center w-full space-y-6'>
      <div className='aspect-auto w-1/2'>
        <img src={logo} alt='CodePortal Logo' />
      </div>
      <span className='text-5xl font-bold text-center w-3/4'>
        Amplify your voice and build a thriving online community with our
        revolutionary blogging platform.
      </span>
      <span className='text-md text-center w-3/4'>
        Transform your ideas into captivating content that resonates with your
        target audience. Our user-friendly blogging application empowers you to
        effortlessly create, publish, and promote your blog posts, helping you
        establish your online presence and drive meaningful engagement.
      </span>
    </div>
  );
}
