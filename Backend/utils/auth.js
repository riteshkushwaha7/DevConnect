const jwt = require("jsonwebtoken");
const secret = "ritesh4545";

function setUser(user){
    return jwt.sign(user, secret);
}

function getUser(token){
    return jwt.verify(token,secret)
}

module.exports = {
    setUser,
    getUser
}