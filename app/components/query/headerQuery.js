export const HEADER_DATA_QUERY = `
query StaticPageContent {
  metaobjects(type: "header", first: 10) {
    nodes {
      title: field(key: "title") {
        value
      }
      links: field(key: "links") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              text: field(key: "text") {
                value
              }
              url: field(key: "url") {
                value
              }
            }
          }
        }
      }
      image_links: field(key: "image_links") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              link: field(key: "link") {
                value
              }
              header: field(key: "header") {
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
      }
    }
  }
}

`;
