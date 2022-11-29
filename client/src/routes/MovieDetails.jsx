import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from 'react-icons/ai';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();
  const [myRating, setMyRating] = useState();
  const location = useLocation();
  const movieId = location.pathname.split('/').pop();

  useEffect(() => {
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=34148456b4f3b196a104527b50e6d0cf`).then(res => res.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=34148456b4f3b196a104527b50e6d0cf`).then(res => res.json()),
      fetch('http://localhost:8080/reviews/find', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          filter: {
            movieId: movieId
          }
        })
      }).then(res => res.json())
    ])
    .then(([movieDetails, cast, myRating]) => {
      setMovieDetails(movieDetails);
      setMovieCast(cast);
      setMyRating(myRating);
    })
    .catch(err => {
      console.log(err);
    })
  }, [location, movieId]);

  return (
    <div id="movieDetails" className='w-full h-full font-main p-2 relative'> 
      <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 px-10 relative w-full h-full overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div className="relative flex items-center justify-between w-full h-full mb-8">
            <div id="titleAndGeneralInfo">
              <h1 id="movieTitle" className="text-4xl text-white font-bold mb-3 drop-shadow-md">{movieDetails?.title}</h1>
              <div id="movieGeneralInfo" className="block relative">
                <div id="moreDetails" className="flex justify-start items-center gap-4 w-full">
                  <span id="releaseYear" className="inline-block text-sm text-gray-300 font-bold opacity-80 drop-shadow-md">
                    {new Date(movieDetails?.release_date).getFullYear()}
                  </span>
                  <span className="divider inline-block text-gray-300">|</span>
                  <span id="releaseYear" className="inline-block text-sm text-gray-300 font-bold opacity-80 drop-shadow-md">
                    {movieDetails?.runtime} mins
                  </span>
                </div>
              </div>
            </div>
            <div id="avaliations" className="flex justify-center items-center gap-12">
              <div className="usersRating flex flex-col justify-center items-center">
                <span className="inline-block text-md text-gray-300 font-bold opacity-80 drop-shadow-md">IMBD Rating</span>
                <div className="flex justify-start items-center">
                  <AiFillStar size="1.5em" className="text-yellow-500 drop-shadow-md mr-3" />
                  <div className="rate">
                    <span className="text-lg text-white font-bold mr-1">{movieDetails?.vote_average.toFixed(2)}</span>
                    <span className="text-md text-gray-300 font-bold opacity-80 drop-shadow-md">/ 10</span>
                  </div>
                </div>
              </div>
              <div className="yourReview flex flex-col justify-center items-center">
                <span className="inline-block text-md text-gray-300 font-bold opacity-80 drop-shadow-md">Your rating</span>
                <div className="flex justify-start items-center ">
                  {
                    myRating && myRating.length > 0 ?
                    <>
                      <div className="rate">
                        <span className="text-lg text-white font-bold mr-1">{myRating.avaliation}</span>
                        <span className="text-md text-gray-300 font-bold opacity-80 drop-shadow-md">/ 10</span>
                      </div> 
                    </> :
                    <>
                      <Link id="writeReview" to={"/review/" + movieId} className="flex items-center gap-2 text-lg text-white font-bold mr-1">
                        <AiFillStar size="1.5em" className="text-yellow-500" /> Rate
                      </Link>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <div id="movieMainInfo" className="flex justify-start items-start base:gap-10 lg:gap-20">
            <div className="flex justify-start items-center flex-col">
              <div id="moviePoster" className="block relative h-[500px] w-[350px] transition-all mb-4">
                <LazyLoadImage
                  className="object-cover h-full w-full relative transition-all"
                  src={'https://image.tmdb.org/t/p/w500/' + movieDetails?.poster_path}
                  height={500}
                  alt="movie_poster"
                />
              </div>
              <div id="movieGenres" className="flex justify-center items-center gap-4">
                {
                  movieDetails?.genres?.map((genre, key) => {
                    return <Link to={"/genre/" + genre.id} key={key} className="text-xs text-white py-1 px-2 border border-white rounded-full hover:bg-white hover:text-darkGray transition-all font-bold">{genre.name}</Link>
                  })
                }
              </div>
            </div>
            <div className="flex justify-start items-start flex-col max-w-[60%]">
              <span id="movieTagline" className="text-2xl text-gray-300 opacity-70 font-bold drop-shadow-md mb-10">
                "{movieDetails?.tagline}"
              </span>
              <div id="movieOverview" className="block mb-10">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-3">
                  Overview
                </h3>
                <span className="text-lg text-gray-300 drop-shadow-md font-medium">
                  {movieDetails?.overview}
                </span>
              </div>
              <div id="movieCast">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-3">
                  Cast
                </h3>
                <div id="cast" className="flex justify-start items-center flex-wrap w-full gap-6">
                  {
                    movieCast?.cast?.map((actor, key) => {
                      return (
                        key < 20 ?
                        <div key={key} className="actor w-[22%] h-[300px] flex flex-col justify-center items-start">
                          <LazyLoadImage
                            className="object-cover h-full w-full relative transition-all"
                            src={'https://image.tmdb.org/t/p/w400/' + actor.profile_path}
                            height={300}
                            alt="actor_profile_pic"
                          />
                          <h4 className="text-md font-bold drop-shadow-md text-white mt-2">
                            {actor.name}
                          </h4>
                        </div> :
                        ''
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MovieDetails;