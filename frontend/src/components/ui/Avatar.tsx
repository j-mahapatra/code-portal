interface AvatarProps {
  src?: string;
  label: string;
  size: 'sm' | 'md' | 'lg';
}

enum SIZE_MAP {
  sm = 'w-6 h-6',
  md = 'w-10 h-10',
  lg = 'w-16 h-16',
}

export default function Avatar({ src, label, size }: AvatarProps) {
  const extractInitials = (str: string) => {
    return str
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase())
      .join('');
  };

  return (
    <div className='flex items-center justify-center'>
      {src ? (
        <img
          className={`${SIZE_MAP[size]} rounded-full`}
          src={src}
          alt='Rounded Avatar'
        />
      ) : (
        <div
          className={`relative inline-flex items-center justify-center ${SIZE_MAP[size]} overflow-hidden bg-slate-600 rounded-full`}
        >
          <span
            className={`font-medium text-slate-100 ${
              size === 'sm' ? 'text-xs' : ''
            }`}
          >
            {extractInitials(label)}
          </span>
        </div>
      )}
    </div>
  );
}
