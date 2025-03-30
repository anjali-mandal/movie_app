import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const Popular = () => {
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "Popular" + " " + "|" + " " + category.toUpperCase();

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      console.log(data);

      if (data.results.length > 0) {
        setpopular((prev) => {
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
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-full h-screen py-4 px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-3 hover:text-[#6556CD] cursor-pointer"
          ></i>
          Popular
        </h1>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading....</h1>}
        dataLength={popular.length}
        hasMore={hasMore}
        next={GetPopular}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;