import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '../AnimatedButton';
import {FormattedText} from '../functions/formatText';

function ImageCardMobile({
  header,
  descriptor,
  lContent,
  button,
  images,
}) {
  const [currImage, setCurrImage] = useState(images[0]?.image);

  function handleImageChange(image) {
    setCurrImage(image.image);
  }

  return (
    <div className="bg-white">
      {/* Image Section */}
      <div className="h-[300px] w-full relative">
        {currImage && (
          <Image
            data={currImage}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Image Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto hide-scrollbar">
            {images.map((item, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(item)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  currImage?.url === item.image.url 
                    ? 'border-white' 
                    : 'border-white/50'
                }`}
              >
                <Image
                  data={item.image}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="h3-mobile uppercase">{header}</h3>
          {descriptor && (
            <p className="p-small-regular-mobile text-black-3 uppercase">
              {descriptor}
            </p>
          )}
        </div>

        {lContent && (
          <div className="p-standard-mobile text-black-2">
            <FormattedText text={lContent} />
          </div>
        )}

        {button && (
          <AnimatedButton
            h={'48px'}
            w={'100%'}
            text={button.button_text.value}
            bgColor={button.color.value}
            hoverColor={button.hover_color.value}
            clickURL={button?.link.value}
            noMaxWidth
          />
        )}
      </div>
    </div>
  );
}

export default ImageCardMobile; 