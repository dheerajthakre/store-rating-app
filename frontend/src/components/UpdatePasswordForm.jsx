import React from 'react'
function UpdatePasswordForm ({ passwordData, setPasswordData, updatePassword }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

      <h2 className="text-2xl font-bold mb-4">
        Update Password
      </h2>

      <form
        onSubmit={updatePassword}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="password"
          placeholder="Old Password"
          value={passwordData.oldPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              oldPassword:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              newPassword:
                e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 md:col-span-2 transition-all duration-200"
        >
          Update Password
        </button>

      </form>

    </div>
  );
};

export default UpdatePasswordForm;