import React from 'react';
import { Star, ThumbsUp, Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Review } from '../../types';
import { Avatar } from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
interface ReviewCardProps {
  review: Review;
}
export function ReviewCard({
  review
}: ReviewCardProps) {
  return <Card className="bg-stone-50 border-none">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Avatar fallback={review.authorAlias} size="sm" />
          <div>
            <p className="text-sm font-medium text-stone-900">
              {review.authorAlias}
            </p>
            <p className="text-xs text-stone-500">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <div className="mb-2">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
          {review.serviceType}
        </span>
      </div>

      <p className="text-sm text-stone-700 mb-3 leading-relaxed">
        "{review.comment}"
      </p>

      {review.wouldHireAgain && <div className="flex items-center text-xs text-emerald-600 font-medium">
          <ThumbsUp className="h-3 w-3 mr-1" />
          Lo contrataría de nuevo
        </div>}
    </Card>;
}