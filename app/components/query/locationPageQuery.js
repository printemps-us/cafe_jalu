export const LOCATION_PAGE_QUERY = `
query StaticPageContent {
  metaobjects(type: "location_page", first: 10) {
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
      logo: field(key: "logo") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      location_info_hours: field(key: "location_info_hours") {
        value
      }
      location_info_header: field(key: "location_info_header") {
        value
      }
      location_info_button_text: field(key: "location_info_button_text") {
        value
      }
      location_info_text: field(key: "location_info_text") {
        value
      }
      location_info_image: field(key: "location_info_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      inside_sections: field(key: "inside_sections") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              section: field(key: "section") {
                value
              }
              header: field(key: "header") {
                value
              }
              sub_header_1: field(key: "sub_header_1") {
                value
              }
              sub_header_2: field(key: "sub_header_2") {
                value
              }
              sub_content_1: field(key: "sub_content_1") {
                value
              }
              sub_content_2: field(key: "sub_content_2") {
                value
              }
              button: field(key: "button") {
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
              secondary_button: field(key: "secondary_button") {
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
              images: field(key: "images") {
                references(first: 10) {
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
            }
          }
        }
      }
      hero_background: field(key: "hero_background") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      resy_button: field(key: "resy_button") {
        reference {
          ... on Metaobject {
            key: field(key: "key") {
              value
            }
            button_text: field(key: "button_text") {
              value
            }
            venueId: field(key: "venue_id") {
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
            api_key: field(key: "api_key") {
              value
            }
          }
        }
      }
      menu_button: field(key: "menu_button") {
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
      lunch_button: field(key: "lunch_button") {
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
      dinner_button: field(key: "dinner_button") {
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
      hero_content: field(key: "hero_content") {
        value
      }
      description_header: field(key: "description_header") {
        value
      }
      description_content: field(key: "description_content") {
        value
      }
      description_images: field(key: "description_images") {
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
      quote_text: field(key: "quote_text") {
        value
      }
      quote_author: field(key: "quote_author") {
        value
      }
      hours_sub: field(key: "hours_sub") {
        value
      }
      page_header: field(key: "page_header") {
        value
      }
      page_header_sub: field(key: "page_header_sub") {
        value
      }
      hours_header: field(key: "hours_header") {
        value
      }
      quote_background_color: field(key: "quote_background_color") {
        value
      }
      publication_header: field(key: "publication_header") {
        value
      }
      publication_content: field(key: "publication_content") {
        value
      }
      other_dining_header: field(key: "other_dining_header") {
        value
      }
      publication_sources: field(key: "publication_sources") {
        references(first: 5) {
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
      transition_image: field(key: "transition_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      other_dining: field(key: "other_dining") {
              references(first: 3) {
                nodes {
                  ... on Metaobject {
                    button: field(key: "button") {
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
                    header: field(key: "header") {
                      value
                    }
                    content: field(key: "content") {
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
      all_header: field(key: "all_header") {
        value
      }
      location_image: field(key: "location_image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      location_header: field(key: "location_header") {
        value
      }
      location_sub: field(key: "location_sub") {
        value
      }
      theme_color: field(key: "theme_color") {
        value
      }
      location_button: field(key: "location_button") {
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
      contact_options: field(key: "contact_options") {
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
      faqs: field(key: "faq") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              section_id: field(key: "section_id") {
                value
              }
              header: field(key: "header") {
                value
              }
              options: field(key: "options") {
                references(first: 10) {
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
      contact_content: field(key: "contact") {
        reference {
          ... on Metaobject {
            header: field(key: "header") {
              value
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
            sub: field(key: "sub") {
              value
            }
            content1: field(key: "content_1") {
              value
            }
            content2: field(key: "content_2") {
              value
            }
            contact_options: field(key: "contact_options") {
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
          }
        }
      }
      other_dining_options: field(key: "other_dining_options") {
        references(first: 3) {
          nodes {
            ... on Metaobject {
              button: field(key: "button") {
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
              header: field(key: "header") {
                value
              }
              content: field(key: "content") {
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
