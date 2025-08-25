import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trophy, Code, Zap, Brain, Gamepad2, ExternalLink, Star, ChevronRight, X, Mail, Phone } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
const MagicBento = React.lazy(() => import('../components/MagicBento'));
import LightsaberCursor from '../components/LightsaberCursor';
import SEO from '../components/SEO';

interface CygnusEvent {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  currentParticipants: number;
  prizes: string[];
  requirements: string[];
  registrationLink: string;
  color: string;
  iconColor: string;
}

const Cygnus: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // <-- Add modal state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Event date - set to a future date
  const eventDate = new Date('2025-09-12T09:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pastEventImages = [
    '/assets/IMG-20250613-WA0009.jpg',
    '/assets/IMG-20250613-WA0010.jpg',
    '/assets/IMG-20250613-WA0011.jpg',
    '/assets/IMG-20250613-WA0012.jpg',
    '/assets/IMG-20250613-WA0013.jpg',
    '/assets/IMG-20250613-WA0014.jpg',
    '/assets/IMG-20250613-WA0015.jpg',
    '/assets/IMG-20250613-WA0016.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [saberColor, setSaberColor] = useState<string>('#ff2a2a');
  const [saberLength, setSaberLength] = useState<number>(100);
  const [saberThickness, setSaberThickness] = useState<number>(8);
  const [controlsOpen, setControlsOpen] = useState<boolean>(false);

  // Safe-tap: ignore accidental touch clicks during scroll on mobile
  const useSafeTap = (onActivate: () => void) => {
    const startX = React.useRef(0);
    const startY = React.useRef(0);
    const moved = React.useRef(false);
    const isTouch = React.useRef(false);
    const lastTouchTime = React.useRef(0);

    const onPointerDown = (e: React.PointerEvent) => {
      isTouch.current = e.pointerType === 'touch';
      if (!isTouch.current) return;
      moved.current = false;
      startX.current = e.clientX;
      startY.current = e.clientY;
    };

    const onPointerMove = (e: React.PointerEvent) => {
      if (!isTouch.current) return;
      const dx = Math.abs(e.clientX - startX.current);
      const dy = Math.abs(e.clientY - startY.current);
      if (dx > 10 || dy > 10) moved.current = true;
    };

    const onPointerUp = (e: React.PointerEvent) => {
      if (!isTouch.current) return;
      if (moved.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // It's a deliberate tap
      lastTouchTime.current = Date.now();
      e.preventDefault();
      e.stopPropagation();
      onActivate();
    };

    const onClick = (e: React.MouseEvent) => {
      // Ignore the synthetic click that follows touch
      const now = Date.now();
      if (now - lastTouchTime.current < 700) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      // If not from touch, treat as mouse/keyboard click
      onActivate();
    };

    return { onPointerDown, onPointerMove, onPointerUp, onClick };
  };

  useEffect(() => {
    const slideshowTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pastEventImages.length);
    }, 3000);
    return () => clearInterval(slideshowTimer);
  }, [pastEventImages.length]);

  // Persist and restore saber settings
  useEffect(() => {
    try {
      const savedColor = localStorage.getItem('cygnus_saber_color');
      const savedLen = localStorage.getItem('cygnus_saber_length');
      const savedThk = localStorage.getItem('cygnus_saber_thickness');
      if (savedColor) setSaberColor(savedColor);
      if (savedLen) setSaberLength(Math.max(40, Math.min(220, parseInt(savedLen))));
      if (savedThk) setSaberThickness(Math.max(3, Math.min(20, parseInt(savedThk))));
    } catch { }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('cygnus_saber_color', saberColor); } catch { }
  }, [saberColor]);
  useEffect(() => {
    try { localStorage.setItem('cygnus_saber_length', String(saberLength)); } catch { }
  }, [saberLength]);
  useEffect(() => {
    try { localStorage.setItem('cygnus_saber_thickness', String(saberThickness)); } catch { }
  }, [saberThickness]);

  return (
    <>
      <SEO
        title="Cygnus — Annual Tech Symposium | IEEE CS GHRCE"
        description="Cygnus: a premier 2-day hackathon and tech fest by IEEE CS GHRCE. Workshops, talks, competitions, and more."
        path="/cygnus"
        image="/assets/unnamed.png"
      />
      <div className="pt-8 sm:pt-16 min-h-screen bg-black overflow-x-hidden relative">
        {/* Register Modal */}
        <AnimatePresence>
          {showRegisterModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[2147483647] px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#191919] border border-yellow-400/50 rounded-lg p-6 sm:p-8 text-center shadow-2xl max-w-sm w-full"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4">Register for Cygnus</h3>
                <p className="text-white/80 mb-6 text-sm sm:text-base">
                  Please confirm that you wish to proceed to registration.<br />
                  <span className="block mt-2 text-yellow-300 font-semibold">Terms and conditions apply.</span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">
                  <button
                    onPointerDown={e => {
                      // Only handle touch on mobile
                      if (e.pointerType === 'touch') {
                        setShowRegisterModal(false);
                      }
                    }}
                    onClick={() => setShowRegisterModal(false)}
                    className="bg-black border border-yellow-400/40 text-yellow-300 px-5 py-2 rounded-full font-semibold shadow hover:bg-yellow-900/30 hover:text-yellow-200 transition-all duration-200 w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    onPointerDown={e => {
                      if (e.pointerType === 'touch') {
                        window.open('https://docs.google.com/forms/d/e/1FAIpQLSdQkCt6Y5xWZQ3BWE7o9ZdR4-0Dl7hKjhDU9qtQdz1BR0CNuw/viewform', '_blank');
                        setShowRegisterModal(false);
                      }
                    }}
                    onClick={e => {
                      window.open('https://docs.google.com/forms/d/e/1FAIpQLSdQkCt6Y5xWZQ3BWE7o9ZdR4-0Dl7hKjhDU9qtQdz1BR0CNuw/viewform', '_blank');
                      setShowRegisterModal(false);
                    }}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-black px-5 py-2 rounded-full font-semibold shadow hover:from-yellow-500 hover:to-yellow-700 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner glow overlay matching saber color */}
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background: `
            /* Corners */
            radial-gradient(32vw 32vw at 0% 0%, ${saberColor}22, transparent 65%),
            radial-gradient(32vw 32vw at 100% 0%, ${saberColor}22, transparent 65%),
            radial-gradient(32vw 32vw at 0% 100%, ${saberColor}22, transparent 65%),
            radial-gradient(32vw 32vw at 100% 100%, ${saberColor}22, transparent 65%),
            /* Mid patches */
            radial-gradient(20vw 20vw at 15% 30%, ${saberColor}18, transparent 70%),
            radial-gradient(24vw 24vw at 85% 25%, ${saberColor}1a, transparent 70%),
            radial-gradient(18vw 18vw at 25% 75%, ${saberColor}14, transparent 70%),
            radial-gradient(22vw 22vw at 75% 70%, ${saberColor}16, transparent 70%),
            radial-gradient(28vw 28vw at 50% 10%, ${saberColor}12, transparent 75%),
            radial-gradient(28vw 28vw at 50% 90%, ${saberColor}12, transparent 75%),
            /* Soft center wash */
            radial-gradient(60vw 60vw at 50% 50%, ${saberColor}0d, transparent 80%),
            /* Edge glows */
            linear-gradient(to bottom, ${saberColor}12, transparent 20%),
            linear-gradient(to top, ${saberColor}12, transparent 20%),
            linear-gradient(to right, ${saberColor}12, transparent 20%),
            linear-gradient(to left, ${saberColor}12, transparent 20%)
          `,
            zIndex: 2147483645,
          }}
        />

        {/* Lightsaber cursor, color follows selection */}
        <LightsaberCursor color={saberColor} bladeLength={saberLength} thickness={saberThickness} glow={22} hideNative={true} />

        {/* Controls Toggle + Sidebar */}
        <motion.button
          onClick={() => setControlsOpen(v => !v)}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="fixed top-1/2 -translate-y-1/2 left-2 z-[2147483647] bg-black/70 border border-yellow-400/30 text-yellow-300 hover:text-yellow-200 rounded-full w-9 h-9 flex items-center justify-center shadow-lg backdrop-blur"
          aria-label={controlsOpen ? 'Close controls' : 'Open controls'}
        >
          <motion.div animate={{ rotate: controlsOpen ? 180 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <motion.div
          className="fixed top-1/2 -translate-y-1/2 left-0 z-[2147483647]"
          initial={false}
          animate={{ x: controlsOpen ? 0 : '-110%', opacity: controlsOpen ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          style={{ pointerEvents: controlsOpen ? 'auto' : 'none' }}
          onMouseEnter={() => {
            // cancel pending auto-hide
            // @ts-ignore
            if ((window as any).__cygnusSidebarTimer) clearTimeout((window as any).__cygnusSidebarTimer);
          }}
          onPointerMove={() => {
            // keep it open while interacting
            // @ts-ignore
            if ((window as any).__cygnusSidebarTimer) clearTimeout((window as any).__cygnusSidebarTimer);
          }}
          onMouseLeave={() => {
            // start 3s auto-hide if the cursor leaves the sidebar area
            // @ts-ignore
            if ((window as any).__cygnusSidebarTimer) clearTimeout((window as any).__cygnusSidebarTimer);
            // @ts-ignore
            (window as any).__cygnusSidebarTimer = window.setTimeout(() => {
              setControlsOpen(false);
            }, 3000);
          }}
        >
          <div className="relative bg-black/80 border border-yellow-400/30 backdrop-blur-xl rounded-r-2xl px-4 py-5 shadow-2xl w-56">
            {controlsOpen && (
              <button
                onClick={() => setControlsOpen(false)}
                className="absolute -right-3 -top-3 w-7 h-7 rounded-full bg-black/80 border border-yellow-400/30 text-yellow-300 hover:text-yellow-200 shadow flex items-center justify-center"
                aria-label="Close controls"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="text-xs uppercase tracking-widest text-yellow-300/80 mb-3">Lightsaber</div>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {[
                { c: '#ff2a2a', name: 'Sith Red' },
                { c: '#2a6cff', name: 'Jedi Blue' },
                { c: '#22c55e', name: 'Jedi Green' },
                { c: '#a855f7', name: 'Mace Purple' },
                { c: '#fde047', name: 'Yellow' },
                { c: '#ffffff', name: 'White' },
              ].map((opt) => (
                <button
                  key={opt.c}
                  aria-label={opt.name}
                  title={opt.name}
                  onClick={() => setSaberColor(opt.c)}
                  className={`h-6 rounded-md ring-1 transition-transform hover:scale-110 ${saberColor === opt.c ? 'ring-yellow-400' : 'ring-white/20'}`}
                  style={{ background: opt.c }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-[11px] text-white/70 mb-1">
                  <span>Length</span>
                  <span>{saberLength}px</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={220}
                  step={2}
                  value={saberLength}
                  onChange={(e) => setSaberLength(parseInt(e.target.value))}
                  className="w-full accent-yellow-400 h-1.5 rounded-lg bg-white/10"
                />
              </div>
              <div>
                <div className="flex items-center justify-between text-[11px] text-white/70 mb-1">
                  <span>Thickness</span>
                  <span>{saberThickness}px</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={20}
                  step={1}
                  value={saberThickness}
                  onChange={(e) => setSaberThickness(parseInt(e.target.value))}
                  className="w-full accent-yellow-400 h-1.5 rounded-lg bg-white/10"
                />
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3 text-[11px] text-white/50">
              Settings persist automatically
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#191919] border border-[#ffd300]/50 rounded-lg p-6 sm:p-8 text-center shadow-2xl shadow-[#ffd300]/20 max-w-sm w-full"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#ffd300] mb-4">Coming Soon!</h3>
                <p className="text-white/80 mb-6 text-sm sm:text-base">Registration will open shortly. Stay tuned, rebel!</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gradient-to-r from-[#ffd300] to-[#ff8c00] text-[#191919] px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-[#ffd300]/30 hover:scale-105 transition-all duration-300"
                >
                  Got It
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-8 px-4"
        >
          <img
            src="/assets/unnamed.webp"
            alt="Cygnus Rebellion"
            loading="lazy"
            width="1200"
            height="400"
            className="rounded-2xl shadow-2xl mx-auto w-full max-w-4xl h-auto"
          />
        </motion.div>

        {/* Hero Section */}
        <section className="relative z-10 py-10 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-tight">
                  CYGNUS
                </h1>
              </div>
              <p className="text-lg sm:text-2xl md:text-3xl text-yellow-200 mb-3 sm:mb-4 px-2">
                Cygnus- a tech saga across the stars
              </p>
              <p className="text-sm sm:text-lg text-white/70 max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
                "In a galaxy not so far away, a signal has echoed across the stars... CYGNUS has returned."
              </p>

              {/* Countdown Timer */}
              <div className="mb-8 sm:mb-12">
                <p className="text-base sm:text-lg text-white/70 mb-3 sm:mb-4">Premiers in</p>
                <div className="inline-block border border-white/30 px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 bg-black/20 mx-2">
                  <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-thin text-white tracking-wide sm:tracking-wide md:tracking-widest">
                    <span className="min-w-[1.1em] sm:min-w-[1.1em] md:min-w-[1.2em] text-center">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span>:</span>
                    <span className="min-w-[1.1em] sm:min-w-[1.1em] md:min-w-[1.2em] text-center">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span>:</span>
                    <span className="min-w-[1.1em] sm:min-w-[1.1em] md:min-w-[1.2em] text-center">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span>:</span>
                    <span className="min-w-[1.1em] sm:min-w-[1.1em] md:min-w-[1.2em] text-center">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-3 sm:mt-3 md:mt-4 text-xs uppercase text-white/60 tracking-wide sm:tracking-widest">
                  <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-sm sm:max-w-md px-3 sm:px-4">
                    <span className="text-center text-xs">Days</span>
                    <span className="text-center text-xs">Hours</span>
                    <span className="text-center text-xs">Minutes</span>
                    <span className="text-center text-xs">Seconds</span>
                  </div>
                </div>
              </div>

              {/* Early Bird Discount Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-8 sm:mb-12"
              >
                <div className="inline-block border border-w rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white mr-2 animate-pulse" />
                      <span className="text-white font-bold text-sm sm:text-base uppercase tracking-wide">Early Bird Special</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      <span className="text-white line-through text-lg sm:text-xl mr-2">₹200</span>
                      <span className="text-yellow-400">₹150</span>
                    </p>
                    <p className="text-xs sm:text-sm text-white/70">
                      Save 25% • For First 100 participants
                    </p>
                  </div>
                </div>
              </motion.div>

              {(() => {
                const safeTap = useSafeTap(() => setShowRegisterModal(true));
                return (
                  <motion.button
                    {...safeTap}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full border-2 border-yellow-400 shadow-lg transition-all duration-300 text-base sm:text-lg inline-flex items-center mx-4"
                  >
                    Register Now
                    <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                );
              })()}

            </motion.div>
          </div>
        </section>


        {/* About Cygnus Section */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto  glass-card bg-transparent-black p-6 sm:p-8 md:p-12 rounded-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-bold text-white mb-8 sm:mb-12 text-center"
            >
              The Cygnus Experience
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* About Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-black/20 rounded-lg p-4 sm:p-6"
              >
                <div className="flex items-start sm:items-center mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">About Us</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  IEEE CS SBC - GHRCE is a vibrant Student Branch Chapter driving social impact via computer science and emerging tech, nurturing technical skills and leadership through workshops, seminars, and events.
                </p>
              </motion.div>

              {/* What is Cygnus? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-black/20 rounded-lg p-4 sm:p-6"
              >
                <div className="flex items-start sm:items-center mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">What is Cygnus?</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Cygnus is a premier 2-day hackathon where the brightest minds converge to build, innovate, and create solutions to real-world problems. Beyond a fest, it’s an intergalactic journey — hackathons, hands-on workshops, speaker sessions, competitions, and career tracks — where ideas shine like stars, teamwork is the force, and technology leads to new horizons.
                </p>
              </motion.div>


              {/* Who can join? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-black/20 rounded-lg p-4 sm:p-6"
              >
                <div className="flex items-start sm:items-center mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">Who Can Join?</h3>
                </div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  Whether you're a seasoned coder or a budding enthusiast, Cygnus welcomes all students with a passion for technology and problem-solving. Join us for an unforgettable weekend of hacking and learning.
                </p>
              </motion.div>

              {/* What to expect? */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="bg-black/20 rounded-lg p-4 sm:p-6"
              >
                <div className="flex items-start sm:items-center mb-4">
                  <div className="p-2 bg-yellow-500/20 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">What to Expect?</h3>
                </div>
                <ul className="text-sm sm:text-base text-white/80 leading-relaxed list-disc pl-5 space-y-1">
                  <li>Hands‑on Workshops & Hackathon — build, code, and create in immersive sessions</li>
                  <li>Tech Talks & Keynotes — learn from innovators, leaders, and visionaries</li>
                  <li>Competitions & Games — solve problems and spark imagination</li>
                  <li>Career Fair & Clinics — meet recruiters and refine your profile</li>
                  <li>Panels & Learning Tracks — explore cutting‑edge trends with guidance</li>
                  <li>Swags & Giveaways — take home memories and mementos</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Card Highlights (hidden on mobile to prevent scroll blocking) */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 hidden md:block">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-white"
            >
              Explore Cygnus
            </motion.h2>

            <div className="h-[650px] sm:h-[780px] w-full">
              <ScrollStack>
                <ScrollStackItem>
                  <div className="bg-gradient-to-br from-yellow-600/60 to-yellow-800/60 border border-yellow-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 h-full flex flex-col justify-center backdrop-blur-sm">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-yellow-500/40 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Code className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">6-Hour Hackathon</h3>
                    </div>
                    <p className="text-white/90 text-sm sm:text-lg leading-relaxed flex-1">
                      Immerse yourself in an intensive 6-hour coding marathon where innovation meets execution.
                      Build groundbreaking solutions that could change the world.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center text-yellow-400 flex-shrink-0">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm">6 Hours of Pure Innovation</span>
                    </div>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-blue-500 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-blue-900" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">₹25,000+ Prize Pool</h3>
                    </div>
                    <p className="text-white text-sm sm:text-lg leading-relaxed flex-1">
                      Compete for an impressive prize pool worth over ₹25,000.
                      Your innovative ideas could earn you recognition and rewards.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center text-blue-200 flex-shrink-0">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm">Multiple Prize Categories</span>
                    </div>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 border border-purple-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-purple-500 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-900" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">500+ Participants</h3>
                    </div>
                    <p className="text-white text-sm sm:text-lg leading-relaxed flex-1">
                      Join a community of 500+ brilliant minds from across the region.
                      Network, collaborate, and learn from fellow tech enthusiasts.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center text-purple-200 flex-shrink-0">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm">Collaborative Learning Environment</span>
                    </div>
                  </div>
                </ScrollStackItem>

                <ScrollStackItem>
                  <div className="bg-gradient-to-br from-teal-600 to-teal-800 border border-teal-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-teal-500 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-teal-900" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">Exciting Quiz Challenge</h3>
                    </div>
                    <p className="text-white text-sm sm:text-lg leading-relaxed flex-1">
                      Put your knowledge to the test in a thrilling quiz designed to challenge your wit and speed. 
                      From tech trivia to problem-solving, every question pushes you closer to glory.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center text-teal-200 flex-shrink-0">
                      <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm">Fun, Fast & Full of Surprises</span>
                    </div>
                  </div>
                </ScrollStackItem>


                <ScrollStackItem>
                  <div className="bg-gradient-to-br from-green-600 to-green-800 border border-green-400 rounded-2xl sm:rounded-3xl p-4 sm:p-8 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-green-500 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                        <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-900" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">Expert Mentorship</h3>
                    </div>
                    <p className="text-white text-sm sm:text-lg leading-relaxed flex-1">
                      Get guidance from industry experts and seasoned professionals.
                      Learn cutting-edge technologies and best practices.
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center text-green-200 flex-shrink-0">
                      <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="text-xs sm:text-sm">Hands-on Workshops & Sessions</span>
                    </div>
                  </div>
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </section>

        {/* Magic Bento: Deep-dive content (reveals on hover) */}
        <section className="relative z-10 py-6 sm:py-14 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-xl sm:text-3xl font-semibold text-white mb-4 sm:mb-8 text-center"
            >
              Learn More — Hover to Reveal
            </motion.h3>
            <div className="w-full flex justify-center">
              <React.Suspense fallback={<div>Loading...</div>}>
                <MagicBento
                  enableTilt={false}
                  enableMagnetism={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  glowColor="255, 211, 0"
                  items={[
                    {
                      label: 'Goal',
                      title: 'Goals of Cygnus',
                      description:
                        'Facilitate meaningful networking between students, industry professionals, peers, and mentors to build lasting relationships; and promote practical learning through hands‑on activities and real‑world challenges that bridge theory with application.',
                      color: '#0a0f12'
                    },
                    {
                      label: 'Our Mission',
                      title: 'Our Mission',
                      description:
                        'Build a collaborative ecosystem for students, professionals, and enthusiasts to exchange ideas, inspire innovation, and grow together.',
                      color: '#0a0f12'
                    },
                    {
                      label: 'Bridge the Gap',
                      title: 'Academia ↔ Industry',
                      description:
                        'Industry experts, real challenges, and practical exposure ensure concepts are applied meaningfully, preparing participants to transition smoothly from classroom learning to industry expectations.',
                      color: '#0a0f12'
                    },
                    {
                      label: 'Empowerment',
                      title: 'Beyond Theory',
                      description:
                        'Workshops, hackathons, and guided tracks build practical skills, sharpen problem‑solving, and grow confidence—empowering you to ship ideas and lead teams.',
                      color: '#0a0f12'
                    },
                    {
                      label: 'Impact',
                      title: 'Community Impact',
                      description:
                        'Boost engagement and exposure by amplifying hackathon participation and elevating awareness of IEEE CS programs and benefits; nurture lasting confidence so the experience inspires growth long after the lights dim.',
                      color: '#0a0f10'
                    },
                    {
                      label: 'Elevate',
                      title: 'Elevate Highlights',
                      description:
                        'A power‑packed Elevate experience—real challenges, expert mentors, quizzes, sessions, late‑night jamming, and goodies—made 2024 unforgettable and enriching with sharpened skills, stronger networks, and vibrant community energy.',
                      color: '#0b0b12'
                    },
                  ]}
                />
              </React.Suspense>
            </div>
          </div>
        </section>

        {/* Community Partners Section */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-900/20 to-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                Join Our Galactic Alliance
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto mb-8 sm:mb-10">
                Partner with us to empower the next generation of innovators. As a community partner,
                you'll be at the forefront of technological advancement and talent discovery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-stretch">
              {/* Community Partner CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm h-full pointer-events-none">
                  <div className="mb-6">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className="p-3 bg-purple-500/30 rounded-full mr-3">
                        <Star className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Become a Partner</h3>
                    </div>
                    <p className="text-white/70 mb-6 text-sm sm:text-base">
                      Join leading organizations in supporting the next generation of tech innovators.
                      Let's build the future together.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(() => {
                      const safeTap = useSafeTap(() => window.open('https://forms.gle/5shPMTYTw9YFtsxg8', '_blank'));
                      return (
                        <motion.button
                          {...safeTap}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full border-2 border-purple-400 shadow-lg transition-all duration-300 text-base sm:text-lg inline-flex items-center justify-center pointer-events-auto"
                        >
                          Join as Community Partner
                          <ExternalLink className="ml-2 w-5 h-5" />
                        </motion.button>
                      );
                    })()}

                    <p className="text-purple-300/60 text-xs sm:text-sm text-center">
                      Partnership packages starting from ₹5,000
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Sponsors CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border border-yellow-400/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm h-full pointer-events-none">
                  <div className="mb-6">
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <div className="p-3 bg-yellow-500/30 rounded-full mr-3">
                        <Trophy className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">Become a Sponsor</h3>
                    </div>
                    <p className="text-white/70 mb-6 text-sm sm:text-base">
                      Elevate your brand at one of the region's most exciting hackathons. Get premium visibility,
                      direct engagement with talent, and custom activation opportunities.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(() => {
                      const safeTap = useSafeTap(() => window.open('https://forms.cloud.microsoft/r/eG72ivrGhH', '_blank'));
                      return (
                        <motion.button
                          {...safeTap}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-full border-2 border-yellow-400 shadow-lg transition-all duration-300 text-base sm:text-lg inline-flex items-center justify-center pointer-events-auto"
                        >
                          Join as Sponsor
                          <ExternalLink className="ml-2 w-5 h-5" />
                        </motion.button>
                      );
                    })()}

                    <p className="text-yellow-300/70 text-xs sm:text-sm text-center">
                      Sponsorship starts from ₹25,000 • Custom tiers available
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Partnership Benefits (below both cards) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-14 sm:mt-16"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center tracking-wide">
                Partnership Benefits
              </h3>

              <div className="rounded-3xl border border-yellow-400/20 bg-black/30 backdrop-blur-sm p-5 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Users className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Talent Discovery</h4>
                      <p className="text-white/70 text-sm">Connect with 500+ bright participants; shortlist for internships and full-time roles.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Premium Visibility</h4>
                      <p className="text-white/70 text-sm">Logo on website, stage, merch, and social promos reaching thousands.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Stage Time</h4>
                      <p className="text-white/70 text-sm">Keynote or lightning talks to present your mission, products, and roles.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Brain className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Mentor Access</h4>
                      <p className="text-white/70 text-sm">Engage as judges or mentors and directly influence problem statements.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Code className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Product Adoption</h4>
                      <p className="text-white/70 text-sm">Run API/SDK tracks, distribute credits, and drive developer adoption.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Sponsored Prizes</h4>
                      <p className="text-white/70 text-sm">Sponsor special awards to spotlight your tech and attract top submissions.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Campus Outreach</h4>
                      <p className="text-white/70 text-sm">Access student chapters and post-event mailing for continued engagement.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Gamepad2 className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Gaming and Esports</h4>
                      <p className="text-white/70 text-sm">Host gaming tournaments, showcase your gaming products, and engage with the gaming community.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rounded-2xl p-5 sm:p-6 border border-yellow-400/20 bg-black/40 hover:bg-black/50 transition-colors">
                    <div className="p-2.5 bg-yellow-500/10 rounded-xl flex-shrink-0 mt-1">
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1">Innovation Challenges</h4>
                      <p className="text-white/70 text-sm">Host innovation challenges, hackathons, or ideathons to drive innovation and solve real-world problems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-14 text-yellow-400 tracking-wide"
            >
              Contact <span className="text-white">Us</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {/* Chapter Chair */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center bg-gradient-to-br from-yellow-700/70 to-yellow-900/80 border border-yellow-400/30 rounded-2xl p-5 sm:p-7 shadow-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1">Chapter Chair</div>
                  <div className="text-yellow-300 font-semibold mb-1">Bharat Jambhulkar</div>
                  <div className="flex items-center text-white/80 text-sm mb-1">
                    <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                    <a href="mailto:bharatjambhulkar358@gmail.com" className="hover:underline">
                      bharatjambhulkar358@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                    <a href="tel:+919168675745" className="hover:underline">
                      +91 9168675745
                    </a>
                  </div>
                </div>
              </motion.div>
              {/* Vice Chair */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-center bg-gradient-to-br from-purple-700/70 to-purple-900/80 border border-purple-400/30 rounded-2xl p-5 sm:p-7 shadow-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <Users className="w-8 h-8 text-purple-300" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1">Vice Chair</div>
                  <div className="text-purple-200 font-semibold mb-1">Vaibhavi Mangrulkar</div>
                  <div className="flex items-center text-white/80 text-sm mb-1">
                    <Mail className="w-4 h-4 mr-2 text-purple-300" />
                    <a href="mailto:vaibhavimangrulkar00@gmail.com" className="hover:underline">
                      vaibhavimangrulkar00@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <Phone className="w-4 h-4 mr-2 text-purple-300" />
                    <a href="tel:+918767886827" className="hover:underline">
                      +91 8767886827
                    </a>
                  </div>
                </div>
              </motion.div>
              {/* Secretary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-center bg-gradient-to-br from-teal-700/70 to-teal-900/80 border border-teal-400/30 rounded-2xl p-5 sm:p-7 shadow-lg"
              >
                <div className="flex-shrink-0 mr-4">
                  <Users className="w-8 h-8 text-teal-300" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg mb-1">Secretary</div>
                  <div className="text-teal-200 font-semibold mb-1">Rutuja Langde</div>
                  <div className="flex items-center text-white/80 text-sm mb-1">
                    <Mail className="w-4 h-4 mr-2 text-teal-300" />
                    <a href="mailto:rulangde@gmail.com" className="hover:underline">
                      rulangde@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <Phone className="w-4 h-4 mr-2 text-teal-300" />
                    <a href="tel:+919699101120" className="hover:underline">
                      +91 9699101120
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-8">
              <a
                href="https://www.linkedin.com/company/ieee-computer-society-ghrce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
              >
                <svg width="22" height="22" fill="currentColor" className="text-blue-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.594v5.602z"/></svg>
                <span className="text-sm font-medium">ieee-computer-society-ghrce</span>
              </a>
              <a
                href="mailto:ieeecs@raisoni.net"
                className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
              >
                <Mail className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium">ieeecs@raisoni.net</span>
              </a>
              <a
                href="https://www.ieeecsghrce.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
              >
                <ExternalLink className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">ieeecsghrce.in</span>
              </a>
              <a
                href="https://www.instagram.com/ieee_cs_ghrce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-yellow-400 transition"
              >
                <svg width="22" height="22" fill="currentColor" className="text-pink-400" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.309.975.975 1.247 2.242 1.309 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.309 3.608-.975.975-2.242 1.247-3.608 1.309-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.309-.975-.975-1.247-2.242-1.309-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.309-3.608.975-.975 2.242-1.247 3.608-1.309 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.266-.058-1.646-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </div>
          </div>
        </section>

        {/* Past Event Glimpses */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-white"
            >
              Past Event Glimpses
            </motion.h2>

            <div className="relative w-full max-w-4xl mx-auto h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl border-2 border-yellow-400/30">
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={pastEventImages[currentImageIndex]}
                  alt={`Past Event Image ${currentImageIndex + 1}`}
                  loading="lazy"
                  width="800"
                  height="400"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full h-full object-contain bg-black/20"
                />
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Event Info Section */}
        <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-yellow-900/20 to-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center group p-4 sm:p-6 bg-black/20 rounded-xl sm:bg-transparent sm:p-0"
              >
                <div className="relative mb-4">
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white/30 fill-current absolute -top-1 -right-1 sm:-top-2 sm:-right-2 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Cosmic Venue</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  G.H. Raisoni College of Engineering<br />
                  Nagpur, Maharashtra
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center group p-4 sm:p-6 bg-black/20 rounded-xl sm:bg-transparent sm:p-0"
              >
                <div className="relative mb-4">
                  <Users className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white/30 fill-current absolute -top-1 -right-1 sm:-top-2 sm:-right-2 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Star Navigators</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  500+ Past Participants<br />
                  A 2-Day Extravaganza
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center group p-4 sm:p-6 bg-black/20 rounded-xl sm:bg-transparent sm:p-0 sm:col-span-2 lg:col-span-1"
              >
                <div className="relative mb-4">
                  <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-3 sm:mb-4" />
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white/30 fill-current absolute -top-1 -right-1 sm:-top-2 sm:-right-2 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Galactic Rewards</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  Prize Pool of over ₹10,000
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 bg-black">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm sm:text-base text-white/70 mb-4">
              &copy; {new Date().getFullYear()} IEEE CS SBC GHRCE. All rights reserved.
            </p>
            <p className="text-sm sm:text-base text-white/70">
              Terms and conditions apply.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a
                href="https://www.linkedin.com/company/ieee-computer-society-ghrce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-yellow-400 transition"
              >
                LinkedIn
              </a>
              <a
                href="mailto:ieeecs@raisoni.net"
                className="text-white/70 hover:text-yellow-400 transition"
              >
                Email
              </a>
              <a
                href="https://www.ieeecsghrce.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-yellow-400 transition"
              >
                Website
              </a>
              <a
                href="https://www.instagram.com/ieee_cs_ghrce"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-yellow-400 transition"
              >
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Cygnus;