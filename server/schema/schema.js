const graphql = require('graphql')
const _ = require('lodash') 

// Mongoose Models
const User = require('../model/User')
const Hobby = require('../model/Hobby')
const Post = require('../model/Post')

// dummy data
let usersData = [
    { id: "1", name: "Arshia", age: 21, profession: "Software Developer" },
    { id: "2", name: "Mahmut", age: 15, profession: "Baker" },
    { id: "3", name: "Nesli", age: 26, profession: "Student" },
    { id: "4", name: "Ibrahim", age: 44 },
    { id: "5", name: "Fatma", age: 24, profession: "Student" },
    { id: "6", name: "Ayse", age: 32, profession: "Engineer" },
]
let hobbiesData = [
    { id: "1", title: "Programming", description: "description 1", userId: "1" },
    { id: "2", title: "Golf", description: "description 2", userId: "2" },
    { id: "3", title: "Baseball", description: "description 3", userId: "2" },
    { id: "4", title: "Hiking", description: "description 4", userId: "3" },
    { id: "5", title: "Swimming", description: "description 5", userId: "4" },
    { id: "6", title: "Pool", description: "description 6", userId: "6" },
]

let postsData = [
    { id: "1", comment: "comment 1", userId: "1" },
    { id: "2", comment: "comment 2", userId: "1" },
    { id: "3", comment: "comment 3", userId: "3" },
    { id: "4", comment: "comment 4", userId: "4" },
    { id: "5", comment: "comment 5", userId: "1" },
    { id: "6", comment: "comment 6", userId: "6" },
]

// Create types
const UserType = new graphql.GraphQLObjectType({
    name: "User",
    description: "Documentation for user...",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        profession: { type: graphql.GraphQLString, description: "This is a description for profession..." },

        posts: { // All posts for this user.
            type: new graphql.GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, { userId: parent.id })
            }
        },

        hobbies: { // All hobbies for this user.
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, { userId: parent.id })
            }
        }
    })
})

const HobbyType = new graphql.GraphQLObjectType({
    name: "Hobby",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})

const PostType = new graphql.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        comment: { type: graphql.GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, { id: parent.userId })
            }
        }
    })
})


// RootQuery
const RootQuery = new graphql.GraphQLObjectType({
    name: "RootQueryType",
    description: "Description for RootQueryType...",
    fields: {
        user: {
            type: UserType,
            args: { 
                id: { type: graphql.GraphQLID } 
            },

            resolve(parent, args) {
                return _.find(usersData, { id: args.id })
                
                // We resolve with data
                // get and return data from a datasource
            }
        },

        users: {
            type: new graphql.GraphQLList(UserType),
            resolve(parent, args) {
                return usersData
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id })
                // Return data for our hobby
            }
        },

        hobbies: {
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData
            }
        },

        post: {
            type: PostType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                return _.find(postsData, { id: args.id })
            }
        },

        posts: {
            type: graphql.GraphQLList(PostType),
            resolve(parent, args) {
                return postsData
            }
        },
    }
})

// Mutations
const Mutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateUser: {
            type: UserType,
            args: {
                // id: { type: graphql.GraphQLID },
                name: { type: graphql.GraphQLString },
                age: { type: graphql.GraphQLInt },
                profession: { type: graphql.GraphQLString }
            },
            resolve(parent, args) {
                let user = {
                    // id: args.id,
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user
            }
        },

        CreatePost: {
            type: PostType,
            args: {
                // id: { type: graphql.GraphQLID },
                comment: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                let post = {
                    // id: args.id,
                    comment: args.comment,
                    userId: args.userId
                }
                return post
            }
        },

        CreateHobby: {
            type: HobbyType,
            args: {
                // id: { type: graphql.GraphQLID },
                title: { type: graphql.GraphQLString },
                description: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID },
            },
            resolve(parent, args) {
                let hobby = {
                    // id: args.id,
                    title: args.title,
                    desription: args.description,
                    userId: args.userId
                }
                return hobby
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})