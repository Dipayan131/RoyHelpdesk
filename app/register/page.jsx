'use client';

import Link from "next/link";
import { useState } from "react";
import { createRegisterData } from "../services/registerServices/createRegisterData";
import { useRouter } from "next/navigation";

export default function Register() {
    const [userType, setUserType] = useState("User");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setError(""); // Clear previous errors

        const data = {
            name,
            email,
            password,
            user_type: userType,
        };

        try {
            await createRegisterData(data);
            // Optionally reset the form
            setName("");
            setEmail("");
            setPassword("");
            setUserType("User");
            router.push('/')
        } catch (err) {
            setError("Registration failed. Please try again."); // Handle registration error
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#7856ff" }}>
                    Register
                </h2>
                <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            id="email"
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
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* User Type */}
                    <div>
                        <label htmlFor="userType" className="block text-gray-700">User Type</label>
                        <select
                            id="userType"
                            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
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
                            {loading ? 'Registering...' : 'Register'}
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
