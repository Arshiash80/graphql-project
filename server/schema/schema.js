const graphql = require('graphql')

// Create types
const UserType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt }
    })
})


// RootQuery
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    description: "Description...",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLString } },

            resolve(parent, args) {
                // We resolve with data
                // get and return data from a datasource

            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})