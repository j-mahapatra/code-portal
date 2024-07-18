interface ButtonProps {
  label: string;
  onClick: () => void;
  cssClasses?: string;
  disabled?: boolean;
}

export default function Button({
  label,
  onClick,
  cssClasses,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type='button'
      className={`text-white bg-slate-800 hover:bg-slate-900 outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${cssClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
