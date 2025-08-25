import React, {useRef, useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {PRESS_QUERY} from '~/components/query/pressQuery';
import {FormattedText} from '~/components/functions/formatText';
import PersonSection from '~/components/PersonSection';
import QuoteBlock from '~/components/QuoteBlock';
import AnimatedButton from '~/components/AnimatedButton';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import FriendTile from '~/components/FriendTile';
import RoomCard from '~/components/RoomCard';
import useIsMobile from '~/components/functions/isMobile';
import CommunityMobile from '~/components/mobile/CommunityMobile';
export const loader = createStaticDataLoader(PRESS_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};

function Press() {
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  const frenchApartmentRef = useRef();
  
  // If mobile, render the mobile version
  if (isMobileActive) {
    return <CommunityMobile staticData={staticData} />;
  }

  //   useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.registerPlugin(ScrollToPlugin);

  //     gsap.fromTo(
  //       frenchApartmentRef.current,
  //       {opacity: 0}, // Scroll to the middle
  //       {
  //         opacity: 1,
  //         duration: 2.5,
  //         scrollTrigger: {
  //           id: 'opacityApartment',
  //           trigger: frenchApartmentRef.current,
  //           start: '-20% 90%', // When container is 90% down viewport
  //           end: 'bottom 50%',
  //           toggleActions: 'play none none reverse',
  //         },
  //       },
  //     );
  //     return () => {
  //       // Clean up on component unmount
  //       ScrollTrigger.killAll();
  //     };
  //   }, []);
  return (
    <div>
      {/* <div className="py-24">
        <p className="h2-desktop text-center">
          {staticData.press_header?.value}
        </p>
        <div className="pt-12 flex gap-6 items-center overflow-x-auto py-4 justify-center">
          {staticData.press_logos?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex flex-col py-15 rounded-b-2xl bg-white">
        <div className="flex flex-col justify-center items-center gap-6 py-12">
          <h2
            ref={frenchApartmentRef}
            className="h1-desktop  text-center w-[775px]"
          >
            {staticData.press_header?.value}
          </h2>
          {/* <AnimatedButton
            text={staticData.rooms_button.reference.button_text.value}
            h={'42px'}
            w={'339px'}
            clickURL={staticData.rooms_button.reference.link.value}
            hoverColor={staticData.rooms_button.reference.hover_color.value}
          /> */}
        </div>
        <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar py-15 h-[550px] no-overscroll px-8">
          {staticData.rooms_list_1.references.nodes.map((item, index) => (
            <div key={item.id} id={item.header.value} className="flex-1">
              <RoomCard
                header={item.header.value}
                sub={item.sub?.value}
                button_text={item.button_text.value}
                image={item.image.reference.image}
                link={item.link?.value}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="bg-white-2 border-t-white-4 border-t-1 py-15 h-[385px]">
        <div
          // ref={unwindContainer}
          className="pb-16 flex items-center w-full justify-center flex-col"
        >
          <h2 className="h2-desktop w-[800px] text-center">
            {staticData.guest_header.value}
          </h2>
        </div>
        <div className="flex w-full gap-6 px-6 h-[106px]">
          {staticData.guest_options.references.nodes.map((item, index) => (
            <FriendTile
              key={index}
              header={item.header.value}
              sub={item.sub.value}
              content_sub={item.content_sub.value}
              content_header={item.content_header?.value}
            />
          ))}
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default Press;
