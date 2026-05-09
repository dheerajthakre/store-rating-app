import React from 'react'
function RatingStars ({ rating = 0, editable = false, onRate }) {

  // Handle Rating Click
  const handleClick = (value) => {
    if (editable && onRate) {
      onRate(value);
    }
  };

  return (
    <div className="flex items-center gap-1">

      {[1, 2, 3, 4, 5].map((star) => (

        <button
          key={star}
          type="button"
          onClick={() =>
            handleClick(star)
          }
          className={`text-2xl transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          } ${
            editable
              ? "hover:scale-125 cursor-pointer"
              : "cursor-default"
          }`}
        >
          ★
        </button>

      ))}

    </div>
  );
};

export default RatingStars;