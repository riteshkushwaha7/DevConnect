const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("process.env.MONGO_DB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB is connected");
    } catch (err) {
        console.error(" MongoDB connection error:", err);
    }
}

module.exports = { connectDB };
