import React from 'react';
import ImageCardMobile from './ImageCardMobile';
import FooterMobile from './FooterMobile';
import LocationHeroMobile from './LocationHeroMobile';
import StoreInfoMobile from './StoreInfoMobile';
import ImageSectionMobile from './ImageSectionMobile';
import CurvedTileMobile from './CurvedTileMobile';

function LocationMobile({staticData}) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <LocationHeroMobile
        image={staticData.location_image.reference.image}
        header={staticData.page_header.value}
        subHeader={staticData.page_header_sub.value}
      />

      {/* Store Info Section */}
      <StoreInfoMobile data={staticData.contact_options} bgColor={'#AF4145'} />

      {/* Location Info Section */}
      <ImageSectionMobile
        h1={staticData.location_info_header.value}
        sub={staticData.location_info_text.value}
        hours={staticData.location_info_hours.value}
        image={staticData.location_info_image.reference.image}
        buttonText={staticData.location_info_button_text.value}
        link={'https://us.printemps.com/wayfinding?location=maison-passerelle'}
      />
      {/* Other Dining Section */}
      <div className="bg-white mt-[-20px] border-t-1 border-t-white-4 pt-12">
        <div className="px-4">
          <h2 className="h2-mobile text-center">
            {staticData.other_dining_header?.value}
          </h2>
        </div>

        {/* Mobile Carousel for Other Dining */}
        <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pt-4 pb-8">
          {staticData.other_dining.references.nodes.map((item, index) => (
            <CurvedTileMobile
              key={index}
              num={index + 1}
              button={item.button?.reference}
              header={item.header?.value}
              content={item.content?.value}
              image={item.image.reference?.image}
            />
          ))}
        </div>
      </div>
      {/* Inside Sections */}
      <div className="bg-white">
        {staticData.inside_sections.references.nodes.map((item, index) => (
          <div
            className={`relative bg-white border-y-white-4 border-y-1 z-20' ${
              index === staticData.inside_sections.references.nodes.length - 1
                ? 'pb-[20px] rounded-xl'
                : 'mb-[20px]'
            }`}
            key={`${item.header.value}_card`}
          >
            <ImageCardMobile
              header={item.header.value}
              images={item.images.references.nodes}
              descriptor={item.section.value}
              lContent={item.sub_content_1.value}
              button={item.button?.reference}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default LocationMobile;
