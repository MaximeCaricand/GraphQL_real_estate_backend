const { Kind } = require('graphql/language');
const { GraphQLScalarType } = require('graphql');

module.exports = new GraphQLScalarType({
    name: 'Date',
    serialize: (value) => {
        if (typeof value === "number") {
            return value;
        }
    },
    parseValue: (value) => {
        if (typeof value === "number") {
            return value;
        }
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.INT) {
            const num = parseInt(ast.value, 10);
            return new Date(num).getTime();
        }
    }
});