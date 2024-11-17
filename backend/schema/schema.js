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
      NOT_STARTED: { value: "Not Started" },
      IN_PROGRESS: { value: "In Progress" },
      COMPLETED: { value: "Completed" },
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
      addProject: {
        type: ProjectType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLString },
          status: { type: GraphQLNonNull(ProjectStatusEnum) },
          clientId: { type: GraphQLNonNull(GraphQLID) },
        },
        async resolve(parent, args) {
          try {
            const project = new Project({
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            });
            return await project.save();
          } catch (error) {
            throw new Error("Error adding project: " + error.message);
          }
        },
      },
    },
  });
  
  // Export the GraphQL schema
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
  });
  