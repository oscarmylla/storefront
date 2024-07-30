import { Star } from "lucide-react";
import { Review } from ".";

export function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="bg-background shadow-sm px-5 py-10 rounded-md text-center flex flex-col items-center">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} className="size-5 fill-primary" />
        ))}
      </div>
      <blockquote className="text-lg mb-5">{review.content}</blockquote>
      <span>{review.name}</span>
      <span className="text-sm text-muted-foreground">{review.city}</span>
    </div>
  );
}
