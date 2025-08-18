import React from 'react';
import {Image} from '@shopify/hydrogen';
import {FormattedText} from '../functions/formatText';

function StoreInfoMobile({data, bgColor = 'white'}) {
  return (
    <div className="py-8 px-4 border-b border-[#E7E7E7]">
      <div className="flex flex-col gap-6">
        {data.references.nodes.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 items-center pb-4"
            style={{
              borderBottom:
                index === data.references.nodes.length - 1
                  ? 'none'
                  : '1px solid #E7E7E7',
            }}
          >
            <div
              className="rounded-full w-12 h-12 flex justify-center items-center p-3"
              style={{backgroundColor: bgColor}}
            >
              <Image
                src={item.image.reference.image.url}
                alt={item.image.reference.image.altText}
                sizes="100vw h-full w-full"
              />
            </div>
            <span className="p-standard-bold-mobile uppercase">
              {item.header.value}
            </span>
            {item.contact.value.includes('@') ? (
              <a
                className="text-black-op70 p-small-regular-mobile underline-important"
                href={`mailto:${item.contact.value}`}
              >
                {item.contact.value}
              </a>
            ) : (
              <span className="text-black-op70 p-small-regular-mobile text-center">
                <FormattedText text={item.contact.value} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreInfoMobile; 