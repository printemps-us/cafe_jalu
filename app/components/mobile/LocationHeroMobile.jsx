import React from 'react';

function LocationHeroMobile({image, header, subHeader}) {
  return (
    <div
      className="w-full flex relative flex-col items-center justify-center py-8 text-center px-4"
      style={{
        backgroundImage: `url(${image?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="z-10 flex flex-col items-center justify-center">
        <h2 className="h1-mobile text-white mb-4">
          {header}
        </h2>
        <p className="w-full p-standard-mobile text-white">
          {subHeader}
        </p>
      </div>
    </div>
  );
}

export default LocationHeroMobile; 