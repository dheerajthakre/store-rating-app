import React from 'react'
function StoreTable ({ stores, storeSearch, setStoreSearch }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow overflow-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

        <h2 className="text-2xl font-bold">
          Stores
        </h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search stores..."
          value={storeSearch}
          onChange={(e) =>
            setStoreSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-72 outline-none focus:ring-2 focus:ring-green-400"
        />

      </div>

      {/* Empty State */}
      {stores.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No stores found
        </div>

      ) : (

        <table className="w-full border-collapse">

          {/* Table Head */}
          <thead className="bg-gray-200">

            <tr>

              <th className="border p-3 text-left">
                Store Name
              </th>

              <th className="border p-3 text-left">
                Email
              </th>

              <th className="border p-3 text-left">
                Address
              </th>

              <th className="border p-3 text-left">
                Rating
              </th>

            </tr>

          </thead>

          {/* Table Body */}
          <tbody>

            {stores.map((store) => (

              <tr
                key={store.id}
                className="hover:bg-gray-50 transition-all duration-150"
              >

                <td className="border p-3">
                  {store.name}
                </td>

                <td className="border p-3">
                  {store.email}
                </td>

                <td className="border p-3">
                  {store.address}
                </td>

                <td className="border p-3">

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">

                    {store.average_rating
                      ? Number(
                          store.average_rating
                        ).toFixed(1)
                      : "0.0"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default StoreTable;