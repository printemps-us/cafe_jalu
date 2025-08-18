import React, {useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
import Close from '~/assets/CloseIcon.svg';
function RestaurantModal({
  setOpenModal,
  openModal,
  venue_id,
  link,
  api_key,
  isMobile = false,
}) {
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: venue_id,
        apiKey: api_key,
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };
  return (
    <>
      {openModal && (
        <div className="z-110 fixed top-[-100px] left-0 w-screen h-[calc(100vh+100px)] bg-black-op40 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl flex flex-col items-center px-6 pt-[18px] pb-6 gap-8">
            <div className="relative w-full">
              <div className="w-full flex justify-end mb-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <img src={Close} alt="close icon" width={20} height={20} />
                </button>
              </div>
              <h3
                className={`${
                  isMobile ? 'h3-mobile' : 'h3-desktop'
                } text-center`}
              >
                How Do you want<br></br> to book?
              </h3>
            </div>
            <p
              className={`${
                isMobile ? 'p-small-regular-mobile' : 'p-small-regular-desktop'
              } text-black-2 text-center`}
            >
              Stay here to book in your browser, or switch to the<br></br> Resy
              app if you have it installed.
            </p>

            <div className="flex flex-col gap-2">
              <AnimatedButton
                text={'Book on this Site'}
                bgColor={'black'}
                hoverColor={'black'}
                border="black"
                onClick={handleClick}
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
              />
              <AnimatedButton
                text={'Open In The Resy App'}
                bgColor={'white'}
                hoverColor={'#e8d09b'}
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
                onClick={() => window.open(link)}
                tilted={true}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RestaurantModal;
