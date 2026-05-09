import React from 'react'
function AddUserForm  ({ userForm, setUserForm, handleAddUser }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Add User
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddUser}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={userForm.name}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              name: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={userForm.email}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              email: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={userForm.address}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              address: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={userForm.password}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              password: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Role */}
        <select
          value={userForm.role}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              role: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        >

          <option value="USER">
            USER
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="STORE_OWNER">
            STORE OWNER
          </option>

        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition-all duration-200"
        >
          Add User
        </button>

      </form>

    </div>
  );
};

export default AddUserForm;