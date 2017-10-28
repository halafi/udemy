const graphql = require("graphql");
// const _ = require("lodash");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType, // return object type
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // data retreival logic
        // args: original query arguments
        // graphql converts to UserType json, raw object or Promsie
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data); // response is in { data: ... }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
