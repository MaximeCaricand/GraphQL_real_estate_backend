const { Ad } = require('../schemas/ad.schema');

module.exports.createAd = async (adData, files, user) => {
    const images = files.map((file, index) => {
        return {
            name: `image_${index + 1}`,
            content: `data:${file.mimetype};base64, ${file.data.toString('base64')}`,
            type: file.mimetype,
        }
    });
    const ad = new Ad({
        title: adData.title,
        price: adData.price,
        date: new Date(adData.date).getTime(),
        description: adData.description,
        propertyType: adData.propertyType,
        propertyStatus: adData.propertyStatus,
        publicationStatus: adData.publicationStatus,
        images: images,
        user: user.id
    });
    return ad.save().catch(err => { throw err });
}

module.exports.getPublishedAds = async (propertyType) => {
    const results = await Ad.find({ propertyType }).where('publicationStatus', 'Published');
    return results.map(res => new FormatedAd(res));
}

module.exports.getAdByID = async (id) => {
    const result = await Ad.findById(id);
    return new FormatedAd(result);
}

module.exports.getByName = async (name) => {
    const results = await Ad.find({ title: { $regex: "^" + name } });
    return results.map(res => new FormatedAd(res));
}

module.exports.getAdsByUserID = async (userID) => {
    return Ad.find({ user: userID });
}

module.exports.getAdByIDAndUserID = async (id, userID) => {
    return Ad.findOne({ _id: id, user: userID });
}

module.exports.deleteAdByID = async (id, userID) => {
    return Ad.deleteOne({ _id: id, user: userID });
}

module.exports.updateById = async (id, userID, content) => {
    await Ad.updateOne({ _id: id, user: userID }, {
        title: content.title,
        price: content.price,
        date: new Date(content.date).getTime(),
        description: content.description,
        propertyType: content.propertyType,
        propertyStatus: content.propertyStatus,
        publicationStatus: content.publicationStatus,
    });
}

module.exports.addAnswser = async (id, content, questionIndex, user) => {
    const ad = await this.getAdByID(id);
    const comments = ad.comments;
    comments[questionIndex].answers.push({
        content,
        agent: `${user.firstname} ${user.lastname}`
    });
    await Ad.updateOne({ _id: id, user: user.id }, { comments });
}

module.exports.addQuestion = async (id, content, user) => {
    const ad = await this.getAdByID(id);
    const comments = ad.comments;
    comments.push({
        question: content,
        user: `${user.firstname} ${user.lastname}`,
        answers: []
    });
    await Ad.updateOne({ _id: id }, { comments });
}

// Reformate Ad schema, only for display purpose 
class FormatedAd {
    constructor(object) {
        this.id = object.id;
        this.title = object.title;
        this.price = object.price;
        this.date = object.date;
        this.formatedDate = new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(object.date));
        this.description = object.description;
        this.propertyType = object.propertyType;
        this.propertyStatus = object.propertyStatus;
        this.publicationStatus = object.publicationStatus;
        this.images = object.images;
        this.comments = object.comments;
        this.user = object.user;
    }
}