import React, {useRef, useState, useEffect} from 'react';
import Logo from '~/components/Logo';
import {data, useLoaderData, defer} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import {Link, useLocation} from '@remix-run/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SmoothScroll from '~/components/SmoothScroll';
import bg from '~/assets/cafejalubackground.png';
export async function loader(args) {
  const staticData = await loadStaticData(args);

  return defer({...staticData});
}
export const meta = ({data}) => {
  // pass your SEO object to getSeoMeta()
  return getSeoMeta({
    title: 'Cafe Jalu - Printemps New York - Menu',
    description:
      'Explore the menu at Cafe Jalu by Chef Gregory Gourdet, featuring fresh juices, viennoiserie, and gluten- & dairy-free pastries.',
    // image: data.staticData.seo?.reference.image?.reference?.image.url,
  });
};
async function loadStaticData({context}) {
  try {
    // Run the query
    const data = await context.storefront.query(MENU_QUERY);
    // Process the result
    const metaobjects = data.metaobjects.nodes[0];
    return {
      staticData: metaobjects,
    };
  } catch (error) {
    console.error('Error in loader:', error);
    // Handle or rethrow the error as needed
    throw new Error('Failed to load static data');
  }
}

function menu() {
  const data = useLoaderData();
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const nodesWithLinks =
    data?.staticData.content?.references?.nodes?.filter(
      (node) => node?.link?.value,
    )?.length || 0;

  const [currentSection, setCurrentSection] = useState(null);
  const roomsHeaderRef = useRef();
  const location = useLocation();
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: data.resy_button?.reference?.venueId?.value,
        apiKey: data.resy_button?.reference?.api_key?.value,
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };
  const handleLinkClick = (e, linkValue) => {
    e.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector(linkValue);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 220, // Adjust offset as needed
        behavior: 'smooth',
      });
    }
  };
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 220, // Offset by 200px
          behavior: 'smooth',
        });
      }
    }
  }, [location]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.room').forEach((room) => {
      gsap.fromTo(
        room,
        {width: '100px', height: '100px'},
        {
          width: '75px',
          height: '75px',
          scrollTrigger: {
            id: 'header',
            trigger: roomsHeaderRef.current,
            start: '15% 20%',
            end: '45% 20%',
            toggleActions: 'play none none reverse',
            scrub: true,
            onEnterBack: () => setCurrentSection(null),
          },
        },
      );
    });
    gsap.utils.toArray('.section').forEach((section) => {
      gsap.to(section, {
        scrollTrigger: {
          id: section.id + '_trigger',
          trigger: section,
          start: '-75px 25%',
          end: '100% 25%',
          toggleActions: 'play none none reverse',
          onEnter: () => setCurrentSection(section.id), // Set current section when entering
          onEnterBack: () => setCurrentSection(section.id),
        },
      });
    });
    gsap.fromTo(
      roomsHeaderRef.current,
      {borderBottom: '1px solid white'},
      {
        borderBottom: '1px solid #E7E7E7',
        scrollTrigger: {
          trigger: roomsHeaderRef.current,
          start: '15% 20%',
          end: '15% 20%',
          toggleActions: 'play none none reverse',
        },
      },
    );
    window.onload = () => {
      ScrollTrigger.refresh();
    };
    return () => {
      // Clean up on component unmount
      ScrollTrigger.killAll();
    };
  }, []);
  return (
    <SmoothScroll>
      <div
        className="p-14 flex justify-center w-full"
        style={{backgroundImage: `url(${bg})`}}
      >
        <Link to="/" className="responsive-logo">
          <Logo></Logo>
        </Link>
      </div>
      <div
        ref={roomsHeaderRef}
        className={`flex hide-scrollbar px-8 gap-8 overflow-x-auto sticky top-0 bg-white py-[18px] z-20`}
        style={{
          paddingLeft: `max((100vw - ${nodesWithLinks * 132}px) / 2, 0px)`,
        }}
      >
        {data.staticData.content?.references.nodes.map((item, index) => (
          <button
            key={index}
            className="text-center w-[100px]  flex flex-col gap-3 cursor-pointer items-center link"
            onClick={(e) => handleLinkClick(e, `#${item.link?.value}`)}
          >
            <div
              className={`${
                currentSection == item.link?.value ? 'border-2' : ''
              } border-white-4 h-[100px] p-0.5 w-full rounded-full room`}
            >
              <div className="rounded-full w-full h-full overflow-hidden ">
                <Image
                  className="h-full w-full"
                  src={item.image?.reference?.image.url}
                  alt={item.image?.reference?.image.altText}
                  sizes="(min-width: 2em) 5em, 10em"
                />
              </div>
            </div>
            <span
              className={`${
                currentSection == item.link?.value
                  ? 'p-small-bold-desktop'
                  : 'p-small-regular-desktop'
              } text-black-2`}
            >
              {item.title?.value}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-[120px] pt-[50px] pb-[300px] my-[60px]">
        {data?.staticData.content?.references?.nodes.map((item, index) => (
          <div
            key={`${item.title?.value}_title_${index}`}
            id={item.link?.value}
            className="section flex flex-col items-center gap-8"
          >
            <h3 className="h3-desktop pb-3 moderat-bold text-center">
              {item.title?.value}
            </h3>
            {item.menu_items?.references.nodes.map((item, index) => (
              <div
                key={`${item.title?.value}_item_${index}`}
                className="gap-3 flex flex-col items-center"
              >
                <p className="p-standard-bold-desktop uppercase urbanist text-center">
                  {item.title?.value}
                </p>
                {item.ingredients && (
                  <div className="flex urbanist">
                    {JSON.parse(item.ingredients?.value).map(
                      (ingredient, index, array) => (
                        <p
                          key={`${ingredient}_item_${index}`}
                          className="p-small-regular-desktop text-black-2 text-center"
                        >
                          {ingredient}
                          {index < array.length - 1 && '・'}
                        </p>
                      ),
                    )}
                  </div>
                )}
                <p className="p-small-bold-desktop text-center">
                  ${item.price?.value}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SmoothScroll>
  );
}

export default menu;

const MENU_QUERY = `query StaticPageContent {
  metaobjects(type: "menu", first: 10) {
    nodes {
      handle
      content: field(key: "content") {
        references(first: 30) {
          nodes {
            ... on Metaobject {
              title: field(key: "title") {
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
              menu_items: field(key: "menu_items") {
                references(first: 50) {
                  nodes {
                    ... on Metaobject {
                      title: field(key: "title") {
                        value
                      }
                      price: field(key: "price") {
                        value
                      }
                      ingredients: field(key: "ingredients") {
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
