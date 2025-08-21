import React from 'react';
import {Image} from '@shopify/hydrogen';
function MediaComponent({data}) {
  if (data?.__typename == 'Video') {
    return (
      <div className='overflow-hidden rounded-xl'>
        <video
          autoPlay
          muted
          loop
          controls={false} // change to true while debugging
          className="w-full h-full object-cover"
          aria-label="Background video"
        >
          {data.sources.map((source, index) => (
            <source key={index} src={source.url} type={source.mimeType} />
          ))}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  return (
    <Image
      data={data.image}
      sizes="(min-width: 45em) 50vw, 100vw"
      className="w-full h-full object-cover"
    ></Image>
  );
}

export default MediaComponent;
