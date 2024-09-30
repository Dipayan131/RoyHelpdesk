
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Create a response
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });

    // Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      path: '/', // Cookie is available for all routes
      maxAge: 0, // Set maxAge to 0 to delete the cookie immediately
      sameSite: 'strict', // Helps protect against CSRF attacks
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
