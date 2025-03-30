import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/PersonActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import Loading from "./Loading";
import Dropdown from "./templates/Dropdown";
import HorizontalCards from "./templates/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setcategory] = useState("movie");
  const { info } = useSelector((state) => state.person);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [dispatch, id]);

  return info ? (
    <div className="px-4 md:px-[10%] w-screen h-[230vh]">
      <nav className="w-full h-[10vh] text-xl flex gap-10 items-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-black"
        ></Link>{" "}
      </nav>

      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-[20%] mb-20">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded-lg h-[35vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          <div className="text-2xl flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-lg text-zinc-400">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-lg text-zinc-400">
            {info.detail.gender === 2 ? "male" : "female"}
          </h1>
          <h1 className="text-lg text-zinc-400 mt-3 font-semibold">Birthday</h1>
          <h1 className="text-lg text-zinc-400">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 mt-3 font-semibold">
            Deathday
          </h1>
          <h1 className="text-lg text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg mt-3 text-zinc-400 font-semibold">
            Place of birth
          </h1>
          <h1 className="text-lg text-zinc-400">
            {info.detail.place_of_birth}
          </h1>
          <h1 className="text-lg mt-3 text-zinc-400 font-semibold">
            Also Known As
          </h1>
          <h1 className="text-lg text-zinc-400">
            {info.detail.also_known_as.join(" ")}
          </h1>
        </div>

        <div className="w-full md:w-[80%] md:ml-[5%]">
          <h1 className="text-3xl md:text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold">BioGraphy</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>
          <h1 className="text-lg mt-5 text-zinc-400 font-semibold">
            Filmography
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="flex w-full justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="w-full h-[50vh] list-disc text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] mt-5 border-2 border-zinc-700 p-5">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name: ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;