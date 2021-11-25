const { buildSchema } = require('graphql');
const adSchema = require('./ad/index');

const queries = [adSchema.queries];
const mutations = [];
const schema = [adSchema.enums, adSchema.objects];

module.exports.schema = buildSchema(`
    ${schema.join('\n')}
    type Query {
        ${queries.join('\n')}
    }
`);

module.exports.root = {
    ...adSchema.root
};