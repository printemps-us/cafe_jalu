import React from 'react';
import {Image} from '@shopify/hydrogen';

function AboutHeroMobile({image}) {
  return (
    <div className="overflow-hidden w-full h-[250px]">
      <Image
        data={image}
        className="w-full h-full object-cover"
        sizes="100vw"
      />
    </div>
  );
}

export default AboutHeroMobile; 