import { apiKey } from "@/app/lib/db";
import { registerData } from "@/app/lib/model/registerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Install bcrypt: npm install bcrypt

export async function POST(req) {
    let result = [];
    try {
      const payload = await req.json();
      await mongoose.connect(apiKey);
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(payload.password, 10);
  
      // Create a new user with hashed password
      let data = new registerData({
        ...payload,
        password: hashedPassword,
      });
  
      result = await data.save();
    } catch (error) {
      result = { success: false };
    }
    return NextResponse.json({ result, success: true });
  }