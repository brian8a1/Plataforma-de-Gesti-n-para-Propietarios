import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
        {label && <label className="block text-sm font-medium text-stone-700 mb-1">
            {label}
          </label>}
        <div className="relative">
          <select ref={ref} className={`
              block w-full rounded-lg border-stone-300 shadow-sm appearance-none
              focus:border-teal-500 focus:ring-teal-500 sm:text-sm
              disabled:bg-stone-100 disabled:text-stone-500
              pl-3 pr-10 py-2
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}
              ${className}
            `} {...props}>
            {options.map((option) => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-stone-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>;
});
Select.displayName = 'Select';