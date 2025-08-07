import type { ChangeEvent } from "react";

type InputProps = {
  label?: string;
  value: string | number | string[] | undefined;
  placeholder?: string;
  type: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  value,
  type,
  placeholder,
  label,
  className,
  onChange,
}: InputProps) {
  return (
    <div className={className}>
      {label && <div>{label}</div>}
      <input
        className="border-2 border-gray-700 focus:border-pink-600"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
