const { GraphQLScalarType } = require('graphql');

module.exports = new GraphQLScalarType({
    name: 'Image',
    serialize: (value) => {
        if (typeof value === "string") {
            return value;
        }
    },
    parseValue: (value) => {
        if (typeof value === "string") {
            return value;
        }
        if (Buffer.isBuffer(value)) {
            return value.toString('base64');
        }
    }
});