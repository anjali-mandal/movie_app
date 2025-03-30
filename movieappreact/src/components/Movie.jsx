import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Movies = () => {
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Movies" + " " + "|" + " " + category.toUpperCase();

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setmovie((prev) => {
          // Create a new Set to ensure unique entries
          const existingIds = new Set(prev.map((item) => item.id));
          const filteredResults = data.results.filter(
            (item) => !existingIds.has(item.id)
          );

          return [...prev, ...filteredResults];
        });
        setPage((prevPage) => prevPage + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching searches:", error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setPage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-full h-screen py-4 px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-3 hover:text-[#6556CD] cursor-pointer"
          ></i>
          Movies
          <small className="ml-2 text-sm font-semibold text-zinc-600">
            ({category})
          </small>
        </h1>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading....</h1>}
        dataLength={movie.length}
        hasMore={hasMore}
        next={GetMovie}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movies;