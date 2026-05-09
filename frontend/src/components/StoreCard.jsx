import React from 'react'
import RatingStars from "./RatingStars";
function StoreCard ({ store, onRate }) {

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition duration-300">

      {/* Store Name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {store.name}
      </h2>

      {/* Address */}
      <p className="text-gray-600 mb-4">
        {store.address}
      </p>

      {/* Overall Rating */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          Overall Rating:
        </p>

        <RatingStars
          rating={
            store.overall_rating || 0
          }
        />
      </div>

      {/* User Rating */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          Your Rating:
        </p>

        <RatingStars
          rating={store.user_rating || 0}
          editable={true}
          onRate={(value) =>
            onRate(store.id, value)
          }
        />
      </div>

    </div>
  );
};

export default StoreCard;