import useSWR from 'swr';
import Spinner from '../components/spinner';
import CarouselElement from "../components/carousel";

const Series = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const popularSeries = useSWR(`https://api.themoviedb.org/3/tv/popular?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const airingTodaySeries = useSWR(`https://api.themoviedb.org/3/tv/airing_today?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
  const realitySeries = useSWR(`https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=35`, fetcher);
  const comedySeries = useSWR(`https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10764`, fetcher);
  const documentarySeries = useSWR(`https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=99`, fetcher);
  const scienceAndFantasySeries = useSWR(`https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10765`, fetcher);
  const warAndPoliticsSeries = useSWR(`https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10768`, fetcher);

  return (
      <div id="series" className="w-full h-full font-main p-2 relative">
        <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:px-4 md:px-10 relative w-full h-full overflow-x-hidden">
          {
            popularSeries.isLoading ? <Spinner />
            : <CarouselElement title="Popular" movies={popularSeries.data.results} type="tv" />
          }
          {
            airingTodaySeries.isLoading ? <Spinner />
            : <CarouselElement title="Airing today" movies={airingTodaySeries.data.results} type="tv" />
          }
          {
            comedySeries.isLoading ? <Spinner />
            : <CarouselElement title="Comedy" movies={comedySeries.data.results} type="tv" />
          }
          {
            realitySeries.isLoading ? <Spinner />
            : <CarouselElement title="Reality" movies={realitySeries.data.results} type="tv" />
          }
          {
            documentarySeries.isLoading ? <Spinner />
            : <CarouselElement title="Documentary" movies={documentarySeries.data.results} type="tv" />
          }
          {
            scienceAndFantasySeries.isLoading ? <Spinner />
            : <CarouselElement title="Sci-fi and Fantasy" movies={scienceAndFantasySeries.data.results} type="tv" />
          }
          {
            warAndPoliticsSeries.isLoading ? <Spinner />
            : <CarouselElement title="War and Politics" movies={warAndPoliticsSeries.data.results} type="tv" />
          }
        </div>
    </div>
  )
}

export default Series;