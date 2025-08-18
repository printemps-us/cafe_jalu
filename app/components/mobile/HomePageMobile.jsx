import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import AnimatedButton from '../AnimatedButton';
import RestaurantModal from '../RestaurantModal';
import RoomCard from '../RoomCard';
import FooterMobile from './FooterMobile';

function HomePageMobile({staticData}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      />

      {/* Hero Section */}
      <div className="bg-[#AF4145] flex flex-col items-center gap-2 py-16 px-4">
        <Image
          className="logo"
          src={
            'https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887'
          }
          width={'300px'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Maison Passerelle Logo"
        />
        <p
          className="moderat-bold text-center text-sm"
          style={{color: '#e8d09b'}}
        >
          ONE WALL STREET, NEW YORK, NEW YORK
        </p>
        <div>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#e8d09b'}}
          >
            SUNDAY - MONDAY
          </p>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#e8d09b'}}
          >
            5:00PM - 9:00PM
          </p>
        </div>
        <div>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#e8d09b'}}
          >
            TUESDAY - SATURDAY
          </p>
          <p
            className="moderat-bold text-center text-sm"
            style={{color: '#e8d09b'}}
          >
            5:00PM - 10:00PM
          </p>
        </div>

        <div className="mt-12 w-full flex flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'Book with Resy'}
            bgColor={'#e8d09b'}
            hoverColor={'#e8d09b'}
            textColor={'black'}
            border="#e8d09b"
            hoverBorder={'#e8d09b'}
            onClick={() => setModalOpen(true)}
            h="48px"
            w="100%"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'#e8d09b'}
            hoverColor={'#e8d09b'}
            textColor={'black'}
            border="#e8d09b"
            hoverBorder={'#e8d09b'}
            clickURL={'/menu'}
            h="48px"
            w="100%"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4 text-center">
        <p className="w-full p-small-regular-mobile text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>

      {/* Room Cards Section - Mobile Scroll */}
      <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pb-8">
        {staticData.about_options.references.nodes.map((item, index) => (
          <div
            key={item.id}
            id={item.header.value}
            className="flex-shrink-0 w-[280px]"
          >
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
              isMobile={true}
            />
          </div>
        ))}
      </div>

      {/* Find Us Section - Mobile Layout */}
      <div className="h-auto bg-white-2 border-y-1 border-y-white-4 flex flex-col">
        <div
          className="h-[300px] w-full"
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        />
        <div className="flex flex-col justify-center items-center gap-6 text-center p-6">
          <h2 className="h2-mobile w-full">{staticData.find_us_title.value}</h2>
          <p className="w-full p-small-regular-mobile text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'48px'}
            w={'100%'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor={staticData.find_us_button.reference.hover_color.value}
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full flex flex-col items-center justify-center py-8 px-4 text-center">
        <h2 className="h2-mobile mb-4">{staticData.title_header.value}</h2>
        <p className="w-full p-small-regular-mobile text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>

      {/* Title Images - Mobile Carousel */}
      <div className="flex gap-4 w-full overflow-x-auto hide-scrollbar px-4 pb-8 mb-10">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] overflow-hidden rounded-xl h-[300px]"
          >
            <Image data={item.image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* As Seen Section */}
      <div className="py-8 border-y-1 border-white-4 my-8 bg-white-2">
        <p className="h2-mobile text-center mb-12">
          {staticData.as_seen_header?.value}
        </p>
        <div className="flex flex-col gap-6 items-center py-4 px-4">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-8 w-full flex justify-center">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <FooterMobile />
    </div>
  );
}

export default HomePageMobile;
