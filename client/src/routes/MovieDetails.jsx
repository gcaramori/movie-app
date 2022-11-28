import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const movieId = location.pathname.split('/').pop();

    const getMovieDetails = async () => {
      await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=34148456b4f3b196a104527b50e6d0cf`)
      .then(data => data.json())
      .then(parsedData => {
        setMovieDetails(parsedData);
      })
      .catch(err => console.log(err));
    }

    getMovieDetails();

  }, [location]);

  return (
    <div id="movieDetails" className='w-full h-full font-main p-2 relative'> 
      <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 px-10 relative w-full h-full overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MovieDetails;