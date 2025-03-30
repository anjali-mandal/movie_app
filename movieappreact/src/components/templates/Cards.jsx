import React from "react";
import { Link } from "react-router-dom";
import noImage from "/no_image.jpg";

const Cards = ({ data, title }) => {
  console.log(data,title);
  
  return (
    <div className="flex flex-wrap w-full">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[45%] sm:w-[30%] md:w-[22%] lg:w-[18%] xl:w-[15%] mr-[2%] mb-[5%]"
        >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[45vh] xl:h-[50vh] object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noImage
            }
            alt=""
          />
          <h1 className="text-lg sm:text-xl md:text-2xl text-zinc-200 mt-3 font-semibold">
            {c.original_title || c.name || c.title || c.original_name}
          </h1>
          {c.vote_average && (
            <div className="w-[5vh] absolute bottom-[25%] right-0 text-xl font-semibold text-zinc-100 rounded-full h-[5vh] flex justify-center items-center bg-yellow-600">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;