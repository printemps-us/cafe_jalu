import React from 'react';
import {Image} from '@shopify/hydrogen';
import ContactForm from './ContactForm';
import {FormattedText} from './functions/formatText';

const ContactUsMobile = ({data}) => {
  return (
    <div className="flex flex-col gap-1 bg-white-2">
      {/* Header Section */}
      <div className="flex flex-col gap-2 items-center text-center px-6 pt-14 pb-8">
        <p className="label-semi-bold-mobile text-black-3">{data.sub?.value}</p>
        <h1 className="h2-mobile">{data.header?.value}</h1>
      </div>

      {/* Body Section */}
      <div className="flex flex-col gap-12 bg-white py-12 rounded-t-xl border-t-1 border-t-white-4 items-center">
        <div className="max-w-[500px] flex flex-col gap-12 px-8">
          <div className="flex flex-col gap-4 ">
            <span className="p-small-regular-mobile text-black-3">
              {data.content1?.value
                .split(/(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/)
                .map((part, index) => {
                  // Check if part matches email pattern
                  if (
                    part.match(
                      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                    )
                  ) {
                    return (
                      <a
                        key={index}
                        href={`mailto:${part}`}
                        className="font-bold underline-important text-black"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })}
            </span>
            <div className="p-small-regular-mobile text-black-3">
              <FormattedText text={data.content2?.value}></FormattedText>
            </div>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col gap-8">
            {data.contact_options?.references?.nodes?.map((item, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-[28px]">
                  <Image
                    data={item.image?.reference?.image}
                    alt={item.image?.reference?.image?.altText}
                    width={28}
                    sizes="(min-width: 2em) 5em, 10em"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="p-standard-bold-desktop uppercase">
                    {item.header?.value}
                  </span>
                  {item?.contact?.value?.includes('@') ? (
                    <a
                      className="text-black-op70 p-small-regular-desktop underline-important"
                      href={`mailto:${item?.contact?.value}`}
                    >
                      {item?.contact?.value}
                    </a>
                  ) : (
                    <div className="text-black-op70 p-small-regular-desktop">
                      <FormattedText
                        text={item?.contact?.value}
                      ></FormattedText>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 justify-center items-center">
          <ContactForm />
        </div>
        <div className="flex justify-center mb-10">
          <FormattedText text={data.privacy.value} />
        </div>
      </div>
    </div>
  );
};

export default ContactUsMobile;
