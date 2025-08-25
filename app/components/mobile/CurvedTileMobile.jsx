import React from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '../AnimatedButton';

function CurvedTileMobile({
  num,
  button,
  header,
  content,
  image,
}) {
  return (
    <div className="flex-shrink-0 w-[280px] h-[400px]">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-white-4 h-full flex flex-col">
        <div className="h-[200px] relative">
          <Image
            data={image}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="h4-mobile mb-2">{header}</h3>
          <p className="p-small-regular-mobile text-black-2 mb-4">
            {content}
          </p>
        </div>
        {button && (
          <div className="p-4 pt-0 mt-auto">
            <AnimatedButton
              h={'40px'}
              w={'100%'}
              text={button.button_text.value}
              bgColor={button.color.value}
              hoverColor={button.hover_color.value}
              clickURL={button?.link.value}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CurvedTileMobile; 