const { enums, enumNames } = require('./enums');
const { objects, objectNames } = require('./objects');
const { inputs, inputNames } = require('./inputs');
const { getAdByID, getAds, getPublishedAds, getAdsByName, updateAd, createAd, addAnswser, addQuestion, deleteAd, numberOfAds } = require('../../database/index').adService;

module.exports.enums = enums.join('\n');
module.exports.objects = objects.join('\n');
module.exports.inputs = inputs.join('\n');

module.exports.queries = `
    getAdByID(id: String!): ${objectNames.Ad}
    searchAdsByName(name: String!): [${objectNames.Ad}!]!
    getPublishedAds(propertyType: ${enumNames.PropertyType}): [${objectNames.Ad}!]!
    getAds: [${objectNames.Ad}!]!
    numberOfAds(propertyType: ${enumNames.PropertyType}): Int!
`;

module.exports.mutations = `
    createAd(content: ${inputNames.AdCreateContent}!, images: [Image!]): ${objectNames.Ad}!
    updateAd(id: ID!, content: ${inputNames.AdUpdateContent}, images: [Image!]): ${objectNames.Ad}
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
        numberOfAds: (root, args, context) => numberOfAds(args.propertyType)
    },
    Mutation: {
        createAd: (root, args, context) => createAd(args.content, args.images),
        updateAd: (root, args, context) => updateAd(args.id, args.content, args.images),
        deleteAd: (root, args, context) => deleteAd(args.id),
        postComment: (root, args, context) => addQuestion(args.adID, args.user, args.content),
        postAnswer: (root, args, context) => addAnswser(args.adID, args.commentIndex, args.agent, args.content)
    }
};