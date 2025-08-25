import React, {useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import AnimatedButton from '~/components/AnimatedButton';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import StoreInfo from '~/components/StoreInfo';
import ImageSection from '~/components/ImageSection';
import ImageCard from '~/components/ImageCard';
import SmoothScroll from '~/components/SmoothScroll';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {LOCATION_PAGE_QUERY} from '~/components/query/locationPageQuery';
import {FormattedText} from '~/components/functions/formatText';
import CurvedTile from '~/components/CurvedTile';
import useIsMobile from '~/components/functions/isMobile';
import LocationMobile from '~/components/mobile/LocationMobile';
export const loader = createStaticDataLoader(LOCATION_PAGE_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};

function Location() {
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  // If mobile, render the mobile version
  if (isMobileActive) {
    return <LocationMobile staticData={staticData} />;
  }

  // Desktop version
  return (
    <SmoothScroll>
      <div
        className="w-full flex relative flex-col items-center justify-center h-[320px] text-center"
        style={{
          backgroundImage: `url(${staticData.location_image.reference.image?.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="z-10 flex flex-col items-center justify-center">
          <h2 className="h2-desktop w-[220px] text-white">
            {staticData.page_header.value}
          </h2>
          <p className="w-[570px] p-standard-medium-desktop text-white">
            {staticData.page_header_sub.value}
          </p>
        </div>
      </div>

      {/* <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.location_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.location_header.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.location_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.location_button.reference.button_text.value}
            bgColor={staticData.location_button.reference.color.value}
            hoverColor={staticData.location_button.reference.hover_color.value}
            clickURL={staticData.location_button.reference?.link.value}
          />
        </div>
      </div> */}
      <StoreInfo
        data={staticData.contact_options}
        bgColor={'#c5e4e4'}
      ></StoreInfo>
      <ImageSection
        h1={staticData.location_info_header.value}
        sub={staticData.location_info_text.value}
        hours={staticData.location_info_hours.value}
        image={staticData.location_info_image.reference.image}
        buttonText={staticData.location_info_button_text.value}
        link={'https://us.printemps.com/wayfinding?location=maison-passerelle'}
      ></ImageSection>
      <div className="bg-white mt-[-20px] border-t-1 border-t-white-4 rounded-t-xl pt-[70px] relative z-10">
        <h2 className="h2-desktop text-center">
          {staticData.other_dining_header?.value}
        </h2>
        <div className="flex flex-1 px-6 pt-[60px] max-w-full gap-12 box-border relative h-[555px]">
          {staticData.other_dining.references.nodes.map((item, index) => (
            <CurvedTile
              key={index}
              num={index + 1}
              h={'90%'}
              arrows={false}
              button={item.button?.reference}
              header={item.header?.value}
              content={item.content?.value}
              image={item.image.reference?.image}
              animate={false}
            />
          ))}
        </div>
      </div>
      <div className="bg-white">
        {staticData.inside_sections.references.nodes.map((item, index) => (
          <div
            className={`relative bg-white border-y-white-4 border-y-1 z-20' ${
              index === staticData.inside_sections.references.nodes.length - 1
                ? 'pb-[60px] rounded-xl'
                : 'mb-[60px]'
            }`}
            key={`${item.header.value}_card`}
          >
            <ImageCard
              header={item.header.value}
              images={item.images.references.nodes}
              descriptor={item.section.value}
              lContent={item.sub_content_1.value}
              button={item.button?.reference}
              // setModalInfo={setModalInfo}
              // setOpenModal={setOpenModal}
              // secondary_button={item.secondary_button?.reference}
              position={index % 2 ? 'left' : 'right'}
            />
          </div>
        ))}
      </div>

      <FooterComponent></FooterComponent>
    </SmoothScroll>
  );
}

export default Location;
