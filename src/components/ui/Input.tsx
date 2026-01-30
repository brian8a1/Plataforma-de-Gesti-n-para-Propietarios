import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-stone-700 mb-1">
            {label}
          </label>}
        <div className="relative">
          {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              {icon}
            </div>}
          <input ref={ref} className={`
              block w-full rounded-lg border-stone-300 shadow-sm
              focus:border-teal-500 focus:ring-teal-500 sm:text-sm
              disabled:bg-stone-100 disabled:text-stone-500
              ${icon ? 'pl-10' : 'pl-3'}
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `} {...props} />
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>;
});
Input.displayName = 'Input';