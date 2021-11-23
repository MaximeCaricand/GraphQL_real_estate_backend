const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Number, required: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true },
    propertyStatus: { type: String, required: true },
    publicationStatus: { type: String, required: true },
    images: [{
        name: { type: String },
        content: { type: String },
        type: { type: String }
    }],
    comments: [{
        question: { type: String },
        user: { type: String },
        answers: [{ content: String, agent: String }]
    }],
    user: { type: String }
});
module.exports.Ad = mongoose.model('Ad', adSchema);