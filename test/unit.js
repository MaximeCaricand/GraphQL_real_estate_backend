const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const { resolvers } = require('../graphQL/index');
const mongoose = require('mongoose');

describe('Ads Unit Tests', () => {
    describe('Resolvers', () => {
        describe('getAds', () => {
            it.only('Should return empty array if no ads found', sinonTest(async function () {
                const findStub = this.stub(mongoose.Model, 'find').resolves([]);
                const result = await resolvers.Query.getAds();
                expect(result).to.be.deep.equal([]);
                expect(findStub.calledOnce).to.be.true;
            }));
            it('Should return empty s', sinonTest(async function () {
                const result = await resolvers.Query.getAds();
                expect(result).to.be.deep.equal([]);
            }));
        });
    });
});