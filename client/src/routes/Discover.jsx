import { lazy, Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import CustomSelect from "../components/customSelect";
import Pagination from "../components/pagination";
import Spinner from "../components/spinner";
const MovieList = lazy(() => wait().then(() => import("../components/movieList")));

const wait = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 5000);
    });
}

const Discover = () => {
    const [newInMovies, setNewInMovies] = useState();
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [years, setYears] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        axios.all([
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=34148456b4f3b196a104527b50e6d0cf", {
                cancelToken: cancelToken.token
            }),
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&primary_release_year=${selectedYear}&with_genres=${selectedGenre}&sort_by=popularity.desc&page=${page}`, {
                cancelToken: cancelToken.token
            })
        ])
        .then(axios.spread((genres, movies) => {
            setNewInMovies(movies.data.results);
            
            const genresForSelect = genres?.data?.genres && genres?.data?.genres.map(genre => ({ value: genre.id, label: genre.name }));
            setGenres(genresForSelect);
        }))
        .catch(err => {
            if(axios.isCancel(err)) {
                console.log("Cancelled!");
            }
        });

        setYears(generateYears);

        return () => {
            cancelToken.cancel();
        }
    }, [page, selectedYear, selectedGenre]);

    const handlePagination = (e) => {
        const page = e.currentTarget.getAttribute("data-page");
        
        setPage(parseInt(page));
    }

    const handleGenreSelect = (e) => {
        const genresForSelect = e.map(genre => genre.value);
        setSelectedGenre(genresForSelect.join(","));
    }

    const handleReleaseYearSelect = (e) => {
        setSelectedYear(e.value);
    }

    const generateYears = () => {
        const max = new Date().getFullYear();
        const min = max - 90;
        const years = [];

        for(var i = max; i >= min; i--) {
            years.push({
                value: i,
                label: i
            });
        }

        return years;
    }

    return (
        <div id="discoverMovies" className="w-full h-full font-main m-0 md:py-8 xl:py-12 md:px-6 xl:px-12 relative">
            <button onClick={() => navigate(-1)} className="absolute base:top-4 lg:top-2 2xl:top-4 base:left-[unset] lg:left-6 base:right-2 lg:right-[unset] block h-12 w-12 z-50 text-white">
                <BiArrowBack id="backButton" />
            </button>
            
            <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:pt-14 md:pt-10 lg:pt-4 base:px-6 md:px-0 xl:px-6 relative w-full h-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <div className="relative flex base:flex-col lg:flex-row base:items-end md:items-start justify-between w-full h-full mb-8">
                        <div id="title" className="block relative">
                            <h1 id="seriesTitle" className="base:text-3xl xl:text-4xl text-white font-bold base:mb-1 md:mb-3 drop-shadow-md base:text-right md:text-left">
                                Discover new experiences   
                            </h1>
                            <p className="text-md text-gray-300 drop-shadow-md opacity-80 base:text-right md:text-left">
                                Find awesome new movies or tv shows
                            </p>
                        </div>
                        <div id="filterBar" className="base:relative lg:absolute insetY-0 my-auto base:right-0 lg:right-6 flex justify-start items-center base:mt-4 lg:mt-0">
                            <ul className="flex justify-start items-center gap-4">
                                <li className="block relative">
                                    <CustomSelect
                                        props={{
                                            "placeholder": "Select genres",
                                            "name": "genreOption",
                                            "options": genres,
                                            "isMulti": true,
                                            "onChange": (e) => handleGenreSelect(e)
                                        }}
                                    />
                                </li>
                                <li className="block relative">
                                    <CustomSelect
                                        props={{ 
                                            "placeholder": "Select release year",
                                            "name": "yearsOption",
                                            "options": years,
                                            "isMulti": false,
                                            "onChange": (e) => handleReleaseYearSelect(e)
                                        }}
                                    />
                                </li>
                            </ul>
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
                        <Suspense fallback={<Spinner />}>
                            <MovieList movies={newInMovies} />
                        </Suspense>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Discover;