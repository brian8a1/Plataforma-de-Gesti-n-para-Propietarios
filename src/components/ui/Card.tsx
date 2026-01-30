import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}
export function Card({
  children,
  className = '',
  onClick,
  noPadding = false
}: CardProps) {
  return <div className={`
        bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
        ${className}
      `} onClick={onClick}>
      <div className={noPadding ? '' : 'p-4'}>{children}</div>
    </div>;
}