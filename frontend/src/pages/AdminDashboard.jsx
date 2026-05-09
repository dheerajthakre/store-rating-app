import { useEffect, useMemo, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import AddUserForm from "../components/AddUserForm";
import AddStoreForm from "../components/AddStoreForm";
import UserTable from "../components/UserTable";
import StoreTable from "../components/StoreTable";
import Loader from "../components/Loader";

import {
  getDashboardStats,
  getUsers,
  getStores,
  addUser,
  addStore,
} from "../services/adminApi";

function AdminDashboard () {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [users, setUsers] = useState([]);

  const [stores, setStores] = useState([]);

  const [userSearch, setUserSearch] =
    useState("");

  const [storeSearch, setStoreSearch] =
    useState("");

  const [userForm, setUserForm] =
    useState({
      name: "",
      email: "",
      address: "",
      password: "",
      role: "USER",
    });

  const [storeForm, setStoreForm] =
    useState({
      name: "",
      email: "",
      address: "",
      owner_id: "",
    });

  // Fetch Dashboard Data
  const fetchData = async () => {

    try {

      const [
        statsResponse,
        usersResponse,
        storesResponse,
      ] = await Promise.all([
        getDashboardStats(),
        getUsers(),
        getStores(),
      ]);

      setStats(
        statsResponse.data.data
      );

      setUsers(
        usersResponse.data.users
      );

      setStores(
        storesResponse.data.stores
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Filter Users
  const filteredUsers = useMemo(() => {

    return users.filter((user) => {

      return (
        user.name
          .toLowerCase()
          .includes(
            userSearch.toLowerCase()
          ) ||

        user.email
          .toLowerCase()
          .includes(
            userSearch.toLowerCase()
          ) ||

        user.role
          .toLowerCase()
          .includes(
            userSearch.toLowerCase()
          ) ||

        user.address
          .toLowerCase()
          .includes(
            userSearch.toLowerCase()
          )
      );
    });

  }, [users, userSearch]);

 
  // Filter Stores

  const filteredStores = useMemo(() => {

    return stores.filter((store) => {

      return (
        store.name
          .toLowerCase()
          .includes(
            storeSearch.toLowerCase()
          ) ||

        store.email
          .toLowerCase()
          .includes(
            storeSearch.toLowerCase()
          ) ||

        store.address
          .toLowerCase()
          .includes(
            storeSearch.toLowerCase()
          )
      );
    });

  }, [stores, storeSearch]);

  
  // Add User
  const handleAddUser = async (e) => {

    e.preventDefault();

    if (
      !userForm.name ||
      !userForm.email ||
      !userForm.password
    ) {
      return alert(
        "Please fill all required fields"
      );
    }

    try {

      await addUser(userForm);

      alert("User added successfully");

      setUserForm({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER",
      });

      fetchData();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Add Store
  const handleAddStore = async (e) => {

    e.preventDefault();

    if (
      !storeForm.name ||
      !storeForm.email
    ) {
      return alert(
        "Please fill all required fields"
      );
    }

    try {

      await addStore(storeForm);

      alert("Store added successfully");

      setStoreForm({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

      fetchData();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // Loading UI
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

      </div>

      {/* Dashboard Cards */}
      <DashboardCards stats={stats} />

      {/* Add User Form */}
      <AddUserForm
        userForm={userForm}
        setUserForm={setUserForm}
        handleAddUser={handleAddUser}
      />

      {/* Add Store Form */}
      <AddStoreForm
        storeForm={storeForm}
        setStoreForm={setStoreForm}
        handleAddStore={handleAddStore}
      />

      {/* Users Table */}
      <UserTable
        users={filteredUsers}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
      />

      {/* Stores Table */}
      <StoreTable
        stores={filteredStores}
        storeSearch={storeSearch}
        setStoreSearch={setStoreSearch}
      />

    </div>
  );
};

export default AdminDashboard;
