const mongoose = require("mongoose");
require("dotenv").config(); // Just in case it's not already at the top

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("✅ MongoDB is connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
}

module.exports = { connectDB };