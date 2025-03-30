import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5),rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex flex-col justify-end items-start p-5 md:p-10"
    >
      <h1 className="w-full md:w-[70%] text-3xl md:text-5xl font-black text-white">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className="w-full md:w-[70%] mt-3 mb-3 text-white text-sm md:text-base lg:text-lg">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link>
      </p>
      <p className="text-sm md:text-base lg:text-lg">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "Not Present"}
        <i className="text-yellow-500 ml-5 ri-album-fill"></i>
        {data.media_type.toUpperCase()}{" "}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="p-2 md:p-4 rounded mt-5 bg-[#6556CD] text-sm md:text-base lg:text-lg">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;