import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useSWR from 'swr';
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";
import Spinner from "../components/spinner";

const Categories = () => {
    const navigate = useNavigate();
    const fetcher = (...args) => fetch(...args).then(res => res.json());

    const categoriesResponse = useSWR(`https://api.themoviedb.org/3/genre/movie/list?api_key=34148456b4f3b196a104527b50e6d0cf`, fetcher);
    
    return (
        <div id="categories" className="w-full h-full font-main m-0 md:py-8 xl:py-12 md:px-6 xl:px-12 relative">
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
                            <h1 id="categoriesTitle" className="base:text-3xl xl:text-4xl text-white font-bold base:mb-1 md:mb-3 drop-shadow-md base:text-right md:text-left">
                                Categories
                            </h1>
                            <p className="text-md text-gray-300 drop-shadow-md opacity-80 base:text-right md:text-left">
                                Find movies and tv shows by category
                            </p>
                        </div>
                    </div>
                    <div id="categoriesList" className="block relative">
                        {
                            categoriesResponse.isLoading ? <Spinner />
                            : categoriesResponse.data.genres.map((category, key) => {
                                return (
                                    <div key={key} className="">
                                        {category.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Categories;