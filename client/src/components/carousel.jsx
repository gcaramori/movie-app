import { useState, useRef, useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

const CarouselElement = ({ title, movies }) =>  {
    const carouselRef = useRef(null);
    const [carouselValue, setCarouselValue] = useState(1);
    
    useEffect(() => {
        carouselRef.current.style.transform = `translateX(${carouselValue}px)`;
    }, [carouselValue]);

    const handlePrev = () => {
        if(carouselValue < 0) setCarouselValue(carouselValue + 250);
    }

    const handleNext = () => {
        const carouselMaxWidth = 210 * 20;

        if(window.innerWidth > 768) {
            if(Math.abs(carouselValue) <= carouselMaxWidth - (window.innerWidth / 1.3)) setCarouselValue(carouselValue - 250);
        }
        else {
            if(Math.abs(carouselValue) <= carouselMaxWidth - (window.innerWidth / 1.8)) setCarouselValue(carouselValue - 250);
        }
    }

    const Spinner = () => {
        return (
            <div className="h-auto w-auto transition-all animate-spin z-20">
                <ImSpinner2 size="3em" />
            </div>
        );
    }

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <div data-id={title.replaceAll(" ", "").toLowerCase()} className="movieCarousel relative w-full mb-10">
                        <h2 className="font-main text-2xl text-gray-100 font-semibold drop-shadow-lg">{title}</h2>

                        <div id="carouselControls" className="flex gap-6 w-[100px] absolute top-0 right-0">
                            <button type="button" id="prevButton" className="flex justify-center items-center text-white bg-mainRed rounded-full h-8 w-8 border-0 drop-shadow-md transition-all hover:bg-darkGray" disabled={carouselValue === 0 ? true : false} onClick={handlePrev}>
                                <BsChevronLeft size="1.2em" />
                            </button>
                            <button id="nextButton" className="flex justify-center items-center text-white bg-mainRed rounded-full h-8 w-8 border-0 drop-shadow-md transition-all hover:bg-darkGray" onClick={handleNext}>
                                <BsChevronRight size="1.2em" />
                            </button>
                        </div>
                        <ul ref={carouselRef} id="carousel" className="flex justify-start items-center h-[370px] w-full gap-4 transition-all">
                            {
                                (movies && movies.length > 0) ? movies.map((movie, key) => {
                                    return (
                                        <li key={key} className={key === 1 ? "carouselItem active" : "carouselItem"}>
                                            <Link to={"/movie/" + movie.id} className="block relative h-[350px] w-[200px] transition-all hover:scale-105">
                                                <img src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path} alt="movie_image" className="object-contain h-full w-full relative" />
                                            </Link>
                                        </li>
                                    )
                                }) : ''
                            }
                        </ul>
                    </div>
                </motion.div>
            </Suspense>
        </>
    );
}

export default CarouselElement;