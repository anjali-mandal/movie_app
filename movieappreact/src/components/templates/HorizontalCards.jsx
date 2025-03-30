import React from "react";
import { Link } from "react-router-dom";
import noImage from "/no_image.jpg";

const HorizontalCards = ({ data }) => {
  
  
  return (
    <div className="w-full flex overflow-x-auto mb-5 p-5 space-x-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="flex-shrink-0 w-40 md:w-60 lg:w-80 h-full"
          >
            <img
              className="w-full h-40 md:h-60 lg:h-80  hover:scale-105 transition-transform duration-200 object-cover rounded-lg"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noImage
              }
              alt=""
            />
            
            <div className="p-3">
              <h1 className="text-lg md:text-xl font-semibold mb-2 text-white">
                {d.original_title || d.name || d.title || d.original_name}
              </h1>
              <p className="text-white text-sm md:text-base">
                {d.overview ? `${d.overview.slice(0, 100)}...` : ""}
                <span className="text-gray-400"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 font-black text-center">
          No Recommendations Available
        </h1>
      )}
    </div>
  );
};

export default HorizontalCards;
