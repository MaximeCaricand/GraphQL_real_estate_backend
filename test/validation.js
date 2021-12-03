const { expect } = require('chai');
const { describe, it } = require('mocha');
const { parse, Source, validate } = require('graphql');
const { schema } = require('../graphQL/index')
const EasyGraphQLTester = require('easygraphql-tester')

/**
 * Helper function to test a query and the expected response.
 */
function validationErrors(query) {
    const source = new Source(query);
    const ast = parse(source);
    return validate(schema, ast);
}

describe('Ads Validation Tests', () => {
    before(() => {
        tester = new EasyGraphQLTester(schema)
    })

    describe('Queries', () => {
        describe('Access Query', () => {
          
          describe('Queries on getPublishedAds', () => {
            it('Query getAds with an existing param', () => {
              const query = `
              {
                getAds {
                  id
                }
              }
              `;
              tester.test(true, query);
            });
            it('Query getAds without existing param', () => {
              const query = `
              {
                getAds {
                  patatoes
                }
              }
              `;
              tester.test(false, query);
            });
          })
          
          describe('Queries on getAdByID', () => {
            it('Query with an id of type string', () => {
              const query = `
              {
                getAdByID (id:"0") {
                  title
                }
              }
              `;
              tester.test(true, query);
            });
            it('Query with an id of type not string', () => {
              const query = `
              {
                getAdByID (id:0) {
                  title
                }
              }
              `;
              tester.test(false, query);
            });
          })
          
          describe('Queries on getPublishedAds', () => {
            it('Query with propertyType:Sale', () => {
              const query = `
              {
                getPublishedAds(propertyType:Sale){
                  id
                }  
              }
              `;
              tester.test(true, query);
            });
            it('Query with propertyType:Patatoes', () => {
              const query = `
              {
                getPublishedAds(propertyType:Patatoes){
                  id
                }  
              }
              `;
              tester.test(false, query);
            });
          })

          describe('Queries on getPublishedAds', () => {
            it('Query with an name of type string', () => {
              const query = `
              {
                searchAdsByName(name:"Big House"){
                  id
                }  
              }
              `;
              tester.test(true, query);
            });
            it('Query with an name of type not string', () => {
              const query = `
              {
                searchAdsByName(name:Big){
                  id
                }  
              }
              `;
              tester.test(false, query);
            });
          })

          describe('Query on numberOfAds', () => {
            it('Query with propertyType:Sale', () => {
              const query = `
              {
                numberOfAds(propertyType:Sale)
              }
              `;
              tester.test(true, query);
            })
          })
        })
    });

    describe('Mutations', () => {
      describe('Mutations CRUD (whitout R)', () => {
        describe('Mutations on createAd', () => {
          const mutation = `
          mutation createAd($content: AdCreateContent!, $images: [String!]) {
            createAd(content: $content, images: $images) {
              id
            }
          }
          `;

          it('With all the correct parameters and expects an id in return', () => {
            tester.test(true, mutation, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With all the correct parameters and expects an potatoe in return', () => {
            const mutationError = `
            mutation createAd($content: AdCreateContent!, $images: [String!]) {
              createAd(content: $content, images: $images) {
                potatoe
              }
            }
            `;
            tester.test(false, mutationError, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With one missing parameter and expects an id in return', () => {
            tester.test(false, mutation, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With one error parameter and expects an id in return', () => {
            tester.test(false, mutation, {
              content: {
                title: 7844,
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With only content and no images', () => {
            tester.test(true, mutation, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              }
            })
          });
          it('With content and images but images is not a [String]', () => {
            tester.test(false, mutation, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: 0
            })
          });
        });
        describe('Mutations on updateAd', () => {
          const mutation = `
          mutation updateAd($id: ID!, $content: AdUpdateContent, $images: [String!]) {
            updateAd(id:$id, content: $content, images: $images) {
              id
            }
          }
          `;

          it('With all the correct parameters and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0,
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With all the correct parameters and expects an potatoe in return', () => {
            const mutationError = `
            mutation updateAd($id: ID!, $content: AdUpdateContent, $images: [String!]) {
              updateAd(id:$id, content: $content, images: $images) {
                potatoe
              }
            }
            `;
            tester.test(false, mutationError, {
              id: 0,
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With one missing parameter less and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0,
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With two missing parameter less and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0
            })
          });
          it('With one require parameters less and expects an id in return', () => {
            tester.test(false, mutation, {
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With one error on content parameter and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              content: {
                title: 1,
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [
                "base64",
                "base64",
                "base64"
              ]
            })
          });
          it('With one error on images parameter and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [0]
            })
          });
          it('With one error on images parameter and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              content: {
                title: "title",
                price: 121451,
                date: 20211210,
                description: "description",
                propertyType: "Sale",
                propertyStatus: "Available",
                publicationStatus: "Published"
              },
              images: [0]
            })
          });
        });
        describe('Mutations on deleteAd', () => {
          const mutation = `
          mutation deleteAd($id: ID!) {
            deleteAd(id:$id) {
              id
            }
          }
          `;

          it('With correct parameter and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0
            })
          });
          it('With correct parameter and expects an potatoe in return', () => {
            const mutationError = `
            mutation deleteAd($id: ID!) {
              deleteAd(id:$id) {
                potatoe
              }
            }
            `;
            tester.test(false, mutationError, {
              id: 0
            })
          });
          it('Without id parameter and expects an id in return', () => {
            tester.test(false, mutation, {})
          });
        });
      });

      describe('Mutations \'Comment & Answer\'', () => {
        describe('Mutations on postComment', () => {
          const mutation = `
          mutation postComment($id: ID!, $user: String!, $content: String!) {
            postComment(adID:$id, user:$user, content:$content) {
              id
            }
          }
          `;

          it('With correct parameter and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0,
              user: "Florian",
              content: "Will this test be seen by the teacher?"
            })
          });
          it('With correct parameter and expects an potatoe in return', () => {
            const mutationError = `
            mutation postComment($id: ID!, $user: String!, $content: String!) {
              postComment(adID:$id, user:$user, content:$content) {
                potatoe
              }
            }
            `;
            tester.test(false, mutationError, {
              id: 0,
              user: "Florian",
              content: "Will this test be seen by the teacher?"
            })
          });
          it('With an error on parameter user and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              user: 666,
              content: "Will this test be seen by the teacher?"
            })
          });
          it('With one require parameter less and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              content: "Will this test be seen by the teacher?"
            })
          });
        });
        describe('Mutations on postAnswer', () => {
          const mutation = `
          mutation postAnswer($id: ID!, $commentIndex: Int!, $agent: String!, $content: String!) {
            postAnswer(adID:$id, commentIndex:$commentIndex, agent:$agent, content:$content) {
              id
            }
          }
          `;

          it('With correct parameter and expects an id in return', () => {
            tester.test(true, mutation, {
              id: 0,
              commentIndex: 12,
              agent: "Florian",
              content: "Yes yes, he will see it!"
            })
          });
          it('With correct parameter and expects an potatoe in return', () => {
            const mutationError = `
            mutation postAnswer($id: ID!, $commentIndex: Int!, $agent: String!, $content: String!) {
              postAnswer(adID:$id, commentIndex:$commentIndex, agent:$agent, content:$content) {
                potatoe
              }
            }
            `;
            tester.test(false, mutationError, {
              id: 0,
              commentIndex: 12,
              agent: "Florian",
              content: "Yes yes, he will see it!"
            })
          });
          it('With an error on parameter commentIndex and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              commentIndex: "je suis l'index",
              agent: "Florian",
              content: "Yes yes, he will see it!"
            })
          });
          it('With one require parameter less and expects an id in return', () => {
            tester.test(false, mutation, {
              id: 0,
              agent: "Florian",
              content: "Yes yes, he will see it!"
            })
          });
        });
      });
    });
});