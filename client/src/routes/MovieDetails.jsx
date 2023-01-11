import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { motion } from 'framer-motion';
import { AiFillStar, AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import Spinner from '../components/spinner';
import { setCookie, getCookie } from '../utils/helper';

const MovieDetails = ({ isMobile }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCastOpen, setIsCastOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const movieId = location.pathname.split('/').pop();

  const movieResponse = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const castResponse = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const reviewsResponse = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const myRatingResponse = useSWR(`https://filmereviews.vercel.app/api/reviews/find`, fetcher('https://filmereviews.vercel.app/api/reviews/find', {
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
  }));
  
  useEffect(() => {
    if(getCookie('lastSeen') !== null) {
      const lastSeenIds = JSON.parse(getCookie('lastSeen'));
      lastSeenIds.push(movieId);

      setCookie('lastSeen', JSON.stringify(lastSeenIds), 365);
    }
    else {
      setCookie('lastSeen', JSON.stringify([movieId]), 365);
    }

    if(!isMobile) {
      setIsCastOpen(true);
      setIsReviewOpen(true);
    }
  }, [location, movieId, isMobile]);

  const handleOpenReviews = () => {
    setIsReviewOpen(!isReviewOpen);
  }

  const handleOpenCast = () => {
    setIsCastOpen(!isCastOpen);
  }

  return (
    <div id="movieDetails" className='w-full h-full font-main md:py-8 xl:py-12 md:px-6 xl:px-12 relative'>
      <button onClick={() => navigate(-1)} className="absolute base:top-4 base:left-[unset] lg:left-6 base:right-3 lg:right-[unset] block h-12 w-12 z-50 text-white">
        <BiArrowBack id="backButton" />
      </button>
      
      <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:pt-14 md:pt-10 xl:pt-4 md:px-0 xl:px-10 relative w-full h-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div className="relative flex base:flex-col md:flex-row base:items-start justify-between w-full h-full mb-8">
            <div id="titleAndGeneralInfo" className="base:mb-6 md:mb-0 base:px-8 sm:px-10 md:px-0">
              <h1 id="movieTitle" className="base:text-3xl xl:text-4xl text-white font-bold base:mb-1 md:mb-3 drop-shadow-md base:text-right md:text-left">
                {
                  movieResponse.isLoading ? <Spinner /> : movieResponse.data.title
                }
              </h1>
              <div id="movieGeneralInfo" className="block relative">
                <div id="moreDetails" className="flex base:justify-start items-center gap-4 w-full"> 
                  <span id="releaseYear" className="inline-block text-sm text-gray-300 font-bold opacity-80 drop-shadow-md base:text-right md:text-left">
                    {
                      movieResponse.isLoading ? <Spinner /> : new Date(movieResponse.data.release_date).getFullYear()
                    }
                  </span>
                  <span className="divider inline-block text-gray-300">|</span>
                  <span id="releaseYear" className="inline-block text-sm text-gray-300 font-bold opacity-80 drop-shadow-md base:text-right md:text-left">
                    {
                      movieResponse.isLoading ? <Spinner /> : `${movieResponse.data.runtime} mins`
                    }
                  </span>
                </div>
              </div>
            </div>
            <div id="avaliations" className="flex justify-center items-center gap-12 base:px-8 sm:px-10 md:px-0">
              <div className="usersRating flex flex-col justify-center items-center">
                <span className="inline-block text-md text-gray-300 font-bold opacity-80 drop-shadow-md">IMBD Rating</span>
                <div className="flex justify-start items-center">
                  <AiFillStar size="1.5em" className="text-yellow-500 drop-shadow-md mr-3" />
                  <div className="rate">
                    <span className="text-lg text-white font-bold mr-1">
                      {
                        movieResponse.isLoading ? <Spinner /> : movieResponse.data.vote_average.toFixed(2)
                      }
                    </span>
                    <span className="text-md text-gray-300 font-bold opacity-80 drop-shadow-md">/ 10</span>
                  </div>
                </div>
              </div>
              <div className="yourReview flex flex-col justify-center items-center">
                <span className="inline-block text-md text-gray-300 font-bold opacity-80 drop-shadow-md">Your rating</span>
                <div className="flex justify-start items-center ">
                  {
                    myRatingResponse.isLoading ? <Spinner />
                    : myRatingResponse.data && myRatingResponse.data.length > 0
                    ? <>
                      <div className="rate">
                        <span className="text-lg text-white font-bold mr-1">{myRatingResponse.data.avaliation}</span>
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

          <div id="movieMainInfo" className="flex base:flex-col md:flex-row justify-start items-start md:gap-12 2xl:gap-20">
            <div className="flex justify-start items-center flex-col base:w-full md:w-[280px] lg:w-[300px] xl:w-[380px]">
              <div id="moviePoster" className="block relative base:h-[500px] md:h-[350px] xl:h-[400px] 2xl:h-[500px] base:w-[90%] md:w-[270px] xl:w-[300px] 2xl:w-[350px] transition-all mb-4">
                {
                  movieResponse.isLoading ? <Spinner /> : <img
                    className="object-cover h-full w-full relative transition-all"
                    src={'https://image.tmdb.org/t/p/w500/' + movieResponse.data.poster_path}
                    alt="movie_poster"
                  /> 
                }
              </div>
              <div id="movieGenres" className="flex justify-center items-center gap-4 mb-12">
                {
                  movieResponse.isLoading ? <Spinner /> : movieResponse.data.genres.map((genre, key) => {
                    return <Link to={"/genre/" + genre.id} key={key} className="text-xs text-white py-1 px-2 border border-white rounded-full hover:bg-white hover:text-darkGray transition-all font-bold">{genre.name}</Link>
                  })
                }
              </div>
              <div id="reviewsResponse.data" className="block base:w-[90%] md:w-full relative">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-8">
                  Reviews
                </h3>
                {
                  isMobile ?
                  <div id="openReviews" className="h-6 w-6 absolute top-0 right-2 text-white transition-all" onClick={handleOpenReviews} >
                    { !isReviewOpen ? <AiFillPlusSquare size="2em" /> : <AiFillMinusSquare size="2em" /> }
                  </div> :
                  ''
                }
                <div id="reviewsContainer" className={`flex flex-col justify-start items-start gap-8 base:w-[90%] md:w-full ${isReviewOpen ? 'h-full' : 'h-[0px]'} overflow-hidden relative transition-all`}>
                  {
                    reviewsResponse.isLoading ? <Spinner />
                    : reviewsResponse.data.results && reviewsResponse.data.results.length > 0
                    ? reviewsResponse.data.results.map((review, key) => {
                      return (
                        <a key={key} rel="noreferrer" target="_blank" href={review.url} className="block relative w-full">
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
                    })
                    : <span className="text-md font-medium text-gray-300 drop-shadow-md">
                      There's no reviews of this movie...
                    </span>
                  }
                </div>
              </div>
            </div>
              
            <div className="flex justify-start items-start flex-col base:max-w-[90%] lg:max-w-[85%] xl:max-w-[60%] mx-[auto]">
              {
                movieResponse.isLoading ? <Spinner /> : <span id="movieTagline" className="text-2xl text-gray-300 opacity-70 font-bold drop-shadow-md mb-10 text-justify">
                  "{movieResponse.data.tagline}"
                </span>
              }
              <div id="movieOverview" className="block mb-10">
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-3">
                  Overview
                </h3>
                <span className="text-lg text-gray-300 drop-shadow-md font-medium">
                  {
                    movieResponse.isLoading ? <Spinner /> 
                    : movieResponse.data.overview !== '' ? 
                    `"${movieResponse.data.overview}"` : ''
                  }
                </span>
              </div>
              <div id="movieCast" className='block relative'>
                <h3 className="text-xl text-white drop-shadow-md font-semibold mb-8">
                  Cast
                </h3>
                {
                  isMobile ?
                  <div id="openCast" className="h-6 w-6 absolute top-0 right-2 text-white transition-all" onClick={handleOpenCast} >
                    { !isCastOpen ? <AiFillPlusSquare size="2em" /> : <AiFillMinusSquare size="2em" /> }
                  </div> :
                  ''
                }
                <div id="cast" className={`flex justify-start items-center flex-wrap w-full md:gap-3 xl:gap-6 ${isCastOpen ? 'h-full' : 'h-[0px]'} overflow-hidden`}>
                  {
                    castResponse.isLoading ? <Spinner />
                    : castResponse.data.cast.length > 0 
                    ? castResponse.data.cast.map((actor, key) => {
                      return (
                        key <= 20 ?
                        <div key={key} className="actor base:w-[95%] md:w-[45%] xl:w-[30%] 2xl:w-[22%] base:h-[auto] md:h-[330px] flex flex-col justify-center items-start base:mb-6 md:mb-0">
                          <img
                            className="base:object-contain md:object-cover h-full w-full relative transition-all"
                            src={'https://image.tmdb.org/t/p/w400/' + actor.profile_path}
                            alt="actor_profile_pic"
                          />
                          <h4 className="text-md font-bold drop-shadow-md text-white mt-2">
                            {actor.name}
                          </h4>
                        </div> :
                        ''
                      )
                    }) : ''
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