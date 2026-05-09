import { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserStoreCard from "../components/UserStoreCard";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

import { getStores, submitStoreRating, updateUserPassword } from "../services/userApi";

function UserDashboard () {

  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [passwordData, setPasswordData] = useState({
      oldPassword: "",
      newPassword: "",
    });

  // Fetch Stores
  const fetchStores = async () => {
    try {
      const response = await getStores(); 
      setStores(
        response.data.stores
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Submit Rating
  const submitRating = async ( storeId, rating ) => {
    try {
      await submitStoreRating({
        store_id: storeId,
        rating,
      });

      alert(
        "Rating submitted successfully"
      );

      fetchStores();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Update Password
  const updatePassword = async (e) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword
    ) {
      return alert(
        "Please fill all fields"
      );
    }

    try {

      await updateUserPassword(
        passwordData
      );

      alert(
        "Password updated successfully"
      );

      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Filter Stores
  const filteredStores = useMemo(() => {
      return stores.filter(
        (store) => {
          return (
            store.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            store.address
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
          );
        }
      );

    }, [stores, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          User Dashboard
        </h1>

      </div>

      {/* Password Form */}
      <UpdatePasswordForm
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        updatePassword={updatePassword}
      />

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {/* Store List */}
      {filteredStores.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No stores found
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredStores.map(
            (store) => (

              <UserStoreCard
                key={store.id}
                store={store}
                submitRating={submitRating}
              />

            )
          )}

        </div>

      )}

    </div>
  );
};

export default UserDashboard;
