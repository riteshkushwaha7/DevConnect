require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
// const { v4: uuid } = require("uuid");

const connectDB  = require('./db/connect'); // ✅ correct for named export
const userRouter = require("./routes/userRoute");
const updateRoute = require("./routes/updateRoute");
const fetchProfileRouter = require("./routes/fetchProfileRoute");
const requestRoute = require("./routes/requestRoute");
const swapRequestRoute = require("./routes/swapRequestRoute"); // new route

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRouter);                     // Signup, Login, Verify
app.use("/api/profile", fetchProfileRouter);      // GET /user?email=
app.use("/api/profile/update", updateRoute);      // PUT /update
app.use("/api/requests", requestRoute);           // GET all skill cards
app.use("/api/swaprequests", swapRequestRoute);   // POST /send, GET /received/:userId, etc.

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});