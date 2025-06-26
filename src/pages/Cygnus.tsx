import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Trophy, Code, Zap, Brain, Gamepad2, ExternalLink, Star } from 'lucide-react';

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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Event date - set to a future date
  const eventDate = new Date('2025-10-18T09:00:00');

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

  useEffect(() => {
    const slideshowTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pastEventImages.length);
    }, 3000);
    return () => clearInterval(slideshowTimer);
  }, [pastEventImages.length]);

  return (
    <div className="pt-8 sm:pt-16 min-h-screen bg-black overflow-x-hidden">

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

            <motion.button
              className="bg-gradient-to-r from-yellow-600 to-yellow-800 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full border-2 border-yellow-400 shadow-lg transition-all duration-300 text-base sm:text-lg inline-flex items-center mx-4"
            >
              Join the Rebellion
              <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-16 px-4"
            >
              <img 
                src="/assets/unnamed.png" 
                alt="Cygnus Rebellion" 
                className="rounded-2xl shadow-2xl mx-auto w-full max-w-4xl h-auto" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Cygnus Section */}
      <section className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-7xl mx-auto glass-card bg-transparent-black p-6 sm:p-8 md:p-12 rounded-3xl">
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
                Cygnus is a premier 2-day hackathon where the brightest minds converge to build, innovate, and create solutions to real-world problems. It's more than just a competition; it's a celebration of creativity, collaboration, and cutting-edge technology.
              </p>
            </motion.div>

            {/* Why be a part of it? */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-black/20 rounded-lg p-4 sm:p-6"
            >
              <div className="flex items-start sm:items-center mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">Why Be a Part of It?</h3>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                To push your limits, expand your network, and be at the forefront of technological innovation. Cygnus offers a unique platform to challenge yourself, learn from peers, and make a tangible impact.
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
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                An unforgettable weekend of hacking, mentorship from industry experts, exciting challenges, and the chance to bring your most ambitious ideas to life. Plus, there are amazing prizes to be won!
              </p>
            </motion.div>
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
    </div>
  );
};

export default Cygnus;