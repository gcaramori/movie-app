import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
    return (
        <ul id="movies" className="flex md:justify-center lg:justify-start items-center h-auto w-full base:gap-2 lg:gap-4 transition-all flex-wrap">
            {
                movies?.map((movie, key) => {
                    return (
                        <li key={key} className={"block relative h-auto base:w-full md:w-[32%] lg:w-[23%] 2xl:w-[18%]"}>
                            <Link to={`/movie/details/${movie.id}`} className="block relative h-full w-full transition-all lg:hover:scale-105">
                                <LazyLoadImage
                                    className="object-contain h-full w-full relative transition-all"
                                    src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                                    height={"100%"}
                                    alt="movie_poster"
                                />
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default MovieList;