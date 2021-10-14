const express = require('express')
const GraphQL = require('express-graphql')

const schema = require('./schema/schema') // RootQuery

const app = express()



app.use('/graphql', GraphQL.graphqlHTTP({
    graphiql: true,
    schema
}))




app.listen(4000, () => { // localhost:4000
    console.log("Listening at port 4000")
})