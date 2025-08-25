import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import Chip from '../Chip';
import DropDownInfo from '../DropDownInfo';
import FooterMobile from './FooterMobile';

function FaqsMobile({staticData}) {
  const faqData = staticData.faqs.references.nodes.reduce((acc, item) => {
    const key = item.section_id?.value;
    const value = item.options.references.nodes;
    acc[key] = value;
    return acc;
  }, {});
  
  const [selected, setSelected] = useState(() => Object.keys(faqData)[0] || '');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center py-0 px-6 bg-white">
        <h1 className="h1-mobile text-center">
          {staticData.header?.value}
        </h1>
      </div>

      {/* FAQ Categories */}
      <div className="bg-white">
        <div className="flex gap-3 justify-center w-full py-2 px-4 overflow-x-auto hide-scrollbar">
          {staticData.faqs.references.nodes?.map((item, index) => (
            <Chip
              key={index}
              text={item.header?.value}
              selected={selected}
              id={item.section_id?.value}
              setSelected={setSelected}
              isMobile={true}
            />
          ))}
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col w-full">
          {faqData[selected]?.map((item, index) => (
            <div key={`${selected}_${index}`} className="w-full">
              <DropDownInfo
                header={item.header?.value}
                content={item.content?.value}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Images Section */}
      <div className="flex gap-4 px-6 py-8 overflow-x-auto hide-scrollbar">
        {staticData.images.references.nodes.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-[280px] h-[200px] overflow-hidden rounded-xl">
            <Image 
              data={item.image} 
              className="w-full h-full object-cover"
              sizes="280px"
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default FaqsMobile; 