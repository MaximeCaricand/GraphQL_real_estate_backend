const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const { resolvers } = require('../../graphQL/index');
const mongoose = require('mongoose');
const { Ad } = require('../../database/models/ads');

const fakeAnswer = () => {
    return {
        content: "content",
        agent: "agent"
    }
}

const fakeComment = (answers) => {
    return {
        question: "question",
        user: "user",
        answers: answers ?? []
    }
}

const fakeAd = (comment, images) => {
    return {
        id: "id",
        title: "title",
        price: 0,
        date: 0,
        description: "description",
        propertyType: "Sale",
        propertyStatus: "Sold",
        publicationStatus: "Available",
        images: images ?? [],
        comments: comment ?? []
    }
}

const fakeCreateInput = () => {
    return {
        title: "new title",
        price: 100,
        date: 10,
        description: "new description",
        propertyType: "Sale",
        propertyStatus: "Sold",
        publicationStatus: "Available"
    }
}

const fakeUpdateInput = () => {
    return {
        title: "new title",
        price: 100,
        date: 10,
        description: "new description",
        propertyType: "Sale",
        propertyStatus: "Sold",
        publicationStatus: "Available"
    }
}

describe('Resolvers', () => {
    describe('Queries', () => {
        describe('getAds', () => {
            it('Should return empty array if no ads found', sinonTest(async function () {
                const findStub = this.stub(mongoose.Model, 'find').resolves([]);
                const result = await resolvers.Query.getAds();
                expect(result).to.be.deep.equal([]);
                expect(findStub.calledOnce).to.be.true;
            }));
            it('Should return an Ad', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').resolves([ad]);
                const result = await resolvers.Query.getAds();
                expect(result).to.be.deep.equal([new Ad(ad)]);
                expect(findStub.calledOnce).to.be.true;
            }));
        });
        describe('getAdByID', () => {
            it('Should return null if no ad found', sinonTest(async function () {
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(null);
                const result = await resolvers.Query.getAdByID({}, { id: "id" });
                expect(result).to.be.deep.equal(null);
                expect(findByIdStub.calledOnce).to.be.true;
            }));
            it('Should return an Ad', sinonTest(async function () {
                const ad = fakeAd();
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(ad);
                const result = await resolvers.Query.getAdByID({}, { id: "id" });
                expect(result).to.be.deep.equal(new Ad(ad));
                expect(findByIdStub.calledOnce).to.be.true;
            }));
        });
        describe('getAdsByName', () => {
            it('Should return empty array if no ads found', sinonTest(async function () {
                const findStub = this.stub(mongoose.Model, 'find').resolves([]);
                const result = await resolvers.Query.searchAdsByName({}, { name: "name" });
                expect(result).to.be.deep.equal([]);
                expect(findStub.calledOnce).to.be.true;
            }));
            it('Should return an Ad', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').resolves([ad]);
                const result = await resolvers.Query.searchAdsByName({}, { name: "name" });
                expect(result).to.be.deep.equal([new Ad(ad)]);
                expect(findStub.calledOnce).to.be.true;
            }));
        });
        describe('getPublishedAds', () => {
            it('Should return null if no ad found', sinonTest(async function () {
                const findStub = this.stub(mongoose.Model, 'find').returns({ where: (param1, param2) => [] });
                const result = await resolvers.Query.getPublishedAds({}, { propertyType: "Sale" });
                expect(result).to.be.deep.equal([]);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({ propertyType: 'Sale' });
            }));
            it('Should return an Ad with propertyType', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').returns({ where: (param1, param2) => [ad] });
                const result = await resolvers.Query.getPublishedAds({}, { propertyType: "Sale" });
                expect(result).to.be.deep.equal([new Ad(ad)]);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({ propertyType: 'Sale' });
            }));
            it('Should return an Ad without propertyType', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').returns({ where: (param1, param2) => [ad] });
                const result = await resolvers.Query.getPublishedAds({}, {});
                expect(result).to.be.deep.equal([new Ad(ad)]);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({});
            }));
        });
        describe('numberOfAds', () => {
            it('Should return 0 if no ad found', sinonTest(async function () {
                const findStub = this.stub(mongoose.Model, 'find').returns([]);
                const result = await resolvers.Query.numberOfAds({}, { propertyType: "Sale" });
                expect(result).to.be.deep.equal(0);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({ propertyType: 'Sale' });
            }));
            it('Should return 1 with propertyType', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').returns([ad]);
                const result = await resolvers.Query.numberOfAds({}, { propertyType: "Sale" });
                expect(result).to.be.deep.equal(1);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({ propertyType: 'Sale' });
            }));
            it('Should return 1 without propertyType', sinonTest(async function () {
                const ad = fakeAd();
                const findStub = this.stub(mongoose.Model, 'find').returns([ad]);
                const result = await resolvers.Query.numberOfAds({}, {});
                expect(result).to.be.deep.equal(1);
                expect(findStub.calledOnce).to.be.true;
                expect(findStub.args[0][0]).to.be.deep.equal({});
            }));
        });
    });
    describe('Mutations', () => {
        describe.only('updateAd', () => {
            it.only('Should save without images', sinonTest(async function () {
                const input = fakeC
                const expected = new Ad(fakeAd());
                // const updateInput = fakeUpdateInput();
                const findOneAndUpdateStub = sinon.stub(mongoose.Model.prototype, 'save').resolves(null);
                // const result = await resolvers.Mutation.updateAd({}, { id: "id", content: updateInput, images: [] });
                // expect(result).to.be.deep.equal(null);
                // expect(findOneAndUpdateStub.calledOnce).to.be.true;
                // expect(findOneAndUpdateStub.args[0][0]).to.be.deep.equal({ _id: "id" });
                // expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal(updateInput);
            }));
            it('Should find one and return the updated Ad without images', sinonTest(async function () {
                const updateInput = fakeUpdateInput();
                const ad = { ...fakeAd(), ...updateInput };
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(ad);
                const result = await resolvers.Mutation.updateAd({}, { id: "id", content: updateInput });
                expect(result).to.be.deep.equal(ad);
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][0]).to.be.deep.equal({ _id: "id" });
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal(updateInput);
            }));
        });
        describe('updateAd', () => {
            it('Should not find one and return null', sinonTest(async function () {
                const updateInput = fakeUpdateInput();
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(null);
                const result = await resolvers.Mutation.updateAd({}, { id: "id", content: updateInput, images: [] });
                expect(result).to.be.deep.equal(null);
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][0]).to.be.deep.equal({ _id: "id" });
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal(updateInput);
            }));
            it('Should find one and return the updated Ad without images', sinonTest(async function () {
                const updateInput = fakeUpdateInput();
                const ad = { ...fakeAd(), ...updateInput };
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(ad);
                const result = await resolvers.Mutation.updateAd({}, { id: "id", content: updateInput });
                expect(result).to.be.deep.equal(ad);
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][0]).to.be.deep.equal({ _id: "id" });
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal(updateInput);
            }));
            it('Should find one and return the updated Ad with images', sinonTest(async function () {
                const images = { images: [{ name: "image_1", content: "base64:A" }, { name: "image_2", content: "base64:B" }] };
                const updateInput = fakeUpdateInput();
                const ad = { ...fakeAd(), ...updateInput, ...images };
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(ad);
                const result = await resolvers.Mutation.updateAd({}, { id: "id", content: updateInput, images: ['base64:A', 'base64:B'] });
                expect(result).to.be.deep.equal(ad);
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][0]).to.be.deep.equal({ _id: "id" });
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal({ ...updateInput, ...images });
            }));
        });
        describe('deleteAd', () => {
            it('Should not find one and return null', sinonTest(async function () {
                const findOneAndDeleteStub = this.stub(mongoose.Model, 'findOneAndDelete').resolves(null);
                const result = await resolvers.Mutation.deleteAd({}, { id: "id" });
                expect(result).to.be.deep.equal(null);
                expect(findOneAndDeleteStub.calledOnce).to.be.true;
                expect(findOneAndDeleteStub.args[0][0]).to.be.deep.equal({ _id: "id" });
            }));
            it('Should find one and return the deleted Ad', sinonTest(async function () {
                const ad = fakeAd();
                const findOneAndDeleteeStub = this.stub(mongoose.Model, 'findOneAndDelete').resolves(ad);
                const result = await resolvers.Mutation.deleteAd({}, { id: "id" });
                expect(result).to.be.deep.equal(new Ad(ad));
                expect(findOneAndDeleteeStub.calledOnce).to.be.true;
                expect(findOneAndDeleteeStub.args[0][0]).to.be.deep.equal({ _id: "id" });
            }));
        });
        describe('postComment', () => {
            it('Should not find one and return null', sinonTest(async function () {
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(null);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate');
                const result = await resolvers.Mutation.postComment({}, { adID: "id", user: 'user', content: 'content' });
                expect(result).to.be.deep.equal(null);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.notCalled).to.be.true;
            }));
            it('Should do nothing and return null if no comments', sinonTest(async function () {
                const ad = fakeAd();
                delete ad.comments;
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(ad);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate');
                const result = await resolvers.Mutation.postComment({}, { adID: "id", user: 'user', content: 'content' });
                expect(result).to.be.deep.equal(null);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.notCalled).to.be.true;
            }));
            it('Should find one and add the comment', sinonTest(async function () {
                const ad = fakeAd();
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(ad);
                const updatedAd = {
                    ...fakeAd(), comments: [{ question: 'content', user: 'user', answers: [] }]
                }
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(updatedAd);
                const result = await resolvers.Mutation.postComment({}, { adID: "id", user: 'user', content: 'content' });
                expect(result).to.be.deep.equal(updatedAd);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal({ comments: updatedAd.comments });
            }));
        });
        describe('postAnswer', () => {
            it('Should not find one and return null', sinonTest(async function () {
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(null);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate');
                const result = await resolvers.Mutation.postAnswer({}, { adID: "id", commentIndex: 0, agent: 'agent', content: 'content' });
                expect(result).to.be.deep.equal(null);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.notCalled).to.be.true;
            }));
            it('Should do nothing and return null if no comments', sinonTest(async function () {
                const ad = fakeAd();
                delete ad.comments;
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(ad);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate');
                const result = await resolvers.Mutation.postAnswer({}, { adID: "id", commentIndex: 0, agent: 'agent', content: 'content' });
                expect(result).to.be.deep.equal(null);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.notCalled).to.be.true;
            }));
            it('Should do nothing if the comment does not exists', sinonTest(async function () {
                const adWithComments = {
                    ...fakeAd(), comments: []
                }
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(adWithComments);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(adWithComments);
                const result = await resolvers.Mutation.postAnswer({}, { adID: "id", commentIndex: 0, agent: 'agent', content: 'content' });
                expect(result).to.be.deep.equal(adWithComments);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal({ comments: adWithComments.comments });
            }));
            it('Should do nothing if the comment does not exists', sinonTest(async function () {
                const adWithComments = {
                    ...fakeAd(), comments: [{ question: 'content', user: 'user', answers: [] }]
                }
                const expected = {
                    ...fakeAd(), comments: [
                        { question: 'content', user: 'user', answers: [{ agent: 'agent', content: 'content' }] }
                    ]
                }
                const findByIdStub = this.stub(mongoose.Model, 'findById').resolves(adWithComments);
                const findOneAndUpdateStub = this.stub(mongoose.Model, 'findOneAndUpdate').resolves(expected);
                const result = await resolvers.Mutation.postAnswer({}, { adID: "id", commentIndex: 0, agent: 'agent', content: 'content' });
                expect(result).to.be.deep.equal(expected);
                expect(findByIdStub.calledOnce).to.be.true;
                expect(findByIdStub.args[0][0]).to.be.deep.equal("id");
                expect(findOneAndUpdateStub.calledOnce).to.be.true;
                expect(findOneAndUpdateStub.args[0][1]).to.be.deep.equal({ comments: expected.comments });
            }));
        });
    });
});