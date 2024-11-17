const mongoose = require("mongoose")

const clientsSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    }
})
// create a model
const Clients = mongoose.model("Clients", clientsSchema)

module.exports = Clients;