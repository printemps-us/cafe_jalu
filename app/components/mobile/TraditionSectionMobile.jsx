import React from 'react';
import {Image} from '@shopify/hydrogen';
import MediaComponent from '../MediaComponent';

function TraditionSectionMobile({header, content, image, imageFirst = false}) {

  return (
    <div className="bg-white rounded-t-xl mt-[-20px] relative z-20 px-6 py-8">
      <div className="flex flex-col gap-6">
        {imageFirst ? (
          <>
            <div className="w-full h-[250px] overflow-hidden rounded-xl">
              <MediaComponent
                data={image}
              />
            </div>
            <div className="flex flex-col gap-2 text-center pt-2">
              <h2 className="h2-mobile">
                {header}
              </h2>
              <p className="p-small-regular-mobile text-black-2">
                {content}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 text-center pb-2">
              <h2 className="h2-mobile">
                {header}
              </h2>
              <p className="p-small-regular-mobile text-black-2">
                {content}
              </p>
            </div>
            <div className="w-full h-[250px] overflow-hidden rounded-xl">
              <MediaComponent
                data={image}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TraditionSectionMobile; 