import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate,Link } from "react-router-dom";
import Notfound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate()

  console.log(ytvideo);

  return (
    <div className="absolute w-screen top-0 left-0 z-[100] bg-[rgba(0,0,0,.9)] h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="text-3xl ri-close-fill cursor-pointer absolute right-[5%] top-[5%] text-white hover:text-[#6556CD]"
      ></Link>
      {ytvideo ? (
        <ReactPlayer
        controls
          height={650}
          width={1300}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
         <Notfound />
      )}
    </div>
  );
};

export default Trailer;