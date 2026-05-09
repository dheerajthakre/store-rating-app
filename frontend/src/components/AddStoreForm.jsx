import React from 'react'
function AddStoreForm ({ storeForm, setStoreForm, handleAddStore }) {

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-10">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Add Store
      </h2>

      {/* Form */}
      <form
        onSubmit={handleAddStore}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        {/* Store Name */}
        <input
          type="text"
          placeholder="Store Name"
          value={storeForm.name}
          onChange={(e) =>
            setStoreForm({
              ...storeForm,
              name: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Store Email */}
        <input
          type="email"
          placeholder="Store Email"
          value={storeForm.email}
          onChange={(e) =>
            setStoreForm({
              ...storeForm,
              email: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={storeForm.address}
          onChange={(e) =>
            setStoreForm({
              ...storeForm,
              address: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Owner ID */}
        <input
          type="number"
          placeholder="Owner ID"
          value={storeForm.owner_id}
          onChange={(e) =>
            setStoreForm({
              ...storeForm,
              owner_id: e.target.value,
            })
          }
          className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition-all duration-200"
        >
          Add Store
        </button>

      </form>

    </div>
  );
};

export default AddStoreForm;