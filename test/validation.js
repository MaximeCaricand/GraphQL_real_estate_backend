const { expect } = require('chai');
const { describe, it } = require('mocha');
const { parse, Source, validate } = require('graphql');
const { schema } = require('../graphQL/index')

/**
 * Helper function to test a query and the expected response.
 */
function validationErrors(query) {
    const source = new Source(query);
    const ast = parse(source);
    return validate(schema, ast);
}

describe('Ads Validation Tests', () => {
    describe('Basic Queries', () => {
        it.only('Validates a complex but valid query', () => {
            const query = `
                query NestedQueryWithFragment {
                hero {
                    ...NameAndAppearances
                    friends {
                    ...NameAndAppearances
                    friends {
                        ...NameAndAppearances
                    }
                    }
                }
                }
                fragment NameAndAppearances on Character {
                name
                appearsIn
                }
            `;
            return expect(validationErrors(query)).to.be.empty;
        });

        it('Notes that non-existent fields are invalid', () => {
            const query = `
        query HeroSpaceshipQuery {
          hero {
            favoriteSpaceship
          }
        }
      `;
            return expect(validationErrors(query)).to.not.be.empty;
        });

        it('Requires fields on objects', () => {
            const query = `
        query HeroNoFieldsQuery {
          hero
        }
      `;
            return expect(validationErrors(query)).to.not.be.empty;
        });

        it('Disallows fields on scalars', () => {
            const query = `
        query HeroFieldsOnScalarQuery {
          hero {
            name {
              firstCharacterOfName
            }
          }
        }
      `;
            return expect(validationErrors(query)).to.not.be.empty;
        });

        it('Disallows object fields on interfaces', () => {
            const query = `
        query DroidFieldOnCharacter {
          hero {
            name
            primaryFunction
          }
        }
      `;
            return expect(validationErrors(query)).to.not.be.empty;
        });

        it('Allows object fields in fragments', () => {
            const query = `
        query DroidFieldInFragment {
          hero {
            name
            ...DroidFields
          }
        }
        fragment DroidFields on Droid {
          primaryFunction
        }
      `;
            return expect(validationErrors(query)).to.be.empty;
        });

        it('Allows object fields in inline fragments', () => {
            const query = `
        query DroidFieldInFragment {
          hero {
            name
            ... on Droid {
              primaryFunction
            }
          }
        }
      `;
            return expect(validationErrors(query)).to.be.empty;
        });
    });
});