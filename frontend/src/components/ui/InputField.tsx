interface InputFieldProps {
  type: 'text' | 'email' | 'password';
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  containerClasses?: string;
  cssClasses?: string;
}

export default function InputField({
  type,
  label,
  placeholder,
  required = false,
  value,
  onChange,
  containerClasses,
  cssClasses,
}: InputFieldProps) {
  return (
    <div className={containerClasses ?? ''}>
      <label htmlFor={label} className='block w-full mb-1 text-sm font-medium'>
        {label}
      </label>
      <input
        type={type}
        id={label}
        className={`bg-slate-200 border border-slate-300 placeholder:text-slate-600 text-sm rounded-lg block w-full p-2.5 ${cssClasses}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
