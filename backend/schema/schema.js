const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require("graphql");
  
  // Import the models
  const Project = require("../models/ProjectsSchema");
  const Client = require("../models/ClientsSchema");
  
  // Client Type
  const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
    }),
  });
  
  // Enum for Project Status
  const ProjectStatusEnum = new GraphQLEnumType({
    name: "ProjectStatus",
    values: {
      NEW: { value: "NEW" }, // Represents "Not Started" in client UI
      IN_PROGRESS: { value: "IN_PROGRESS" }, // Represents "In Progress" in client UI
      COMPLETED: { value: "COMPLETED" }, // Represents "Completed" in client UI
    },
  });
  
  
  // Project Type
  const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: ProjectStatusEnum },
      client: {
        type: ClientType,
        resolve(parent, args) {
          return Client.findById(parent.clientId);
        },
      },
    }),
  });
  
  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      clients: {
        type: new GraphQLList(ClientType),
        resolve(parent, args) {
          return Client.find();
        },
      },
      client: {
        type: ClientType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Client.findById(args.id);
        },
      },
      projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          return Project.find();
        },
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return Project.findById(args.id);
        },
      },
    },
  });
  
  // Mutations
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      // add Client
      addClient: {
        type: ClientType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          phone: { type: GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
          try {
            const client = new Client({
              name: args.name,
              email: args.email,
              phone: args.phone,
            });
            return await client.save();
          } catch (error) {
            throw new Error("Error adding client: " + error.message);
          }
        },
      },
      // Delete Client
        deleteClient:{
          type: ClientType,
          args:{
            id: {type : GraphQLNonNull(GraphQLID)},
          },
          resolve(parent, args){
            return Client.findByIdAndDelete(args.id)
          }
        },
      // add Project
      addProject: {
        type: ProjectType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLString },
          status: { type: GraphQLNonNull(ProjectStatusEnum) },
          clientId: { type: GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args) {
          console.log("Received args for addProject:", args); // Log the input data
          try {
            const project = new Project({
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            });
            return await project.save();
          } catch (error) {
            console.error("Error saving project:", error); // Log the error
            throw new Error("Error adding project: " + error.message);
          }
        },
      },
      

      // delete Project
      deleteProject: {
        type: ProjectType,
        args:{
          id: {type : GraphQLNonNull(GraphQLID)},
        },
        resolve(parent, args){
          return Project.findByIdAndDelete(args.id)
        }
      },
      // Update Project
      UpdateProject:{
          type: ProjectType,
          args:{
            id: {type : GraphQLNonNull(GraphQLID)},
            name: {type : GraphQLString},
            description: {type : GraphQLString},
            status: { type: GraphQLNonNull(ProjectStatusEnum) },
          },
          resolve(parent, args){
            return Project.findByIdAndUpdate(
              args.id,
              {
                $set:{
                  name: args.name,
                  description: args.description,
                  status: args.status
                },
              },
              {new: true}
            )
          }
      }
    },
  });
  
  // Export the GraphQL schema
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });
  