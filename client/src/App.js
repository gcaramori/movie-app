import React, { lazy, Suspense, useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { RouteContext } from './contexts/routeContext';
import '@fontsource/quicksand';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from './routes/Navbar';
import Sidebar from './routes/Sidebar';
import Movies from './routes/Movies';
import Series from './routes/Series';
import MyList from './routes/MyList';
import Discover from './routes/Discover';
import PasswordRecovery from './routes/PasswordRecovery';
import Spinner from './components/spinner';
const MovieDetails = lazy(() => import('./routes/MovieDetails'));
const SeriesDetails = lazy(() => import('./routes/SeriesDetails'));
const Categories = lazy(() => import('./routes/Categories'));

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { currentRoute } = useContext(RouteContext);
  
  const handleResize = () => {
    if (window.innerWidth <= 769) {
        setIsMobile(true);
    } else {
        setIsMobile(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  if(!currentUser) {
    return (
      <div id="application">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password_recovery" element={<PasswordRecovery />} />
        </Routes>
      </div>
    )
  }

  return (
    <div id="application">
      {
        (currentRoute === '/' || currentRoute === '/series') ?
          <Navbar />
        : ''
      }
      <Sidebar isMobile={isMobile} />
      <div className="base:ml-0 lg:ml-[15rem]">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route index element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/my_list" element={<MyList />} />
            <Route path="/new" element={<Discover />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/movie/details/:id" element={<MovieDetails isMobile={isMobile} />} />
            <Route path="/tv/details/:id" element={<SeriesDetails isMobile={isMobile} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
