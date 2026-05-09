import React from 'react'
function StoreInfoCard ({ store }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Store Information
      </h2>

      <div className="space-y-3">

        <p>
          <span className="font-semibold">
            Store Name:
          </span>{" "}
          {store?.name}
        </p>

        <p>
          <span className="font-semibold">
            Store Email:
          </span>{" "}
          {store?.email}
        </p>

        <p>
          <span className="font-semibold">
            Address:
          </span>{" "}
          {store?.address}
        </p>

      </div>

    </div>
  );
};

export default StoreInfoCard;