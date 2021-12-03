const Date = require('./dateScalar');

module.exports.scalar = `
    scalar ${Date.name}
`;

module.exports.root = {
    Date
};