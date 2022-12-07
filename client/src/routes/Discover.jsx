import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BiArrowBack } from 'react-icons/bi';

const Discover = () => {
    const [newInMovies, setNewInMovies] = useState();
    const [page, setPage] = useState(1);
    const [genders, setGenders] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=34148456b4f3b196a104527b50e6d0cf&primary_release_year=2022&sort_by=popularity_desc&page=${page}`).then(res => res.json()),
            fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=34148456b4f3b196a104527b50e6d0cf').then(res => res.json()),
        ])
        .then(([movies, genders]) => {
            setNewInMovies(movies.results);
            setGenders(genders.genres);
        })
        .catch(err => {
            console.log(err);
        });
    }, [page]);

    const handlePagination = (e) => {
        const page = e.currentTarget.getAttribute('data-page');
        
        setPage(parseInt(page));
    }
    
    return (
        <div id="seriesDetails" className='w-full h-full font-main md:py-8 xl:py-12 md:px-6 xl:px-12 relative'>
            <button onClick={() => navigate(-1)} className="absolute base:top-4 base:left-[unset] lg:left-6 base:right-3 lg:right-[unset] block h-12 w-12 z-50 text-white">
                <BiArrowBack id="backButton" />
            </button>
            
            <div id="content" className="flex flex-col justify-center items-start mb-4 py-4 base:pt-14 md:pt-10 lg:pt-4 md:px-0 xl:px-10 relative w-full h-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <div className="relative flex base:items-start justify-between w-full h-full mb-8">
                        <div id="title" className="block relative">
                            <h1 id="seriesTitle" className="base:text-3xl xl:text-4xl text-white font-bold base:mb-1 md:mb-3 drop-shadow-md base:text-right md:text-left">
                                Discover new experiences   
                            </h1>
                            <p className="text-md text-gray-300 drop-shadow-md opacity-80">
                                Find awesome new movies or tv shows
                            </p>
                        </div>
                        <div id="filterBar" className="absolute insetY-0 my-auto right-6 flex justify-start items-center">
                            <ul className="flex justify-start items-center gap-4">
                                <li className="block relative">
                                    <select className="block rounded-full bg-mainRed drop-shadow-md text-sm text-white font-semibold py-2 px-3 focus:outline-0 active:outline-0 focus:ring-0 active:ring-0">
                                        <option className="appearance-none p-4 bg-mainRed text-white text-sm border-0" defaultValue={1} selected>Select gender</option>
                                        {
                                            genders?.length > 0 ? genders.map((gender, key) => {
                                                return (
                                                    <option key={key} className="appearance-none p-4 bg-mainRed text-white text-sm border-0 hover:bg-darkGray focus:bg-darkGray active:bg-darkGray" value={gender.id}>
                                                        {gender.name}
                                                    </option>
                                                )
                                            }) : ''
                                        }
                                    </select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="moviesPagination" className="block relative mt-6 mb-1">
                        <ul className="relative flex justify-start items-center gap-6 list-none">
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 1 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="1" onClick={(e) => handlePagination(e)}>
                                    1
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 2 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="2" onClick={(e) => handlePagination(e)}>
                                    2
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 3 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="3" onClick={(e) => handlePagination(e)}>
                                    3
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 4 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="4" onClick={(e) => handlePagination(e)}>
                                    4
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 5 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="5" onClick={(e) => handlePagination(e)}>
                                    5
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 6 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="6" onClick={(e) => handlePagination(e)}>
                                    6
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 7 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="7" onClick={(e) => handlePagination(e)}>
                                    7
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 8 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="8" onClick={(e) => handlePagination(e)}>
                                    8
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 9 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="9" onClick={(e) => handlePagination(e)}>
                                    9
                                </button>
                            </li>
                            <li className="block">
                                <button className={`inline-block text-white font-semibold text-center px-2 rounded-sm border border-mainRed text-md drop-shadow-md ${page === 10 ? 'bg-mainRed' : 'bg-transparent'}`} data-page="10" onClick={(e) => handlePagination(e)}>
                                    10
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div id="moviesToDiscover">
                        <ul id="movies" className="flex justify-start items-center h-auto w-full gap-4 transition-all flex-wrap">
                            {
                                newInMovies?.length > 0 ? newInMovies.map((movie, key) => {
                                    return (
                                        <li key={key} className={key === 0 ? "carouselItem active transition-all" : "carouselItem transition-all"} data-number={key + 1}>
                                            <Link to={`/movie/details/${movie.id}`} className="block relative h-[350px] base:w-[170px] sm:w-[200px] transition-all hover:scale-105">
                                                <LazyLoadImage
                                                    className="object-contain h-full w-full relative transition-all"
                                                    src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}
                                                    height={350}
                                                    alt="movie_poster"
                                                />
                                            </Link>
                                        </li>
                                    )
                                }) : ''
                            }
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Discover;