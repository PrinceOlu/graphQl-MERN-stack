require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const dbConfig = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect the database
dbConfig();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: process.env.NODE_ENV === "development",
    })
);

// Start the server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
