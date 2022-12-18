import useSWR from 'swr';
import Spinner from '../components/spinner';
import CarouselElement from "../components/carousel";

const Movies = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const popularMovies = useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const trendingMovies = useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const horrorMovies = useSWR(`https://api.themoviedb.org/3/movie/top_rated?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const topRatedMovies = useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const crimeMovies = useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const scienceMovies = useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const fantasyMovies = useSWR(`https://api.themoviedb.org/3/trending/all/day?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);

  return (
    <div id="movies" className='w-full h-full font-main p-2 relative'> 
        <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:px-4 md:px-10 relative w-full h-full overflow-x-hidden">
          {
            popularMovies.isLoading ? <Spinner />
            : <CarouselElement title="Popular" movies={popularMovies.data.results} type="movie" />
          }
          {
            trendingMovies.isLoading ? <Spinner />
            : <CarouselElement title="Trending" movies={trendingMovies.data.results} type="movie" />
          }
          {
            topRatedMovies.isLoading ? <Spinner />
            : <CarouselElement title="Top Rated" movies={topRatedMovies.data.results} type="movie" />
          }
          {
            horrorMovies.isLoading ? <Spinner />
            : <CarouselElement title="Horror" movies={horrorMovies.data.results} type="movie" />
          }
          {
            crimeMovies.isLoading ? <Spinner />
            : <CarouselElement title="Crime" movies={crimeMovies.data.results} type="movie" />
          }
          {
            scienceMovies.isLoading ? <Spinner />
            : <CarouselElement title="Science Fiction" movies={scienceMovies.data.results} type="movie" />
          }
          {
            fantasyMovies.isLoading ? <Spinner />
            : <CarouselElement title="Fantasy" movies={fantasyMovies.data.results} type="movie" />
          }
        </div>
    </div>
  );
}

export default Movies;