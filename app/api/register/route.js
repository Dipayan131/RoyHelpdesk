import { apiKey } from "@/app/lib/db";
import { registerData } from "@/app/lib/model/registerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {

    let result = []
    try {
        const payload = await req.json();
    await mongoose.connect(apiKey);
    let data = new registerData(payload);
    result = await data.save();

    } catch (error) {
        result = {success:false}
    }
    return NextResponse.json({result, success:true})
}
