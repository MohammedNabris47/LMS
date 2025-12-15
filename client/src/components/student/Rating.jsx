import { useEffect, useState } from "react";

const Rating = ({ initialState, onRate }) => {
  const [rating, setRating] = useState(initialState || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };
  useEffect(() => {
    if (initialState) {
      setRating(initialState);
    }
  }, [initialState]);
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            onClick={() => handleRating(starValue)}
            key={i}
            className={`text-[13px] sm:text-[15px] cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
