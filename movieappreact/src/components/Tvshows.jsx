import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Tvshows = () => {
  const [category, setcategory] = useState("airing_today");
  const [tvShows, settvShows] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Tv Shows" + " " + "|" + " " + category.toUpperCase();

  const GetTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvShows((prev) => {
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
    if (tvShows.length === 0) {
      GetTvShows();
    } else {
      setPage(1);
      settvShows([]);
      GetTvShows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvShows.length > 0 ? (
    <div className="w-full h-screen py-4 px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-3 hover:text-[#6556CD] cursor-pointer"
          ></i>
          Tv Shows
          <small className="ml-2 text-sm font-semibold text-zinc-600">
            ({category})
          </small>
        </h1>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading....</h1>}
        dataLength={tvShows.length}
        hasMore={hasMore}
        next={GetTvShows}
      >
        <Cards data={tvShows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Tvshows;