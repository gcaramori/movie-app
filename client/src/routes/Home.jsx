import { useEffect, useState } from "react";
import CarouselElement from "../components/carousel";

const Home = () => {
    const [movies, setMovies] = useState(null);

    useEffect(() => {
      const getMovies = async () => {
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=34148456b4f3b196a104527b50e6d0cf')
        .then(data => data.json())
        .then(parsedData => {
          setMovies(parsedData.results);
        });
      }

      getMovies();
    }, []);

    return (
      <div id="home" className='w-full h-full font-main p-2 relative'> 
        <div id="trendingMovies" className="flex flex-col justify-center items-start mb-4 py-4 px-10 relative w-full h-full overflow-hidden">
          <CarouselElement title="Em alta" movies={movies} />
        </div>
      </div>
    );
}

export default Home;