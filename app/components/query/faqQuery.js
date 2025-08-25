export const FAQ_QUERY = `query StaticPageContent {
  metaobjects(type: "faqs", first: 10) {
    nodes {
      handle
      seo: field(key: "seo") {
        reference {
          ... on Metaobject {
            title: field(key: "title") {
              value
            }
            description: field(key: "description") {
              value
            }
            image: field(key: "image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      header: field(key: "header") {
        value
      }
      section: field(key: "section") {
        value
      }
      quote: field(key: "quote") {
        reference {
          ... on Metaobject {
            author: field(key: "author") {
              value
            }
            quote: field(key: "quote") {
              value
            }
          }
        }
      }
      seo: field(key: "seo") {
        reference {
          ... on Metaobject {
            title: field(key: "title") {
              value
            }
            description: field(key: "description") {
              value
            }
            image: field(key: "image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      images: field(key:"images") {
        references(first: 4) {
          nodes {
          ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
          }}}
      faqs: field(key: "faqs") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              section_id: field(key: "section_id") {
                value
              }
              header: field(key: "header") {
                value
              }
              options: field(key: "options") {
                references(first: 20) {
                  nodes {
                    ... on Metaobject {
                      faq_id: field(key: "faq_id") {
                        value
                      }
                      header: field(key: "header") {
                        value
                      }
                      content: field(key: "content") {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
