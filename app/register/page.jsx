'use client';

import Link from "next/link";
import { useState } from "react";
import { createRegisterData } from "../services/registerServices/createRegisterData";

export default function Register() {
    const [userType, setUserType] = useState("User");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const data = {
            name,
            email: email,
            password,
            user_type: userType,
        };
        console.log(data); // Log the collected data
        createRegisterData(data)
    };

    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#7856ff" }}>
            Register
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
                required
                value={name} // Bind value to state
                onChange={(e) => setName(e.target.value)} // Update state on change
              />
            </div>
  
            {/* Email Address */}
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
                required
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
              />
            </div>
            
            {/* User Type */}
            <div>
              <label className="block text-gray-700">User Type</label>
              <select
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                style={{ backgroundColor: "#7856ff" }}
              >
                Register
              </button>
            </div>
  
            {/* Login Link */}
            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link href="/" className="text-indigo-600 hover:underline" style={{ color: "#7856ff" }}>
                Login here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}
