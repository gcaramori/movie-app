import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from './routes/Navbar';
import Sidebar from './routes/Sidebar';
import Home from './routes/Home';
import Movies from './routes/Movies';
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
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
