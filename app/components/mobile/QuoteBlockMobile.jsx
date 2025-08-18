import React from 'react';
import {Image} from '@shopify/hydrogen';
import {FormattedText} from '../functions/formatText';

function QuoteBlockMobile({data}) {
  return (
    <div className="relative h-[250px] w-full flex flex-col justify-center items-center text-center">
      {/* Background Image */}
      {data.image?.reference?.image && (
        <div className="absolute inset-0 z-0">
          <Image
            data={data.image.reference.image}
            className="w-full h-full object-cover"
            sizes="100vw"
          />
        </div>
      )}
      
      {/* Black Overlay */}
      {data.image?.reference?.image && (
        <div className="absolute inset-0 bg-black/70 z-0" />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 px-6">
        <div className="p-small-regular-mobile text-white italic">
          <FormattedText text={data.quote.value} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="p-standard-bold-mobile text-white uppercase">
            {data.author.value}
          </p>
          {data.title?.value && (
            <p className="p-small-regular-mobile text-white/80">
              {data.title.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuoteBlockMobile; 