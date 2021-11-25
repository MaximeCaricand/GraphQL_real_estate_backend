const { Ad } = require('../schemas/ad.schema');

module.exports.createAd = async (adData, files) => {
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

module.exports.delete = (id) => {
    return Ad.deleteOne({ _id: id });
}

module.exports.update = async (id, content) => {
    await Ad.updateOne({ _id: id }, {
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