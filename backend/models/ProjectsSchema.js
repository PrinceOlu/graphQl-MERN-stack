const mongoose = require("mongoose")

const projectsSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    status:{
        type: String,
        enum:['Not Started', 'In Progress', 'Completed']
    },
    // to reference the client from the project schema
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientsSchema'
    }
})
// create a model
const Projects = mongoose.model("Projects", projectsSchema)

module.exports = Projects;