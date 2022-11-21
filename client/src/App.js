import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Navbar from './routes/Navbar';
import Sidebar from './routes/Sidebar';
import Home from './routes/Home';
import Movies from './routes/Movies';
import Register from './routes/Register';
import '@fontsource/quicksand';

function App() {
  const [route, setRoute] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if(document.cookie !== '' && document.cookie.split('jwtToken=')[1] !== '') setToken(true);
    else setToken(false);
  }, []);
  
  if(token === false) {
    return (
      <div id="application">
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  return (
    <div id="application">
      <Navbar />
      <Sidebar />
      <div className="block ml-[13rem]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
