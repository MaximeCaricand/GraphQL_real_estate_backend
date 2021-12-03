const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const sinonTest = require('sinon-test')(sinon);
const { Date } = require('../../graphQL/shared/index').root;

describe('Scalar', () => {
    describe('Date', () => {
        describe('serialize', () => {
            it('Should return value', sinonTest(async function () {
                expect(Date.serialize(0)).to.be.equal(0);
            }));
            it('Should not return value', sinonTest(async function () {
                expect(Date.serialize('test')).to.be.undefined;
                expect(Date.serialize(true)).to.be.undefined;
                expect(Date.serialize({})).to.be.undefined;
            }));
        });
        describe('parseValue', () => {
            it('Should return value', sinonTest(async function () {
                expect(Date.parseValue(0)).to.be.equal(0);
            }));
            it('Should not return value', sinonTest(async function () {
                expect(Date.parseValue('test')).to.be.undefined;
                expect(Date.parseValue(true)).to.be.undefined;
                expect(Date.parseValue({})).to.be.undefined;
            }));
        });
        describe('parseLiteral', () => {
            it('Should return value', sinonTest(async function () {
                expect(Date.parseLiteral({ kind: 'IntValue', value: 0 })).to.be.equal(0);
            }));
            it('Should not return value', sinonTest(async function () {
                expect(Date.parseLiteral({ kind: 'StringValue', value: 'value' })).to.be.undefined;
                expect(Date.parseLiteral({ kind: 'BooleanValue', value: true })).to.be.undefined;
                expect(Date.parseLiteral({ kind: 'JeSaisPasValue', value: {} })).to.be.undefined;
            }));
        });
    });
});
