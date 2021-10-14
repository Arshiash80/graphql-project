const graphql = require('graphql')
const _ = require('lodash') 

// dummy data
let usersData = [
    { id: "1", name: "Arshia", age: 21, status: "Software Developer" },
    { id: "2", name: "Mahmut", age: 15, status: "Student" },
    { id: "3", name: "Nesli", age: 26, status: "Student" },
    { id: "4", name: "Ibrahim", age: 44 },
    { id: "5", name: "Fatma", age: 24, status: "Student" },
    { id: "6", name: "Ayse", age: 32, status: "Engineer" },
]

// Create types
const UserType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        status: { type: graphql.GraphQLString }
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
                return _.find(usersData, { id: args.id })

                // We resolve with data
                // get and return data from a datasource

            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})