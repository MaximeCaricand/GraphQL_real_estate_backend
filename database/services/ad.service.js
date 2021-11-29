const { Ad } = require('../schemas/ad.schema');

module.exports.createAd = async (adData, files) => {
    console.log(adData);
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
    return ad.save().catch(err => { throw err });
}

module.exports.getAds = () => {
    return Ad.find({});
}

module.exports.getPublishedAds = (propertyType) => {
    return Ad.find({ propertyType }).where('publicationStatus', 'Published');
}

module.exports.getAdByID = (id) => {
    return Ad.findById(id);
}

module.exports.getAdsByName = (name) => {
    return Ad.find({ title: { $regex: "^" + name } });
}

module.exports.deleteAd = (id) => {
    return Ad.findOneAndDelete({ _id: id }, { returnDocument: true });
}

module.exports.updateAd = async (id, content, files) => {
    const images = getImages(files);
    return Ad.findOneAndUpdate({ _id: id }, {
        title: content.title,
        price: content.price,
        date: new Date(content.date).getTime(),
        description: content.description,
        propertyType: content.propertyType,
        propertyStatus: content.propertyStatus,
        publicationStatus: content.publicationStatus,
        images: images
    }, { new: true });
}

module.exports.addAnswser = async (id, questionIndex, agent, content) => {
    const ad = await this.getAdByID(id);
    const comments = ad.comments;
    comments[questionIndex]?.answers.push({
        content,
        agent
    });
    return Ad.findOneAndUpdate({ _id: id }, { comments }, { new: true });
}

module.exports.addQuestion = async (id, user, content) => {
    const ad = await this.getAdByID(id);
    const comments = ad.comments;
    comments.push({
        question: content,
        user,
        answers: []
    });
    return Ad.findOneAndUpdate({ _id: id }, { comments }, { new: true });
}

function getImages(files) {
    return files?.map((file, index) => {
        return {
            name: `image_${index + 1}`,
            content: file, // image's base64
        }
    });
}