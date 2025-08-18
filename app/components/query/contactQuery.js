export const CONTACT_QUERY = `query StaticPageContent {
  metaobjects(type: "contact", first: 10) {
    nodes{
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
      header: field(key: "header") { value }
      privacy: field(key: "privacy") { value }
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
      sub: field(key: "sub") { value }
      content1: field(key: "content_1") { value }
      content2: field(key: "content_2") { value }
      contact_options: field(key: "contact_options") {
        references(first: 10) {
          nodes {
          ... on Metaobject {
            contact: field(key: "contact") { value }
              header: field(key: "header") { value }
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
      }
}}}`;
