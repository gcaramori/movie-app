import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import MovieDetails from './routes/MovieDetails';
import PasswordRecovery from './routes/PasswordRecovery';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { currentRoute } = useContext(RouteContext);
  
  const handleResize = () => {
    if (window.innerWidth <= 650) {
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
        <BrowserRouter basename='/'>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password_recovery" element={<PasswordRecovery />} />
          </Routes>
        </BrowserRouter>
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
      <div className="base:ml-0 md:ml-[15rem]">
        <BrowserRouter basename='/'>
          <Routes>
            <Route index element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/my_list" element={<MyList />} />
            <Route path="/movie/details/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
