import mongoose from "mongoose"

const ticketsModel = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    title: String,
    issue_status: String,
    priority: String,
    body: String
});

export const ticketsData = mongoose.models.tickets || mongoose.model("tickets", ticketsModel)