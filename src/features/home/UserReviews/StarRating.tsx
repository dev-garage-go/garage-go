import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

type StarRatingProps = {
  rating: number; // puede ser decimal, ej: 3.5
  outOf?: number; // default: 5
  sizeStar?: number
};

export const StarRating = ({ rating, outOf = 5, sizeStar = 10 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = outOf - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} size={sizeStar} />
      ))}
      {hasHalfStar && <FaStarHalfAlt size={sizeStar} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} size={sizeStar} />
      ))}
    </div>
  );
};
