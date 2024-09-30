'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "./context/AppContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {setValue, setName, setUserEmail} = useMyContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("asbndaojn",result);
      if (result.success) {
        const userType = result.data.userType;

        console.log("look", userType)

        setUserEmail(email)
        setName(result.data.name)
        // Redirect based on userType
        if (userType === "Admin") {
          setValue(userType)
          router.push('/adminPage');
        } else {
          setValue(userType)
          router.push('/tickets');
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#7856ff" }}>
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Address */}
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full text-white py-2 px-4 rounded-md transition duration-200 ${loading ? 'bg-gray-400' : 'hover:bg-indigo-700'}`}
              style={{ backgroundColor: "#7856ff" }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <p className="text-center mt-4 text-gray-600">
                        You don't have any account?{" "}
                        <Link href="/register" className="text-indigo-600 hover:underline" style={{ color: "#7856ff" }}>
                            Create Now!
                        </Link>
                    </p>
        </form>
      </div>
    </div>
  );
}
