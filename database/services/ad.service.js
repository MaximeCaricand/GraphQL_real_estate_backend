const { Ad } = require('../schemas/ad.schema');
const AdModel = require('../models/ads').Ad;

module.exports.createAd = async (adData, files) => {
    const images = getImages(files);
    const ad = new Ad({
        title: adData.title,
        price: adData.price,
        date: new Date(adData.date).getTime(),
        description: adData.description,
        propertyType: adData.propertyType,
        propertyStatus: adData.propertyStatus,
        publicationStatus: adData.publicationStatus,
        images: images
    });
    const result = await ad.save();
    return new AdModel(result);
}

module.exports.getAds = async () => {
    const results = await Ad.find({});
    return results.map(result => new AdModel(result));
}

module.exports.getPublishedAds = async (propertyType) => {
    const params = propertyType ? { propertyType } : {};
    const results = await Ad.find(params).where('publicationStatus', 'Published');
    return results.map(result => new AdModel(result));
}

module.exports.getAdByID = async (id) => {
    const result = await Ad.findById(id);
    return result ? new AdModel(result) : null;
}

module.exports.getAdsByName = async (name) => {
    const results = await Ad.find({ title: { $regex: "^" + name } });
    return results.map(result => new AdModel(result));
}

module.exports.numberOfAds = async (propertyType) => {
    const params = propertyType ? { propertyType } : {};
    const results = await Ad.find(params);
    return results.length;
}

module.exports.deleteAd = async (id) => {
    const result = await Ad.findOneAndDelete({ _id: id }, { returnDocument: true });
    return result ? new AdModel(result) : null;
}

module.exports.updateAd = async (id, content, files) => {
    const updateData = {
        title: content.title,
        price: content.price,
        date: new Date(content.date).getTime(),
        description: content.description,
        propertyType: content.propertyType,
        propertyStatus: content.propertyStatus,
        publicationStatus: content.publicationStatus,
    }
    const images = getImages(files);
    if (images.length) {
        updateData.images = images;
    }
    const result = await Ad.findOneAndUpdate({ _id: id }, updateData, { new: true });
    return result ? new AdModel(result) : null;
}

module.exports.addAnswser = async (id, questionIndex, agent, content) => {
    const ad = await this.getAdByID(id);
    const comments = ad?.comments;
    if (comments) {
        comments[questionIndex]?.answers.push({
            content,
            agent
        });
        const result = await Ad.findOneAndUpdate({ _id: id }, { comments }, { new: true });
        return new AdModel(result);
    }
    return null;
}

module.exports.addQuestion = async (id, user, content) => {
    const ad = await this.getAdByID(id);
    const comments = ad?.comments;
    if (comments) {
        comments.push({
            question: content,
            user,
            answers: []
        });
        const result = await Ad.findOneAndUpdate({ _id: id }, { comments }, { new: true });
        return new AdModel(result);
    }
    return null;
}

function getImages(files) {
    return files?.map((file, index) => {
        return {
            name: `image_${index + 1}`,
            content: file, // image's base64
        }
    }) ?? [];
}