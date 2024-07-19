interface InputTextAreaProps {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  containerClasses?: string;
  rows?: number;
  cssClasses?: string;
}

export default function InputTextArea({
  label,
  placeholder,
  required = false,
  value,
  onChange,
  containerClasses,
  rows = 10,
  cssClasses,
}: InputTextAreaProps) {
  return (
    <div className={containerClasses ?? ''}>
      <label htmlFor={label} className='block w-full mb-1 text-sm font-medium'>
        {label}
      </label>
      <textarea
        id={label}
        className={`bg-slate-200 border border-slate-300 placeholder:text-slate-600 text-sm rounded-lg block w-full p-2.5 ${cssClasses}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
      />
    </div>
  );
}
