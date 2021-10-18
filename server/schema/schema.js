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
            async resolve(parent, args) {
                let posts
                try { posts = await Post.find({ userId: parent.id }) } catch (error) { throw error }
                return posts
            }
        },

        hobbies: { // All hobbies for this user.
            type: new graphql.GraphQLList(HobbyType),
            async resolve(parent, args) {
                let hobbies
                try { hobbies = await Hobby.find({ userId: parent.id }) } catch (error) { throw error }
                return hobbies
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
            async resolve(parent, args) {
                let user
                try { user = await User.findById(parent.userId).exec() } catch (error) { throw error }
                return user
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
            async resolve(parent, args) {
                let user 
                try { user = await User.findById(parent.userId).exec() } catch (error) { throw error }
                return user
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

            async resolve(parent, args) {                
                let user
                try { user = await User.findById(args.id).exec() } catch(error) { throw error }
                return user
            }
        },

        users: {
            type: new graphql.GraphQLList(UserType),
            async resolve(parent, args) {
                let users
                try { users = await User.find({}) } catch (error) { throw error }
                return users
            }
        },

        hobby: {
            type: HobbyType,
            args: { id: { type: graphql.GraphQLID } },

            async resolve(parent, args) {
                let hobby
                try { hobby = await Hobby.findById(args.id).exec() } catch (error) { throw error }
                return hobby
            }
        },

        hobbies: {
            type: new graphql.GraphQLList(HobbyType),
            async resolve(parent, args) {
                let hobbies
                try { hobbies = await Hobby.find({}) } catch (error) { throw error }
                return hobbies
            }
        },

        post: {
            type: PostType,
            args: { id: { type: graphql.GraphQLID } },

            async resolve(parent, args) {
                let post
                try { post = await Post.findById(args.id).exec() } catch (error) { throw error }
                return post
            }
        },

        posts: {
            type: graphql.GraphQLList(PostType),
            async resolve(parent, args) {
                let posts
                try { posts = await Post.find({}) } catch (error) { throw error }
                return posts
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
            async resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                // Save to db
                let newUser
                try { newUser = await user.save() } catch (error) { throw error }
                return newUser
            }
        },

        CreatePost: {
            type: PostType,
            args: {
                comment: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID }
            },
            async resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                    userId: args.userId
                })
                // Save to db
                let newPost
                try { newPost = await post.save() } catch (error) { throw error }
                return newPost
            }
        },

        CreateHobby: {
            type: HobbyType,
            args: {
                title: { type: graphql.GraphQLString },
                description: { type: graphql.GraphQLString },
                userId: { type: graphql.GraphQLID },
            },
            async resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                // Save to db
                let newHobby
                try { newHobby = await hobby.save() } catch (error) { throw error }
                return newHobby
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})