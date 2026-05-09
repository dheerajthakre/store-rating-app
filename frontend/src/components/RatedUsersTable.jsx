import React from 'react'
function RatedUsersTable ({ users }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg overflow-auto">

      <h2 className="text-2xl font-bold mb-4">
        Users Who Rated Your Store
      </h2>

      {users.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No ratings available
        </div>

      ) : (

        <table className="w-full border-collapse">

          <thead className="bg-gray-200">

            <tr>

              <th className="border p-3 text-left">
                Name
              </th>

              <th className="border p-3 text-left">
                Email
              </th>

              <th className="border p-3 text-left">
                Rating
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-all duration-150"
              >

                <td className="border p-3">
                  {user.name}
                </td>

                <td className="border p-3">
                  {user.email}
                </td>

                <td className="border p-3">

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">

                    {user.rating}

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

export default RatedUsersTable;