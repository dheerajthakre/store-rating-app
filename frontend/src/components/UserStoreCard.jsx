import React from 'react'
function UserStoreCard ({ store, submitRating }) {


  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-2">
        {store.name}
      </h2>

      <p className="text-gray-600 mb-3">
        {store.address}
      </p>

      <p className="mb-2">
        <span className="font-semibold">
          Overall Rating:
        </span>{" "}
        {store.average_rating
          ? Number(
              store.average_rating
            ).toFixed(1)
          : "0.0"}
      </p>

      <p className="mb-4">
        <span className="font-semibold">
          Your Rating:
        </span>{" "}
        {store.user_rating ||
          "Not Rated"}
      </p>

      <div className="flex gap-2 flex-wrap">

        {[1, 2, 3, 4, 5].map(
          (star) => (

            <button
              key={star}
              onClick={() =>
                submitRating(
                  store.id,
                  star
                )
              }
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg"
            >
              {star}
            </button>

          )
        )}

      </div>

    </div>
  );
};

export default UserStoreCard;