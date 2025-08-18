import React from 'react';

function QuoteBlock({small = false, data}) {
  return (
    <div
      className={`relative h-[320px] w-full flex flex-col justify-center items-center text-center ${
        data.image ? '' : 'bg-white-2'
      }`}
      style={
        data.image
          ? {
              backgroundImage: `url(${data.image.reference.image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      {data.image && <div className="absolute inset-0 bg-black/70 z-0" />}

      <div className="w-[850px] relative z-10">
        <p
          className={`${small ? 'h5-desktop' : 'h2-desktop'} ${
            data.image ? 'text-white' : ''
          }`}
        >
          {data.quote.value}
        </p>
      </div>
      <div className="mt-6 relative z-10">
        <p
          className={`uppercase p-small-regular-desktop ${
            data.image ? 'text-white' : ''
          }`}
        >
          {data.author.value}
        </p>
      </div>
    </div>
  );
}

export default QuoteBlock;
