const { makeExecutableSchema } = require("@graphql-tools/schema");
const adSchema = require('./ad/index');
const sharedSchema = require('./shared/index');

const queries = [adSchema.queries];
const mutations = [adSchema.mutations];
const schema = [sharedSchema.scalar, adSchema.enums, adSchema.objects, adSchema.inputs];

const typeDefs = `
    ${schema.join('\n')}
    type Query {
        ${queries.join('\n')}
    }
    type Mutation {
        ${mutations.join('\n')}
    }
`;

const resolvers = {
    ...sharedSchema.root,
    Query: {
        ...adSchema.root.Query
    },
    Mutation: {
        ...adSchema.root.Mutation
    }
};

module.exports.schema = makeExecutableSchema({ typeDefs, resolvers })