import React from 'react'
function SearchBar ({ search, setSearch }) {
  return (
    <div className="mb-8">

      <input
        type="text"
        placeholder="Search stores by name or address..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full md:w-96 border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      />

    </div>
  );
};

export default SearchBar;