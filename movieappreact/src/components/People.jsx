import React, { useEffect, useState } from "react";
import axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";

const People = () => {
  const [category, setcategory] = useState("popular");
  const [person, setperson] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "People" + " " + "|" + " " + category.toUpperCase();

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setperson((prev) => {
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
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setperson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return person.length > 0 ? (
    <div className="w-full h-screen py-4 px-4 md:px-8 lg:px-12">
      <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl text-zinc-400 font-semibold mb-4 md:mb-0">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-3 hover:text-[#6556CD] cursor-pointer"
          ></i>
          People
        </h1>

        <div className="flex w-full md:w-auto items-center space-x-4">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        loader={<h1>Loading....</h1>}
        dataLength={person.length}
        hasMore={hasMore}
        next={GetPerson}
      >
        <Cards data={person} title="person" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default People;