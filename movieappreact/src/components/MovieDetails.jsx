import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/MovieActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./templates/HorizontalCards";

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [dispatch, id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5),rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path ||
          info.detail.profile_path ||
          info.detail.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-screen relative h-[160vh] px-4 md:px-10 py-10"
    >
      <nav className="w-full text-xl h-[10vh] flex gap-10 items-center">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-black"
        ></Link>{" "}
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}>
          imdb
        </a>
      </nav>
      <div className="flex flex-col md:flex-row w-full">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded-lg h-[50vh] md:h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-0 md:ml-[5%] mt-5 md:mt-0">
          <h1 className="text-3xl md:text-5xl font-black ">
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.title ||
              info.detail.original_name}{" "}
            <small className="text-xl md:text-2xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>{" "}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 mt-3 mb-5">
            <span className="w-[5vh] text-xl font-semibold text-zinc-100 rounded-full h-[5vh] flex justify-center items-center bg-yellow-600">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="font-semibold text-xl md:text-2xl w-[60px] leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
          </div>

          <h1 className="text-xl md:text-2xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-xl md:text-2xl mt-5 ">Overview</h1>
          <p className="opacity-70">{info.detail.overview}</p>
          <h1 className="text-xl md:text-2xl mb-3 mt-5 ">Movie Translated</h1>
          <p className="opacity-70 mb-10">{info.translations.join(", ")}</p>
          <Link
            className="p-3 md:p-5 rounded-lg bg-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-fill text-xl mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[80%] flex flex-col gap-y-10 mt-10">
        {info.watchprovider?.flatrate && (
          <div className="flex flex-wrap gap-x-10 items-center">
            <h1 className="text-xl font-semibold">Available on Platform</h1>
            {info.watchprovider.flatrate.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchprovider?.rent && (
          <div className="flex flex-wrap gap-x-10 items-center">
            <h1 className="text-xl font-semibold">Available on Rent</h1>
            {info.watchprovider.rent.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchprovider?.buy && (
          <div className="flex flex-wrap gap-x-10 items-center">
            <h1 className="text-xl font-semibold">Available to Buy</h1>
            {info.watchprovider.buy.map((w) => (
              <img
                key={w.provider_id}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className="text-3xl font-bold mt-10">
        Recommendations And Similar Stuff
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;