const mongoose = require('mongoose');
module.exports.adService = require('./services/ad.service');

module.exports.connect = async () => {
    try {
        await mongoose
            .connect("mongodb://localhost:27017/realEstateDB", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        return console.log('connection success');
    } catch (err) {
        return console.log("connection failure", err);
    }
}