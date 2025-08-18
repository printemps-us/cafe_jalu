import React from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {CONTACT_QUERY} from '~/components/query/contactQuery';
import useIsMobile from '~/components/functions/isMobile';
import {FormattedText} from '~/components/functions/formatText';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import ContactForm from '~/components/ContactForm';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import FooterComponent from '~/components/FooterComponent';
import ContactUsMobile from '~/components/ContactUsMobile';
export const loader = createStaticDataLoader(CONTACT_QUERY);

function ContactUs() {
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  if (isMobileActive) {
    return <ContactUsMobile data={staticData} />;
  }

  return (
    <>
      <div>
        <div className="bg-white-2 w-full py-[60px] flex-col flex items-center gap-2 border-b-1 border-b-white-4">
          <span className="label-desktop text-black-3">
            {staticData.sub.value}
          </span>
          <h4 className="h4-desktop">{staticData.header.value}</h4>
        </div>

        {/* Two Column Layout */}
        <div className="flex w-full px-[15%] gap-12 mb-20">
          {/* Left Column */}
          <div className="w-[50%] pt-[60px]">
            {/* Content Text */}

            <div className="flex flex-col gap-6 mb-12">
              <span className="p-small-regular-desktop text-black-3">
                {staticData.content1.value
                  .split(
                    /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/,
                  )
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
              <span className="p-small-regular-desktop text-black-3">
                <FormattedText text={staticData.content2.value} />
              </span>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col gap-8">
              {staticData.contact_options.references.nodes.map(
                (item, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="w-[28px]">
                      <Image
                        src={item.image.reference.image.url}
                        alt={item.image.reference.image.altText}
                        width={28}
                        sizes="(min-width: 3em) 5em, 10em"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="p-standard-bold-desktop uppercase">
                        <FormattedText text={item.header.value}></FormattedText>
                      </div>
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
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[50%] pt-[60px]">
            <ContactForm />
          </div>
        </div>
        <div className='flex justify-center mb-20'>
          <FormattedText text={staticData.privacy.value} />
        </div>
        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}

export default ContactUs;
