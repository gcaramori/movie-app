import { useEffect, useState } from "react";
import CarouselElement from "../components/carousel";

const Series = () => {
    const [popularSeries, setPopularSeries] = useState(null);
    const [airingTodaySeries, setAiringTodaySeries] = useState(null);
    const [realitySeries, setRealitySeries] = useState(null);
    const [comedySeries, setComedySeries] = useState(null);
    const [documentarySeries, setDocumentarySeries] = useState(null);
    const [scienceAndFantasySeries, setScienceAndFantasySeries] = useState(null);
    const [warAndPoliticsSeries, setWarAndPoliticsSeries] = useState(null);

    useEffect(() => {
      Promise.all([
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=34148456b4f3b196a104527b50e6d0cf').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=34148456b4f3b196a104527b50e6d0cf').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=35').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10764').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=99').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10765').then(res => res.json()),
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=34148456b4f3b196a104527b50e6d0cf&with_genres=10768').then(res => res.json()),
      ])
      .then(([popularSeries, airingToday, comedy, reality, documentary, scienceAndFantasy, warAndPolitics]) => {
        setPopularSeries(popularSeries.results);
        setAiringTodaySeries(airingToday.results);
        setComedySeries(comedy.results);
        setRealitySeries(reality.results);
        setDocumentarySeries(documentary.results);
        setScienceAndFantasySeries(scienceAndFantasy.results);
        setWarAndPoliticsSeries(warAndPolitics.results);
      })
      .catch(err => {
        console.log(err);
      })
    }, []);

    return (
        <div id="series" className="w-full h-full font-main p-2 relative">
            <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:px-4 md:px-10 relative w-full h-full overflow-x-hidden">
                <CarouselElement title="Popular" movies={popularSeries} />
                <CarouselElement title="Airing today" movies={airingTodaySeries} />
                <CarouselElement title="Comedy" movies={comedySeries} />
                <CarouselElement title="Reality" movies={realitySeries} />
                <CarouselElement title="Documentary" movies={documentarySeries} />
                <CarouselElement title="Sci-fi and Fantasy" movies={scienceAndFantasySeries} />
                <CarouselElement title="War and Politics" movies={warAndPoliticsSeries} />
            </div>
        </div>
    )
}

export default Series;