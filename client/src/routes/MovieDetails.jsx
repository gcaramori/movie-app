import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AiFillStar } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieReviews, setMovieReviews] = useState();
  const [myRating, setMyRating] = useState();
  const location = useLocation();
  const movieId = location.pathname.split('/').pop();

  useEffect(() => {
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=34148456b4f3b196a104527b50e6d0cf`).then(res => res.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=34148456b4f3b196a104527b50e6d0cf`).then(res => res.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=34148456b4f3b196a104527b50e6d0cf`).then(res => res.json()),
      fetch('http://filmereviews.vercel.app/api/reviews/find', {
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
    .then(([movieDetails, cast, reviews, myRating]) => {
      setMovieDetails(movieDetails);
      setMovieCast(cast);
      setMovieReviews(reviews.results);
      setMyRating(myRating);
    })
    .catch(err => {
      console.log(err);
    })
  }, [location, movieId]);
  
  return (
    <div id="movieDetails" className='w-full h-full font-main md:py-8 xl:py-12 md:px-6 xl:px-12 relative'>
      <Link to='/' className="absolute base:top-1 md:top-4 base:left-3 md:left-6 block h-12 w-12 z-30 text-white">
        <BiArrowBack id="backButton" />
      </Link>
      
      <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 md:px-0 xl:px-10 relative w-full h-full overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div className="relative flex items-start justify-between w-full h-full mb-8">
            <div id="titleAndGeneralInfo">
              <h1 id="movieTitle" className="md:text-3xl xl:text-4xl text-white font-bold mb-3 drop-shadow-md">{movieDetails?.title}</h1>
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

          <div id="movieMainInfo" className="flex justify-start items-start md:gap-12 2xl:gap-20">
            <div className="flex justify-start items-center flex-col md:w-[280px] lg:w-[300px] xl:w-[380px]">
              <div id="moviePoster" className="block relative md:h-[350px] xl:h-[400px] 2xl:h-[500px] md:w-[270px] xl:w-[300px] 2xl:w-[350px] transition-all mb-4">
                <LazyLoadImage
                  className="object-cover h-full w-full relative transition-all"
                  src={'https://image.tmdb.org/t/p/w500/' + movieDetails?.poster_path}
                  height={500}
                  alt="movie_poster"
                />
              </div>
              <div id="movieGenres" className="flex justify-center items-center gap-4 mb-12">
                {
                  movieDetails?.genres?.map((genre, key) => {
                    return <Link to={"/genre/" + genre.id} key={key} className="text-xs text-white py-1 px-2 border border-white rounded-full hover:bg-white hover:text-darkGray transition-all font-bold">{genre.name}</Link>
                  })
                }
              </div>
              <div id="movieReviews" className="flex flex-col justify-start items-start gap-8 w-full">
                <h3 className="text-xl text-white drop-shadow-md font-semibold">
                  Reviews
                </h3>
                {
                  movieReviews?.length > 0 ? 
                    movieReviews?.map((review, key) => {
                      return (
                        <a key={key} rel="noreferrer" target="_blank" href={review.url} className="block relative">
                          <div className="authorProfile relative flex justify-start items-start gap-4 w-full">
                            <div className="block mr-3">
                              <div className="authorPic h-16 w-16 overflow-hidden relative block text-left mb-2">
                                <img src={"https://secure.gravatar.com/avatar/" + review.author_details.avatar_path} alt="authorPic" className="h-full w-full object-contain" />
                              </div>
                              <span className="text-xs text-white font-bold block drop-shadow-md">{review.author_details.name || "User"}</span>
                            </div>
                            <div className="text-gray-300 text-sm font-medium drop-shadow-md block text-left line-clamp-5">
                              {review.content}
                            </div>
                          </div>
                        </a>
                      )
                    }) :
                  <span className="text-md font-medium text-gray-300 drop-shadow-md">
                    There's no reviews of this movie...
                  </span>
                }
              </div>
            </div>
              
            <div className="flex justify-start items-start flex-col lg:max-w-[85%] xl:max-w-[60%]">
              {
                movieDetails?.tagline ? <span id="movieTagline" className="text-2xl text-gray-300 opacity-70 font-bold drop-shadow-md mb-10">
                  "{movieDetails.tagline}"
                </span> : ''
              }
              <div id="movieOverview" className="block mb-10">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-3">
                  Overview
                </h3>
                <span className="text-lg text-gray-300 drop-shadow-md font-medium">
                  {movieDetails?.overview}
                </span>
              </div>
              <div id="movieCast">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-8">
                  Cast
                </h3>
                <div id="cast" className="flex justify-start items-center flex-wrap w-full lg:gap-3 xl:gap-6">
                  {
                    movieCast?.cast?.map((actor, key) => {
                      return (
                        key <= 20 ?
                        <div key={key} className="actor base:w-[95%] lg:w-[45%] xl:w-[30%] 2xl:w-[22%] h-[330px] flex flex-col justify-center items-start">
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