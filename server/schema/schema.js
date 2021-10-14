const graphql = require('graphql')
const _ = require('lodash') 

// dummy data
let usersData = [
    { id: "1", name: "Arshia", age: 21, profession: "Software Developer" },
    { id: "2", name: "Mahmut", age: 15, profession: "Baker" },
    { id: "3", name: "Nesli", age: 26, profession: "Student" },
    { id: "4", name: "Ibrahim", age: 44 },
    { id: "5", name: "Fatma", age: 24, profession: "Student" },
    { id: "6", name: "Ayse", age: 32, profession: "Engineer" },
]
let hobbyData = [
    { id: "1", title: "Programming", description: "description 1" },
    { id: "2", title: "Golf", description: "description 2" },
    { id: "3", title: "Baseball", description: "description 3" },
    { id: "4", title: "Hiking", description: "description 4" },
    { id: "5", title: "Swimming", description: "description 5" },
    { id: "6", title: "Pool", description: "description 6" },
]

let postData = [
    { id: "1", comment: "comment 1" },
    { id: "2", comment: "comment 2" },
    { id: "3", comment: "comment 3" },
    { id: "4", comment: "comment 4" },
    { id: "5", comment: "comment 5" },
    { id: "6", comment: "comment 6" },
]

// Create types
const UserType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        profession: { type: graphql.GraphQLString, description: "This is a description for profession..." }
    })
})

const HobbyType = new graphql.GraphQLObjectType({
    name: "Hobby",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
    })
})

const PostType = new graphql.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        comment: { type: graphql.GraphQLString },
    })
})


// RootQuery
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    description: "Description for RootQueryType...",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                return _.find(usersData, { id: args.id })
                
                // We resolve with data
                // get and return data from a datasource
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                return _.find(hobbyData, { id: args.id })
                // Return data for our hobby
            }
        },
        post: {
            type: PostType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                return _.find(postData, { id: args.id })
            }
        },
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})