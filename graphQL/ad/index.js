const { enums, enumNames } = require('./enums');
const { objects, objectNames } = require('./objects');
const { getAdByID, getAds, getPublishedAds, getAdsByName } = require('../../database/index').adService;

module.exports.enums = enums.join('\n');
module.exports.objects = objects.join('\n');

module.exports.queries = `
    getAdByID(id: String!): ${objectNames.Ad}!
    getAdsByUserID(userID: String!): [${objectNames.Ad}!]!
    getAdsByName(name: String!): [${objectNames.Ad}!]!
    getPublishedAds(propertyType: ${enumNames.PropertyType}!): [${objectNames.Ad}!]!
    getAds: [${objectNames.Ad}!]!
`;

module.exports.root = {
    getAdById: async (args) => await getAdByID(args.id),
    getAdsByName: async (args) => await getAdsByName(args.name),
    getPublishedAds: async (args) => await getPublishedAds(args.propertyType),
    getAds: async () => await getAds(),
};