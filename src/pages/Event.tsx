import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Events from './pages/Events';
import Cygnus from './pages/Cygnus';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-deep-space relative">
        {/* Full-screen video background */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://motionbgs.com/media/1097/venator-and-kamino.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/cygnus" element={<Cygnus />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;