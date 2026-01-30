import React from 'react';
interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className = ''
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  };
  return <div className={`relative inline-block rounded-full overflow-hidden bg-stone-200 ${sizes[size]} ${className}`}>
      {src ? <img src={src} alt={alt || fallback} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center bg-teal-100 text-teal-700 font-medium">
          {fallback.substring(0, 2).toUpperCase()}
        </div>}
    </div>;
}