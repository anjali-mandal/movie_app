import React from 'react';
import loader from '/loader.gif';

const Loading = () => {
  return (
    <div className='w-full select-none h-screen flex justify-center items-center bg-[#000011]'>
      <img className='w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-cover' src={loader} alt="Loading" />
    </div>
  );
};

export default Loading;