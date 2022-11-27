import { useEffect, useState } from "react";
import CarouselElement from "../components/carousel";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState(null);
    const [trendingMovies, setTrendingMovies] = useState(null);
    const [horrorMovies, setHorrorMovies] = useState(null);
    const [comedyMovies, setComedyMovies] = useState(null);
    const [crimeMovies, setCrimeMovies] = useState(null);
    const [scienceMovies, setScienceMovies] = useState(null);
    const [fantasyMovies, setFantasyMovies] = useState(null);

    useEffect(() => {
      Promise.all([
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=34148456b4f3b196a104527b50e6d0cf').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=27').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=35').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=80').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=878').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=14').then(res => res.json()),
      ])
      .then(([popularMovies, trendingMovies, horror, comedy, crime, scienceFiction, fantasy]) => {
        setPopularMovies(popularMovies.results);
        setTrendingMovies(trendingMovies.results);
        setHorrorMovies(horror.results);
        setComedyMovies(comedy.results);
        setCrimeMovies(crime.results);
        setScienceMovies(scienceFiction.results);
        setFantasyMovies(fantasy.results);
      })
      .catch(err => {
        console.log(err);
      })
    }, []);

    return (
      <div id="home" className='w-full h-full font-main p-2 relative'> 
          <div id="trendingMovies" className="flex flex-col justify-center items-start mb-4 py-4 px-10 relative w-full h-full overflow-x-hidden">
            <CarouselElement title="Popular" movies={popularMovies} />
            <CarouselElement title="Trending" movies={trendingMovies} />
            <CarouselElement title="Horror" movies={horrorMovies} />
            <CarouselElement title="Comedy" movies={comedyMovies} />
            <CarouselElement title="Crime" movies={crimeMovies} />
            <CarouselElement title="Science Fiction" movies={scienceMovies} />
            <CarouselElement title="Fantasy" movies={fantasyMovies} />
          </div>
      </div>
    );
}

export default Home;