export const PRESS_QUERY = `
query StaticPageContent {
  metaobjects(type: "press_page", first: 10) {
    nodes {
      handle
      press_header: field(key: "press_header") {
        value
      }
      press_logos: field(key: "press_logos") {
        references(first: 8) {
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
      rooms_header: field(key: "rooms_header") {
        value
      }
      
      rooms_button: field(key: "rooms_button") {
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
            venueId: field(key: "venue_id") {
              value
            }
            api_key: field(key: "api_key") {
              value
            }
          }
        }
      }
      quote_block_1: field(key: "quote_block_1") {
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
      guest_header: field(key: "guest_header") { value }
      guest_options: field(key: "guest_options") {
        references(first: 10) {
          nodes {
          ... on Metaobject {
            	content_header: field(key: "content_header") { value }
              header: field(key: "header") { value }
              sub: field(key: "sub") { value }
              content_sub: field(key: "content_sub") { value }
          }
        }
        }
      }
      quote_block_2: field(key: "quote_block_2") {
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
      rooms_list_1: field(key: "rooms_list_1") {
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
      rooms_list_2: field(key: "rooms_list_2") {
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
        rooms_list_3: field(key: "rooms_list_3") {
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
