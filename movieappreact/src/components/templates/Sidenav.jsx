import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-full md:w-[22%] h-full border-r-2 border-zinc-400 px-5 md:px-10 py-5">
      <h1 className="text-2xl font-bold flex items-center">
        
        <span>🎭 SceneWave</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="font-semibold text-white text-xl mt-10 mb-5">New Feeds</h1>
        <Link to="/trending" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-bar-chart-fill mr-2"></i> Popular
        </Link>
        <Link to="/movie" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-movie-2-fill mr-2"></i> Movies
        </Link>
        <Link to="/tv" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-tv-fill mr-2"></i> Tv Shows
        </Link>
        <Link to="/person" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-team-fill mr-2"></i> People
        </Link>
      </nav>
      <hr className="border-zinc-400 mt-1" />
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="font-semibold text-white text-xl mt-10 mb-5">Website Information</h1>
        <Link to="/about" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-information-fill"></i> About
        </Link>
        <Link to="/contact" className="p-3 md:p-5 rounded-lg hover:bg-[#6556CD] hover:text-white duration-300">
          <i className="ri-phone-fill mr-2"></i> Contact
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;