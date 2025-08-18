import React from 'react';
import {Image} from '@shopify/hydrogen';
import RoomCardMobile from './RoomCardMobile';
import FriendTileMobile from './FriendTileMobile';
import FooterMobile from './FooterMobile';

function CommunityMobile({staticData}) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center py-0 px-6 bg-white">
        <h1 className="h1-mobile text-center">{staticData.press_header?.value}</h1>
      </div>

      {/* Rooms Section */}
      <div className="bg-white pb-2">
        <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pb-8">
          {staticData.rooms_list_1.references.nodes.map((item, index) => (
            <RoomCardMobile
              key={item.id}
              header={item.header.value}
              sub={item.sub.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          ))}
        </div>
      </div>

      {/* Filler Image */}
      <div className="w-full h-[200px] overflow-hidden">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      </div>

      {/* Guest Section */}
      <div className="bg-white-2 py-8 px-4">
        <div className="flex flex-col items-center gap-6 mb-4">
          <h2 className="h2-mobile text-center">
            {staticData.guest_header.value}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {staticData.guest_options.references.nodes.map((item, index) => (
            <FriendTileMobile
              key={index}
              header={item.header.value}
              sub={item.sub.value}
              content_sub={item.content_sub.value}
              content_header={item.content_header.value}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default CommunityMobile;
