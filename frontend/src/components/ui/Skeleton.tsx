export default function Skeleton() {
  return (
    <div className='border border-slate-200 shadow p-5 m-5 rounded-lg space-y-2'>
      <div className='flex space-x-2 mb-2 items-center rounded-lg'>
        <div className='w-6 h-6 bg-slate-500 rounded-full animate-pulse' />
        <div className='flex items-center w-36 h-4 bg-slate-500 rounded-lg animate-pulse' />
      </div>
      <div className='flex items-center w-full h-8 bg-slate-500 rounded-lg animate-pulse' />
      <div className='flex items-center w-full h-16 bg-slate-500 rounded-lg animate-pulse' />
    </div>
  );
}
