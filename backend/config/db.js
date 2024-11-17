require("dotenv").config()
const mongoose = require("mongoose")


const dbConfig = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected!!!");
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = dbConfig