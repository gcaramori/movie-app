import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import Pagination from "../components/pagination";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import { getCookie } from "../utils/helper";

const LastSeen = () => {
    const [page, setPage] = useState(1);
    const [lastSeenIds, setLastSeenIds] = useState();
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const navigate = useNavigate();

    const movieResponse = useSWR(`https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&page=${page}`, fetcher);
    
    useEffect(() => {
        if(getCookie('lastSeen') !== null) setLastSeenIds(JSON.parse(getCookie('lastSeen')));
    }, []);

    const handlePagination = (e) => {
        const page = e.currentTarget.getAttribute("data-page");
        
        setPage(parseInt(page));
    }

    console.log(lastSeenIds);

    return (
        <div id="discoverMovies" className="w-full h-full font-main m-0 md:py-8 xl:py-12 md:px-6 xl:px-12 relative">
            <button onClick={() => navigate(-1)} className="absolute base:top-4 lg:top-2 2xl:top-4 base:left-[unset] lg:left-6 base:right-2 lg:right-[unset] block h-12 w-12 z-50 text-white">
                <BiArrowBack id="backButton" />
            </button>
            
            <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:pt-14 md:pt-10 xl:pt-4 base:px-6 md:px-0 xl:px-6 relative w-full h-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <div className="relative flex base:flex-col xl:flex-row items-start justify-between w-full h-full mb-8">
                        <div id="title" className="block relative">
                            <h1 id="seriesTitle" className="base:text-3xl xl:text-4xl text-white font-bold base:mb-1 md:mb-3 drop-shadow-md text-left">
                                Last seen
                            </h1>
                            <p className="text-md text-gray-300 drop-shadow-md opacity-80 text-left">
                                See the last movies and tv shows you visited
                            </p>
                        </div>
                    </div>
                    <div id="moviesPagination" className="block relative mb-6">
                        <Pagination 
                            props={{
                                "onClick": (e) => handlePagination(e)
                            }}
                            currentPage={page}
                            pagesLength={10}
                        />
                    </div>
                    <div id="moviesToDiscover" className="block relative">
                        {
                            movieResponse.isLoading ? <Spinner />
                            : <MovieList movies={movieResponse.data.results} />
                        }
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default LastSeen;