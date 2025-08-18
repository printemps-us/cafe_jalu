export const HOME_QUERY = `
query StaticPageContent {
  metaobjects(type: "home_page", first: 10) {
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
      title_header: field(key: "title_header") {
        value
      }
      title_sub: field(key: "title_sub") {
        value
      }
      title_images: field(key: "title_images") {
        references(first: 4) {
          nodes {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
      find_us_title: field(key: "find_us_title") {
        value
      }
      find_us_sub: field(key: "find_us_sub") {
        value
      }
      find_us_image: field(key: "find_us_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      find_us_button: field(key: "find_us_button") {
        reference {
          ... on Metaobject {
            key: field(key: "key") {
              value
            }
            button_text: field(key: "button_text") {
              value
            }
            link: field(key: "link") {
              value
            }
            color: field(key: "color") {
              value
            }
            hover_color: field(key: "hover_color") {
              value
            }
          }
        }
      }
      icons: field(key: "icons") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              contact: field(key: "contact") {
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
      as_seen_header: field(key: "as_seen_header") {
        value
      }
      as_seen_images: field(key: "as_seen_images") {
        references(first: 4) {
          nodes {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
      filler_image: field(key: "filler_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      about_header: field(key: "about_header") {
        value
      }
      about_sub: field(key: "about_sub") {
        value
      }
      about_options: field(key: "about_options") {
        references(first: 4) {
          nodes {
            ... on Metaobject {
              sub: field(key: "sub") {
                value
              }
              header: field(key: "header") {
                value
              }
              button_text: field(key: "button_text") {
                value
              }
              link: field(key: "link") {
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
