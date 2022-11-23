import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
      const getMovies = async () => {
        await fetch('https://api.themoviedb.org/3/movie/popular?api_key=34148456b4f3b196a104527b50e6d0cf')
        .then(data => data.json())
        .then(parsedData => {
          console.log(parsedData);
        })
        .catch(err => {
          console.log(err);
        })
      }

      getMovies();
    }, []);

    return (
      <div id="home" className='w-full h-full font-main'>
        {/* <h1 className='text-black text-4xl'></h1> */}
      </div>
    );
}

export default Home;