import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from './routes/Navbar';
import Sidebar from './routes/Sidebar';
import Movies from './routes/Movies';
import Series from './routes/Series';
import TvShows from './routes/TvShows';
import MovieDetails from './routes/MovieDetails';
import '@fontsource/quicksand';
import PasswordRecovery from './routes/PasswordRecovery';

function App() {
  const { currentUser } = useContext(UserContext);

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
      <Navbar />
      <Sidebar />
      <div className="block ml-[15rem]">
        <Routes>
          <Route index element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/tv_shows" element={<TvShows />} />
          <Route path="/movie" element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
