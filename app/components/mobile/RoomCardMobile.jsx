import React from 'react';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import AnimatedButton from '../AnimatedButton';
import {FormattedText} from '../functions/formatText';

function RoomCardMobile({header, sub, image, button_text, link}) {
  return (
    <div className="flex-shrink-0 w-[280px] h-[400px]">
      <div
        className="block bg-white rounded-xl overflow-hidden border border-white-4 h-full flex flex-col"
        style={{textDecoration: 'none'}} 
      >
        {/* Image */}
        <div className="w-full h-[200px] relative overflow-hidden">
          <Image
            data={image}
            className="w-full h-full object-cover"
            sizes="280px"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <h3 className="h4-mobile uppercase">
              {header}
            </h3>
            <p className="p-small-regular-mobile text-black-2 line-clamp-5">
              <FormattedText text={sub} />
            </p>
          </div>
        </div>

        {/* Button at the bottom */}
        <div className="px-4 pb-4">
          <AnimatedButton
            h={'40px'}
            w={'100%'}
            text={button_text}
            bgColor={'black'}
            hoverColor={'#AF4145'}
            clickURL={link}
          />
        </div>
      </div>
    </div>
  );
}

export default RoomCardMobile; 