import React from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '../AnimatedButton';
import {FormattedText} from '../functions/formatText';

function ImageSectionMobile({
  h1,
  sub,
  sub2,
  buttonText,
  hours = '',
  link,
  image,
}) {
  return (
    <div className="bg-white-2 flex flex-col">
      <div
        className="h-[300px] w-full"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${image.url})`,
        }}
      />
             <div className="flex flex-col justify-center items-center gap-6 p-6">
         <h2 className="h2-mobile w-full text-center">
           {h1}
         </h2>
         <div className="flex flex-col gap-4 w-full">
           <div className="flex flex-row justify-between text-black-2">
             <div className="flex-1 p-small-regular-mobile">
               <FormattedText text={sub} />
             </div>
             {hours && (
               <div className="flex-1 text-right p-small-regular-mobile">
                 <FormattedText text={hours} />
               </div>
             )}
           </div>
           {sub2 && (
             <div className="w-full p-small-regular-mobile text-black-2">
               {sub2}
             </div>
           )}
         </div>
        {buttonText && (
          <AnimatedButton
            h={'48px'}
            w={'100%'}
            text={buttonText}
            bgColor={'white'}
            hoverColor={'#00D072'}
            clickURL={link}
          />
        )}
      </div>
    </div>
  );
}

export default ImageSectionMobile; 