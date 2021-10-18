const graphql = require('graphql')



// Scalar Types;
/*
- String = graphql.GraphQLString
- Int = graphql.GraphQLInt
- Float = graphql.GraphQLFloat
- Boolean = graphql.GraphQLBoolean
- ID = graphql.GraphQLID
*/

const Person = new graphql.GraphQLObjectType({
    name: "Person",
    description: "Represents a Person type.",
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
        age: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
        isMarried: { type: graphql.GraphQLBoolean },
        gpa: { type: graphql.GraphQLFloat },

        justAType: {
            type: Person,
            resolve(parent, args) {

                return parent
            }
        }


    })
})


// RootQuery
const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    id: 1,
                    name: "User",
                    age: 35,
                    isMarried: true,
                    gpa: 4.3
                }
                return personObj
            }
        }
        
    }
})


module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
})