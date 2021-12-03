const { enumNames } = require('./enums');

const inputNames = {
    AdCreateContent: 'AdCreateContent',
    AdUpdateContent: 'AdUpdateContent',
    ImageContent: 'ImageContent'
};
module.exports.inputNames = inputNames;

module.exports.inputs = [
    `input ${inputNames.AdCreateContent} {
        title: String!
        price: Int!
        date: Date!
        description: String!
        propertyType: ${enumNames.PropertyType}!
        propertyStatus: ${enumNames.PropertyStatus}!
        publicationStatus: ${enumNames.PublicationStatus}!
    }`,
    `input ${inputNames.AdUpdateContent} {
        title: String!
        price: Int!
        date: Date!
        description: String!
        propertyType: ${enumNames.PropertyType}!
        propertyStatus: ${enumNames.PropertyStatus}!
        publicationStatus: ${enumNames.PublicationStatus}!
    }`
];