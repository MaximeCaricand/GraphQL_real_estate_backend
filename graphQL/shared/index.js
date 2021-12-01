const Date = require('./dateScalar');
const Image = require('./imageScalar');

module.exports.scalar = `
    scalar ${Date.name}
    scalar ${Image.name}
`;

module.exports.root = {
    Date,
    Image
};