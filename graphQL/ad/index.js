const { enums, enumNames } = require('./enums');
const { objects, objectNames } = require('./objects');
const { getAdByID, getAds, getPublishedAds, getAdsByName } = require('../../database/index').adService;

module.exports.enums = enums.join('\n');
module.exports.objects = objects.join('\n');

module.exports.queries = `
    getAdByID(id: String!): ${objectNames.Ad}!
    searchAdsByName(name: String!): [${objectNames.Ad}!]!
    getPublishedAds(propertyType: ${enumNames.PropertyType}!): [${objectNames.Ad}!]!
    getAds: [${objectNames.Ad}!]!
`;

module.exports.root = {
    Query: {
        getAdByID: (root, args, context) => getAdByID(args.id),
        searchAdsByName: (root, args, context) => getAdsByName(args.name),
        getPublishedAds: (root, args, context) => getPublishedAds(args.propertyType),
        getAds: () => getAds(),
    }
};