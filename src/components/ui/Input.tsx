import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-secondary-cyan font-semibold">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        className={`form-input w-full px-4 py-3 rounded-lg ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-primary-white text-sm opacity-70">{helperText}</p>
      )}
    </div>
  );
};

export default Input;