import { useEffect, useState } from "react";

import Loader from "../components/Loader";
import StoreInfoCard from "../components/StoreInfoCard";
import RatingCard from "../components/RatingCard";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import RatedUsersTable from "../components/RatedUsersTable";

import {
  getOwnerDashboard,
  updateOwnerPassword,
} from "../services/ownerApi";

function OwnerDashboard () {

  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);
  const [users, setUsers] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [passwordData, setPasswordData] = useState({
      oldPassword: "",
      newPassword: "",
    });

  // Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {

      const token = localStorage.getItem("token");
      const response = await getOwnerDashboard(
          token
        );

      setStore(
        response.data.store
      );

      setUsers(
        response.data.users
      );

      setAverageRating(
        response.data.average_rating
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

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

      const token =
        localStorage.getItem("token");

      await updateOwnerPassword(
        passwordData,
        token
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Store Owner Dashboard
        </h1>

      </div>

      {/* Store Info */}
      <StoreInfoCard store={store} />

      {/* Rating Card */}
      <RatingCard
        averageRating={averageRating}
      />

      {/* Password Form */}
      <UpdatePasswordForm
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        updatePassword={updatePassword}
      />

      {/* Rated Users */}
      <RatedUsersTable users={users} />

    </div>
  );
};

export default OwnerDashboard;
