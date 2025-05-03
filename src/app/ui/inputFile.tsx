"use client";
import React from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
};

export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error = false,
  errorMessage = '',
  placeholder = '',
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium p-2 rounded mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full border p-2 rounded bg-gray-200 text-black ${error ? 'border-red-500' : 'border-gray-300'}`}
        placeholder={placeholder}
      />
      {error && <small className="text-red-500">{errorMessage}</small>}
    </div>
  );
}
