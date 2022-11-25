import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselElement = ({ title, movies }) =>  {
    return (
        <>
            <h2 className="font-main text-2xl text-gray-100 text-semibold drop-shadow-lg">{title}</h2>
            <Carousel>
                {
                    (movies && movies.length > 0) ? movies.map((movie, key) => {
                        return (
                            <div key={key}>
                                <img src={movie.poster_path} alt="movie_image" />
                                <p className="name">{movie.original_title}</p>
                            </div>
                        )
                    }) : ''
                }
            </Carousel>
        </>
    );
}

export default CarouselElement;