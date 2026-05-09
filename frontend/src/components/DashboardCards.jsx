import React from 'react'
function DashboardCards  ({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <p className="text-4xl font-bold mt-4">
          {stats.totalUsers}
        </p>
      </div>

      <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Total Stores</h2>
        <p className="text-4xl font-bold mt-4">
          {stats.totalStores}
        </p>
      </div>

      <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold">Total Ratings</h2>
        <p className="text-4xl font-bold mt-4">
          {stats.totalRatings}
        </p>
      </div>

    </div>
  );
};

export default DashboardCards;