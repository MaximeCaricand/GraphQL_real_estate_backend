const { buildSchema } = require('graphql');
const { getAdByID } = require('../database/services/ad.service');


module.exports.schema = buildSchema(`
    type Ad {
        id: ID!
        title: String!
        price: Int!
    }
    type Query {
        hello: String
        ad(id: String!): Ad
    }
`);


module.exports.root = {
    ad: async (args) => await getAdByID(args.id)
};