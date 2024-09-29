import { apiKey } from "@/app/lib/db";
import { ticketsData } from "@/app/lib/model/ticketModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    let data = [];
    try {
        await mongoose.connect(apiKey);

        // Extract the id from the query params
        const id = req.nextUrl.searchParams.get('id');

        if (id) {
            // Fetch data for the specific id
            data = await ticketsData.findById(id);
        } else {
            // Fetch all data
            data = await ticketsData.find();
        }
        
    } catch (error) {
        data = { success: false };
    }

    return NextResponse.json({ data });
}


export async function POST(req) {

    let result = []
    try {
        const payload = await req.json();
        await mongoose.connect(apiKey);
        let data = new ticketsData(payload);
        result = await data.save();

    } catch (error) {
        result = {success:false}
    }
    return NextResponse.json({result, success:true})
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await mongoose.connect(apiKey);
        const result = await ticketsData.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ success: false, message: "Record not found" });
        }

        return NextResponse.json({ success: true, message: "Record deleted successfully", result });
    } catch (error) {
        return NextResponse.json({ success: false, message: "An error occurred", error: error.message });
    }
}