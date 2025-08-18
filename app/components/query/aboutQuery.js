export const ABOUT_QUERY = `
query StaticPageContent {
  metaobjects(type: "about_page", first: 10) {
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
      tradition_header: field(key: "tradition_header") {
        value
      }
      tradition_content: field(key: "tradition_content") {
        value
      }
      hero_image: field(key: "hero_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
        content_block_2_header: field(key: "content_block_2_header") {
        value
      }
      content_block_2_content: field(key: "content_block_2_content") {
        value
      }
      content_block_2_image: field(key: "content_block_2_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      tradition_image: field(key: "tradition_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      chef_quote: field(key: "chef_quote") {
        reference {
          ... on Metaobject {
            author: field(key: "author") {
              value
            }
            quote: field(key: "quote") {
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
      architect_quote: field(key: "architect_quote") {
        reference {
          ... on Metaobject {
            author: field(key: "author") {
              value
            }
            quote: field(key: "quote") {
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
      chef_section: field(key: "chef_section") {
        reference {
          ... on Metaobject {
            header: field(key: "header") {
              value
            }
            section: field(key: "section") {
              value
            }
            main_image: field(key: "main_image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            filler_image_2: field(key: "filler_image_2") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            filler_image_1: field(key: "filler_image_1") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            executive_content_options: field(key: "executive_content_options") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
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
      architect_section: field(key: "architect_section") {
        reference {
          ... on Metaobject {
            header: field(key: "header") {
              value
            }
            section: field(key: "section") {
              value
            }
            main_image: field(key: "main_image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            filler_image_1: field(key: "filler_image_1") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            filler_image_2: field(key: "filler_image_2") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            executive_content_options: field(key: "executive_content_options") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
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




`;
