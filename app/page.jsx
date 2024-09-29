"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [userType, setUserType] = useState("User");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#7856ff" }}
        >
          Login
        </h2>
        <form className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
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
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              style={{ backgroundColor: "#7856ff" }}
            >
              Login
            </button>
          </div>
          {/* Create Account Link */}
          <p className="text-center mt-4 text-gray-600">
            You don't have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 hover:underline"
              style={{ color: "#7856ff" }}
            >
              Create now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
