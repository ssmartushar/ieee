import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Events from './pages/Events';
import Cygnus from './pages/Cygnus';

function App() {
  // Global ghost-click suppression: ignore synthetic clicks shortly after touch
  const lastTouchEndRef = useRef<number>(0);
  useEffect(() => {
    const onTouchEnd = () => {
      lastTouchEndRef.current = Date.now();
    };
    const onClickCapture = (e: MouseEvent) => {
      if (Date.now() - lastTouchEndRef.current < 700) {
        e.preventDefault();
        // @ts-ignore
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        e.stopPropagation();
      }
    };
    document.addEventListener('touchend', onTouchEnd, true);
    document.addEventListener('click', onClickCapture, true);
    return () => {
      document.removeEventListener('touchend', onTouchEnd, true);
      document.removeEventListener('click', onClickCapture, true);
    };
  }, []);
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
            className="w-full h-full object-cover"
          >
            <source src="/assets/starwarsvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Cygnus />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/cygnus" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;