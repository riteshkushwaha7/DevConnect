const mongoose = require("mongoose");
const DB = mongoose.connection;
const coll = DB.collection("users");
async function insert(name, email, pswd) {
    try {
        const doc = { name: name, email: email, pswd: pswd };
        const result = await coll.insertOne(doc);
        console.log("Inserted ID:", result.insertedId);
    } catch (error) {
        console.error("Error inserting document:", error);
    }
}

async function auth(user, pswd) {
    const data = await coll.findOne({ user, pswd }); 
    return data ? data.name : null; 
}


module.exports = {insert,auth};