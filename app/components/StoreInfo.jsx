import React from 'react';
import {Image} from '@shopify/hydrogen';
import {FormattedText} from './functions/formatText';
function StoreInfo({data, bgColor = 'white'}) {
  return (
    <div className="px-6 py-8 flex justify-center">
      {data.references.nodes.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 items-center flex-1"
          style={{
            borderRight:
              index === data.references.nodes.length - 1
                ? 'none'
                : '1px solid #E7E7E7',
          }}
        >
          <div
            className="rounded-full w-10 h-10 flex justify-center items-center p-2.5"
            style={{backgroundColor: bgColor}}
          >
            <Image
              src={item.image.reference.image.url}
              alt={item.image.reference.image.altText}
              sizes="100vw h-full w-full"
            ></Image>
          </div>
          <span className="p-standard-bold-desktop uppercase">
            {item.header.value}
          </span>
          {item.contact.value.includes('@') ? (
            <a
              className="text-black-op70 p-small-regular-desktop underline-important"
              href={`mailto:${item.contact.value}`}
            >
              {item.contact.value}
            </a>
          ) : (
            <span className="text-black-op70 p-small-regular-desktop">
              <FormattedText text={item.contact.value} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default StoreInfo;
