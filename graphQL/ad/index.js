const { enums, enumNames } = require('./enums');
const { objects, objectNames } = require('./objects');
const { inputs, inputNames } = require('./inputs');
const { getAdByID, getAds, getPublishedAds, getAdsByName, updateAd, createAd, addAnswser, addQuestion, deleteAd } = require('../../database/index').adService;

module.exports.enums = enums.join('\n');
module.exports.objects = objects.join('\n');
module.exports.inputs = inputs.join('\n');

module.exports.queries = `
    getAdByID(id: String!): ${objectNames.Ad}
    searchAdsByName(name: String!): [${objectNames.Ad}!]!
    getPublishedAds(propertyType: ${enumNames.PropertyType}!): [${objectNames.Ad}!]!
    getAds: [${objectNames.Ad}!]!
`;

module.exports.mutations = `
    createAd(content: ${inputNames.AdCreateContent}!): ${objectNames.Ad}!
    updateAd(id: ID!, content: ${inputNames.AdUpdateContent}): ${objectNames.Ad}
    deleteAd(id: ID!): ${objectNames.Ad}
    postComment(adID: ID!, user: String!, content: String!): ${objectNames.Ad}
    postAnswer(adID: ID!, commentIndex: Int!, agent: String!, content: String!): ${objectNames.Ad}
`;

module.exports.root = {
    Query: {
        getAdByID: (root, args, context) => getAdByID(args.id),
        searchAdsByName: (root, args, context) => getAdsByName(args.name),
        getPublishedAds: (root, args, context) => getPublishedAds(args.propertyType),
        getAds: () => getAds(),
    },
    Mutation: {
        createAd: (root, args, context) => createAd(args.content),
        updateAd: (root, args, context) => updateAd(args.id, args.content),
        deleteAd: (root, args, context) => deleteAd(args.id),
        postComment: (root, args, context) => addQuestion(args.adID, args.user, args.content),
        postAnswer: (root, args, context) => addAnswser(args.adID, args.commentIndex, args.agent, args.content)
    }
};