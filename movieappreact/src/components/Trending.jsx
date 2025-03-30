import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/Axios";
import Cards from "./templates/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Trending" + " " + "|" + " " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        settrending((prev) => {
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
    if (trending.length === 0) {
      GetTrending();
    } else {
      setPage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-full h-screen py-4 px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-3 hover:text-[#6556CD] cursor-pointer"
          ></i>
          Trending
        </h1>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading....</h1>}
        dataLength={trending.length}
        hasMore={hasMore}
        next={GetTrending}
      >
        <Cards data={trending} title="trending" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;