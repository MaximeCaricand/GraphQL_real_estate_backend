const enumNames = {
    PropertyType: 'PropertyType',
    PropertyStatus: 'PropertyStatus',
    PublicationStatus: 'PublicationStatus',
}
module.exports.enumNames = enumNames;

module.exports.enums = [
    `enum ${enumNames.PropertyType} {
        Sale
        Rent
    }`,
    `enum ${enumNames.PropertyStatus} {
        Available
        Rented
        Sold
    }`,
    `enum ${enumNames.PublicationStatus} {
        Published
        Hidden
    }`,
]