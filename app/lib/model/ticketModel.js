import mongoose from "mongoose"

const ticketsModel = new mongoose.Schema({
    id: String,
    name: String,
    user_email: String,
    message: String,
    title: String,
    issue_status: String,
    priority: String,
    body: String
});

export const ticketsData = mongoose.models.tickets || mongoose.model("tickets", ticketsModel)