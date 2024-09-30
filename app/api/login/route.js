import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { apiKey } from "@/app/lib/db";
import { registerData } from "@/app/lib/model/registerModel";
import jwt from 'jsonwebtoken';

// Function to connect to the database
async function connectToDatabase() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(apiKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  }
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to the database
    await connectToDatabase();

    // Find user by email
    const user = await registerData.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ success: false, message: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign({ _id: user._id }, "iamin", {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Create the response object
    const response = NextResponse.json({ 
      success: true, 
      data: { 
        email: user.email, 
        userType: user.user_type,
        name: user.name
      } 
    });

    // Set a cookie for authentication
    response.cookies.set('token', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      path: '/', // Cookie is available for all routes
      maxAge: 60 * 60 * 24 * 7, // Cookie expiration time (7 days)
      sameSite: 'strict', // Helps protect against CSRF attacks
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
