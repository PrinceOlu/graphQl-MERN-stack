const { projects, clients } = require("../sampleData");
const {
     GraphQLObjectType, 
     GraphQLID,
     GraphQLString,
     GraphQLSchema,
     GraphQLList
     } = require("graphql");

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

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Query to get all clients
    clients:{
        type: new GraphQLList(ClientType),
        resolver(parent, args){
            return clients
        }
    },
    // query to get a single client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // Find and return the client with the matching ID
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

// Export the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery, // Correctly pass the RootQuery object
});
