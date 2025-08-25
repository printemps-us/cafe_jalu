import React from 'react';

function CommunityHeroMobile({header}) {
  return (
    <div className="flex flex-col justify-center items-center py-12 px-6 bg-white-2">
      <h1 className="h1-mobile text-center">
        {header}
      </h1>
    </div>
  );
}

export default CommunityHeroMobile; 