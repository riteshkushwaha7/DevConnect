const express = require("express");
const app = express();
const path = require("path");
const {insert,auth} = require("./insertcredientials")
const {v4: uuid} = require("uuid");
const {setUser,getUser} = require("./utill/auth");
const cookieParser = require("cookie-parser");
const {restricToLoggedinUserOnly} = require("./middleware/auth")
const requestRoute = require('./routes/requestRoute');


app.use(express.static(path.join(__dirname,"public")))
const port = 3000;
app.use(cors(
    { origin: "http://localhost:5173", 
  credentials: true}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use('/api/requests', requestRoute);



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});