import mongoose from "mongoose"

const registerModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    user_type: String,
});

export const registerData = mongoose.models.registers || mongoose.model("registers", registerModel)