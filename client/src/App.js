import { Routes, Route } from 'react-router-dom';
import Navbar from './routes/Navbar';
import Home from './routes/Home';
import Movies from './routes/Movies';

function App() {
  return (
    <div id="application">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
