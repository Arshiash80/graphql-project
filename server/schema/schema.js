const graphql = require('graphql')
const _ = require('lodash') 

// Mongoose Models
const User = require('../model/User')
const Hobby = require('../model/Hobby')
const Post = require('../model/Post')

// dummy data

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
                // return _.find(usersData, { id: parent.userId })
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
                // return _.find(usersData, { id: args.id })
                
                // We resolve with data
                // get and return data from a datasource
            }
        },

        users: {
            type: new graphql.GraphQLList(UserType),
            resolve(parent, args) {
                // return usersData
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                // return _.find(hobbiesData, { id: args.id })
                // Return data for our hobby
            }
        },

        hobbies: {
            type: new graphql.GraphQLList(HobbyType),
            resolve(parent, args) {
                // return hobbiesData
            }
        },

        post: {
            type: PostType,
            args: { id: { type: graphql.GraphQLID } },

            resolve(parent, args) {
                // return _.find(postsData, { id: args.id })
            }
        },

        posts: {
            type: graphql.GraphQLList(PostType),
            resolve(parent, args) {
                // return postsData
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
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                // Save to db
                user.save()
                return user
            }
        },

        CreatePost: {
            type: PostType,
            args: {
                comment: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID }
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                })
                // Save to db
                post.save()

                return post
            }
        },

        CreateHobby: {
            type: HobbyType,
            args: {
                title: { type: graphql.GraphQLString },
                description: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID },
            },
            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    desription: args.description,
                    userId: args.userId
                })
                // Save to db
                hobby.save()
                
                return hobby
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})