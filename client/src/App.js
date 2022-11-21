import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Navbar from './routes/Navbar';
import Sidebar from './routes/Sidebar';
import Home from './routes/Home';
import Movies from './routes/Movies';
import '@fontsource/quicksand';

function App() {
  const [token, setToken] = useState(false);
  
  if(!token) {
    return (
      <div id="application">
        <Login setToken={setToken} />
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
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
