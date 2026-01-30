import React from 'react';
import { Star } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
}
export function StarRating({
  rating,
  max = 5,
  size = 'sm',
  interactive = false,
  onChange,
  showCount = false,
  count = 0
}: StarRatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6'
  };
  return <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(max)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5;
        return <button key={i} type="button" disabled={!interactive} onClick={() => interactive && onChange?.(i + 1)} className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}>
              <Star className={`
                  ${sizes[size]} 
                  ${isFilled ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}
                  ${isHalf ? 'fill-amber-400 text-amber-400 opacity-50' : ''}
                `} />
            </button>;
      })}
      </div>
      {showCount && <span className="text-xs text-stone-500 ml-1">({count})</span>}
    </div>;
}