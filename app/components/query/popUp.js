export const POPUP_QUERY = `
query StaticPageContent {
  metaobjects(type: "pop_up", first: 10) {
    nodes {
      show: field(key: "show") {
        value
      }
      title: field(key: "title") {
        value
      }
      content: field(key: "content") {
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


`;
