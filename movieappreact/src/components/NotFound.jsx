import React from 'react';
import nfound from '/404.gif';

const Notfound = () => {
  return (
    <div className='w-full select-none h-screen flex justify-center items-center bg-[#000011]'>
      <img className='w-full max-w-md md:max-w-lg lg:max-w-xl h-auto object-cover' src={nfound} alt="Not Found" />
    </div>
  );
};

export default Notfound;