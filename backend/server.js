require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const schema = require("./schema/schema")
const PORT = process.env.PORT || 5000
const { graphqlHTTP } = require("express-graphql");

// middlewares
app.use(express.json())
app.use(cors())
app.use('/graphql',graphqlHTTP({
schema: schema,
graphiql: process.env.NODE_ENV === "development"
}))


// start the server
app.listen(PORT,()=> console.log(`server running on port : ${PORT}`)
)