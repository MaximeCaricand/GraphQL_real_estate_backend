const { enumNames } = require('./enums');

const objectNames = {
    Ad: 'Ad',
    AdImage: 'AdImage',
    AdComments: 'AdComments',
    AdAnswers: 'AdAnswers',
};
module.exports.objectNames = objectNames;

module.exports.objects = [
    `type ${objectNames.AdImage} {
        name: String!
        content: String!
        type: String!
    }`,
    `type ${objectNames.AdAnswers} {
        content: String!
        agent: String!
    }`,
    `type ${objectNames.AdComments} {
        question: String!
        user: String!
        answers: [${objectNames.AdAnswers}!]!
    }`,
    `type ${objectNames.Ad} {
        id: ID!
        title: String!
        price: Int!
        date: Date!
        description: String!
        propertyType: ${enumNames.PropertyType}!
        propertyStatus: ${enumNames.PropertyStatus}!
        publicationStatus: ${enumNames.PublicationStatus}!
        images: [${objectNames.AdImage}!]!
        comments: [${objectNames.AdComments}!]!
    }`
];