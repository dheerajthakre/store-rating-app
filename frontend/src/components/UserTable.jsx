import React from 'react'
function UserTable ({ users, userSearch, setUserSearch }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10 overflow-auto">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

        <h2 className="text-2xl font-bold">
          Users
        </h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={userSearch}
          onChange={(e) =>
            setUserSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-72 outline-none focus:ring-2 focus:ring-blue-400"
        />

      </div>

      {/* Empty State */}
      {users.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No users found
        </div>

      ) : (

        <table className="w-full border-collapse">

          {/* Table Head */}
          <thead className="bg-gray-200">

            <tr>

              <th className="border p-3 text-left">
                Name
              </th>

              <th className="border p-3 text-left">
                Email
              </th>

              <th className="border p-3 text-left">
                Role
              </th>

              <th className="border p-3 text-left">
                Address
              </th>

            </tr>

          </thead>

          {/* Table Body */}
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
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="border p-3">
                  {user.address}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default UserTable;