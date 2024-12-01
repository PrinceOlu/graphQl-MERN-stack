const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures that a name is always provided
  },
  description: {
    type: String,
    required: false, // Description is optional
  },
  status: {
    type: String,
    enum: ["NEW", "IN_PROGRESS", "COMPLETED"], // Matches GraphQL enum values
    default: "NEW", // Default value for new projects
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClientsSchema", // Correct reference to the client schema
    required: false, // Ensures that every project is linked to a client
  },
});

// Create a model
const Projects = mongoose.model("Projects", projectsSchema);

module.exports = Projects;
