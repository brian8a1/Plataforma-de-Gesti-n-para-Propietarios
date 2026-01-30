import React, { forwardRef } from 'react';
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-stone-700 mb-1">
            {label}
          </label>}
        <textarea ref={ref} className={`
            block w-full rounded-lg border-stone-300 shadow-sm
            focus:border-teal-500 focus:ring-teal-500 sm:text-sm
            disabled:bg-stone-100 disabled:text-stone-500
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
            ${className}
          `} {...props} />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>;
});
Textarea.displayName = 'Textarea';