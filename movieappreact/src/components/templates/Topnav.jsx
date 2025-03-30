import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utils/Axios";
import noImage from "/no_image.jpg";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);
  const { id } = useParams();

  const GetSearches = async () => {
    if (query.trim() === "") {
      setSearches([]);
      return;
    }

    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      GetSearches();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start items-center px-4 md:px-10">
      <i className="text-3xl ri-search-line text-zinc-400"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[70%] md:w-[50%] mx-4 md:mx-10 p-2 md:p-5 text-sm md:text-xl bg-transparent text-white outline-none"
        type="text"
        placeholder="Search Anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-3xl ri-close-fill cursor-pointer text-zinc-400"
        ></i>
      )}

      <div className="w-[90%] md:w-[50%] max-h-[50vh] z-30 absolute top-[100%] left-[5%] overflow-auto bg-zinc-200">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="text-zinc-600 font-semibold justify-start items-center p-4 md:p-10 flex w-[100%] border-b-2 border-zinc-100 hover:text-black hover:bg-zinc-300 duration-300"
          >
            <img
              className="w-[8vh] md:w-[10vh] shadow-xl h-[8vh] md:h-[10vh] object-cover rounded mr-3 md:mr-5"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noImage
              }
              alt=""
            />
            <span className="text-sm md:text-base">
              {s.original_title || s.name || s.title || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;