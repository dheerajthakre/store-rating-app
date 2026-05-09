import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Signup () {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  // Handle Input Change

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.success) {
      alert("Registration successful");

      navigate("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 ml-1"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;