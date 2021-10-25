const express = require('express')
const GraphQL = require('express-graphql')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const schema = require('./schema/schema') // RootQuery
const testSchema = require('./schema/types_schema')

const cors = require('cors');


const PORT = process.env.PORT || 4000
const app = express()

let mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(mongoDBConnectionString)
mongoose.connection.once('open', () => {
    console.log("Yes!! We are connected!")
})


app.use(cors())
app.use('/graphql', GraphQL.graphqlHTTP({
    graphiql: true,
    schema: schema
}))


app.listen(PORT, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});