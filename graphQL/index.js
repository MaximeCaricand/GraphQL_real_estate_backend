const { makeExecutableSchema } = require("@graphql-tools/schema");
const adSchema = require('./ad/index');

const queries = [adSchema.queries];
const mutations = [];
const schema = [adSchema.enums, adSchema.objects];

const typeDefs = `
    ${schema.join('\n')}
    type Query {
        ${queries.join('\n')}
    }
`;

const resolvers = {
    Query: {
        ...adSchema.root.Query
    }
};

module.exports.schema = makeExecutableSchema({ typeDefs, resolvers })