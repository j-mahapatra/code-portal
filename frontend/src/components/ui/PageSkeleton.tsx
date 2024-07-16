export default function PageSkeleton() {
  return (
    <div className='flex flex-col w-full md:grid md:grid-cols-12 px-5'>
      <div className='col-span-9 flex flex-col h-full w-full p-5 space-y-5 md:border-r'>
        <div className='flex w-full h-16 bg-slate-500 rounded-lg animate-pulse' />
        <div className='flex w-full h-96 bg-slate-500 rounded-lg animate-pulse' />
      </div>
      <div className='col-span-3 flex flex-col w-full items-start p-5 space-y-5'>
        <div>
          <div className='rounded-full w-16 h-16 bg-slate-500 animate-pulse' />
        </div>
        <div className='flex h-4 w-full bg-slate-500 rounded-lg animate-pulse' />
      </div>
    </div>
  );
}
