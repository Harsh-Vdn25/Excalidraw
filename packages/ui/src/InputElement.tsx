"use client";

interface InputElementType {
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputElement({ type, placeholder, value, onChange }: InputElementType) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="
        text-white 
        bg-gray-700 
        placeholder-gray-400 
        px-3 py-2 
        border-2 border-gray-800 
        rounded-md 
        w-full 
        outline-none 
      "
    />
  );
}
