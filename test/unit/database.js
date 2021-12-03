const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const { connect } = require('../../database/index')
const mongoose = require('mongoose');
const { Ad, Comment, Answer } = require('../../database/models/ads');

const fakeAd = () => {
    return {
        id: "id",
        title: "title",
        price: 0,
        date: 0,
        description: "description",
        propertyType: "Sale",
        propertyStatus: "Sold",
        publicationStatus: "Available",
        images: [
            {
                name: "nameA",
                content: "contentA"
            },
            {
                name: "nameB",
                content: "contentB"
            }
        ],
        comments: [
            {
                question: 'question',
                user: 'user',
                answers: [
                    {
                        content: 'content',
                        agent: 'agent'
                    }
                ]
            }
        ]
    }
}

describe('Database', () => {
    describe('Database connection', () => {
        it('Should connect', sinonTest(async function () {
            const connectStub = this.stub(mongoose, 'connect');
            expect(await connect()).to.be.equal('connection success');
            expect(connectStub.calledOnce).to.be.true;
        }));
        it('Should not connect', sinonTest(async function () {
            const connectStub = this.stub(mongoose, 'connect').throws(new Error('error'));
            expect(await connect()).to.be.equal('connection failure');
            expect(connectStub.calledOnce).to.be.true;
        }));
    });
    describe('Models', () => {
        describe('Ad', () => {
            it('Should have attributes', sinonTest(async function () {
                const ad = new Ad(fakeAd());
                const attributes = ['id', 'title', 'price', 'date', 'description', 'propertyType', 'propertyStatus', 'publicationStatus', 'images', 'comments'];
                attributes.forEach(attribute => {
                    expect(attribute in ad).to.be.true;
                });
            }));
            it('commentsLength should work', sinonTest(async function () {
                const ad = new Ad(fakeAd());
                expect(ad.commentsLength()).to.be.equal(1);
            }));
            it('formatedDate should work', sinonTest(async function () {
                const ad = new Ad(fakeAd());
                expect(ad.formatedDate({ offset: 0 })).to.be.equal('1970-01-01');
            }));
        });
        describe('Comment', () => {
            it('Should have attributes', sinonTest(async function () {
                const comment = new Comment(fakeAd().comments[0]);
                const attributes = ['question', 'user', 'answers'];
                attributes.forEach(attribute => {
                    expect(attribute in comment).to.be.true;
                });
            }));
            it('commentsLength should work', sinonTest(async function () {
                const comment = new Comment(fakeAd().comments[0]);
                expect(comment.answersLength()).to.be.equal(1);
            }));
        });
        describe('Answer', () => {
            it('Should have attributes', sinonTest(async function () {
                const answer = new Answer(fakeAd().comments[0].answers[0]);
                const attributes = ['content', 'agent'];
                attributes.forEach(attribute => {
                    expect(attribute in answer).to.be.true;
                });
            }));
        });
    });
});
