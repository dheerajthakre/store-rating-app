import React from 'react'
function RatingCard ({ averageRating }) {
  return (
    <div className="bg-yellow-400 p-6 rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold">
        Average Rating
      </h2>
      <p className="text-5xl font-bold mt-4">
        {averageRating
          ? Number(
              averageRating
            ).toFixed(1)
          : "0.0"}
      </p>
    </div>
  );
};

export default RatingCard;