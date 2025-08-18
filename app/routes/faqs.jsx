import React, {useState} from 'react';
import {FAQ_QUERY} from '~/components/query/faqQuery';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {data, useLoaderData, defer} from '@remix-run/react';
import Chip from '~/components/Chip';
import DropDownInfo from '~/components/DropDownInfo';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import FooterComponent from '~/components/FooterComponent';
import QuoteBlock from '~/components/QuoteBlock';
import useIsMobile from '~/components/functions/isMobile';
import FaqsMobile from '~/components/mobile/FaqsMobile';
export const loader = createStaticDataLoader(FAQ_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};
function Faqs() {
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  // If mobile, render the mobile version
  if (isMobileActive) {
    return <FaqsMobile staticData={staticData} />;
  }

  const faqData = staticData.faqs.references.nodes.reduce((acc, item) => {
    const key = item.section_id?.value;
    const value = item.options.references.nodes;
    acc[key] = value;
    return acc;
  }, {});
  const [selected, setSelected] = useState(() => Object.keys(faqData)[0] || '');
  return (
    <div>
      <div className=" w-full pt-[80px] pb-[30px] flex-col flex items-center gap-10">
        {/* <p className="h5-desktop">{staticData.section?.value}</p> */}
        <h4 className="h2-desktop">{staticData.header?.value}</h4>
        {/* <div className="mt-[-4px]">
          <Underline4Up size={'sm'} reflection={true} />
        </div> */}
      </div>

      <div className="flex gap-3 justify-center w-full py-6 px-[60px]">
        {staticData.faqs.references.nodes?.map((item, index) => (
          <Chip
            key={index}
            text={item.header?.value}
            selected={selected}
            id={item.section_id?.value}
            setSelected={setSelected}
          />
        ))}
      </div>
      <div className="items-center flex flex-col pb-[120px] px-[100px]">
        {faqData[selected]?.map((item, index) => (
          <div
            key={`${selected}_${index}`}
            className="w-full justify-center flex"
          >
            <DropDownInfo
              header={item.header?.value}
              content={item.content?.value}
              isMobile={false}
            />
          </div>
        ))}
      </div>
      {/* <QuoteBlock data={staticData.quote.reference}></QuoteBlock> */}
      <div className="flex gap-4 px-6 py-20">
        {staticData.images.references.nodes.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl h-[450px]">
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default Faqs;
