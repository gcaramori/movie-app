import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { LazyLoadImage } from "react-lazy-load-image-component";

const CarouselElement = ({ title, movies }) =>  {
    const carouselRef = useRef(null);
    const [carouselValue, setCarouselValue] = useState(1);
    const [activeSlide, setActiveSlide] = useState(1);
    
    useEffect(() => {
        carouselRef.current.style.transform = `translateX(${carouselValue}px)`;

        if(document.querySelector("#carousel li") !== null) document.querySelector(`#carousel li[data-number="${activeSlide}"]`).classList.add('active');
    }, [carouselValue, activeSlide]);

    const handlePrev = () => {
        if(activeSlide > 1) document.querySelector('#carousel li.active').classList.remove('active');

        const previousSlide = (activeSlide > 1) ? activeSlide - 1 : 1;
        setActiveSlide(previousSlide);

        if(window.innerWidth > 768) {
            if(carouselValue < 0) setCarouselValue(carouselValue + 250);
        }
        else if(window.innerWidth > 380) {
            if(carouselValue < 0) setCarouselValue(carouselValue + 220);
        }
        else {
            if(carouselValue < 0) setCarouselValue(carouselValue + 180);
        }
    }

    const handleNext = () => {
        if(activeSlide < 20) document.querySelector('#carousel li.active').classList.remove('active');

        const nextSlide = activeSlide < 20 ? activeSlide + 1 : 20;
        setActiveSlide(nextSlide);

        const carouselMaxWidth = window.innerWidth > 380 ? 210 * 20 : 180 * 20;

        if(window.innerWidth > 768) {
            if(Math.abs(carouselValue) <= carouselMaxWidth - (window.innerWidth / 1.3)) setCarouselValue(carouselValue - 250);
        }
        else if(window.innerWidth > 380) {
            if(Math.abs(carouselValue) < carouselMaxWidth - (window.innerWidth / 1.6)) setCarouselValue(carouselValue - 220);
        }
        else {
            if(Math.abs(carouselValue) < carouselMaxWidth - (window.innerWidth / 1.6)) setCarouselValue(carouselValue - 180);
        }
    }
    
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                <div data-id={title.replaceAll(" ", "").toLowerCase()} className="movieCarousel relative w-full mb-10">
                    <h2 className="font-main text-2xl text-gray-100 font-semibold drop-shadow-lg base:max-w-[10rem]">{title}</h2>

                    <div id="carouselControls" className="flex gap-6 w-[100px] absolute top-0 base:right-[-1em] sm:right-0">
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
                                    <li key={key} className={key === 0 ? "carouselItem active transition-all" : "carouselItem transition-all"} data-number={key + 1}>
                                        <Link to={"/movie/details/" + movie.id} className="block relative h-[350px] base:w-[170px] sm:w-[200px] transition-all hover:scale-105">
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
        </>
    );
}

export default CarouselElement;