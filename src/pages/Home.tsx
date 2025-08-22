import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import HyperdriveEffect from '../components/HyperdriveEffect';
import LegalModal from '../components/LegalModal';
import { 
  Users, Calendar, Award, Instagram, Linkedin, Mail, Star,
  Zap, Cpu, Wifi 
} from 'lucide-react';

const AnimatedCounter = ({ end }: { end: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, end, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end]);

  return <span ref={ref}>0</span>;
};

const Home: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: <></> });

  const handleOpenModal = (type: 'privacy' | 'terms') => {
    if (type === 'privacy') {
      setModalContent({ title: 'Privacy Policy', content: <PrivacyPolicyContent /> });
    } else {
      setModalContent({ title: 'Terms of Service', content: <TermsOfServiceContent /> });
    }
    setIsModalOpen(true);
  };

  const PrivacyPolicyContent = () => (
    <>
      <h3 className="text-xl font-bold mt-4">1. Information we collect</h3>
      <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>
      <h3 className="text-xl font-bold mt-4">2. How we use your information</h3>
      <p>We use the information we collect in various ways, including to provide, operate, and maintain our website, improve, personalize, and expand our website, and understand and analyze how you use our website.</p>
    </>
  );

  const TermsOfServiceContent = () => (
    <>
      <h3 className="text-xl font-bold mt-4">1. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on IEEE Computer Society's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
      <h3 className="text-xl font-bold mt-4">2. Disclaimer</h3>
      <p>The materials on IEEE Computer Society's website are provided on an 'as is' basis. IEEE Computer Society makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
    </>
  );

  const doodles = [
    { icon: Star, position: 'top-6 left-10' },
    { icon: Zap, position: 'top-10 right-16' },
    { icon: Cpu, position: 'top-32 left-8' },
    { icon: Wifi, position: 'top-36 right-12' },
    { icon: Star, position: 'top-56 left-[5%]' },
    { icon: Zap, position: 'top-[30%] right-[8%]' },
    { icon: Cpu, position: 'bottom-[30%] left-[12%]' },
    { icon: Wifi, position: 'bottom-[35%] right-[6%]' },
    { icon: Star, position: 'bottom-10 left-[5%]' },
    { icon: Zap, position: 'bottom-[20%] right-[10%]' },
    { icon: Cpu, position: 'top-[70%] left-[25%]' },
    { icon: Wifi, position: 'top-[65%] right-[20%]' },
    { icon: Star, position: 'top-[15%] left-[60%]' },
    { icon: Zap, position: 'bottom-[10%] right-[30%]' },
    { icon: Cpu, position: 'top-[18%] right-[25%]' },
    { icon: Wifi, position: 'bottom-[25%] left-[30%]' },
  ];
  

  const stats = [
    {
      icon: Users,
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-300',
      end: 100000,
      label: 'Global Members',
      description: 'Professionals worldwide shaping the future of computing'
    },
    {
      icon: Calendar,
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-300',
      end: 500,
      label: 'Annual Events',
      description: 'Conferences, workshops, and tech symposiums'
    },
    {
      icon: Award,
      color: 'from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-300',
      end: 400,
      label: 'Active Chapters',
      description: 'Local communities driving innovation globally'
    },
    {
      icon: Users,
      color: 'from-amber-500 to-amber-700',
      iconColor: 'text-amber-300',
      end: 1000,
      label: 'Expert Mentors',
      description: 'Industry leaders sharing knowledge and experience'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-deep-space flex items-center justify-center"
          >
            <HyperdriveEffect />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 2 }}
              className="text-center z-10"
            >
              <img
                src="/assets/ieee1.png"
                alt="IEEE CS Logo"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <div className="relative z-10 pt-16">
            {doodles.map((Doodle, index) => (
              <motion.div
                key={index}
                className={`floating-doodle ${Doodle.position} hidden lg:block`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{
                  duration: 1,
                  delay: index * 0.2 + 1,
                }}
              >
                <Doodle.icon size={32} />
              </motion.div>
            ))}

            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
              <div className="max-w-7xl mx-auto glass-card bg-transparent-black p-8 md:p-12 rounded-3xl">
                <motion.div
                  animate={{
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="sm:h-32 mx-auto mb-8"
                >
                  <img
                    src="/assets/ieee1.png"
                    alt="IEEE CS Logo"
                    className="w-full h-full object-contain logo-glow"
                  />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-5xl md:text-7xl font-bold mb-6"
                >
                  We Live in a{' '}
                  <span className="text-neon-yellow animate-glow">
                    Computer Society.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8"
                >
                  A space where curiosity becomes code, and ideas become impact.
                  IEEE CS — shaping minds, one keystroke at a time.
                </motion.p>
              </div>
            </section>

            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="glass-card bg-transparent-black p-8 md:p-12 rounded-3xl">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-center mb-16 animate-glow"
                  >
                    By the Numbers
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`p-6 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg flex flex-col items-center text-center`}>
                        <div className={`text-4xl mb-4 p-3 rounded-full bg-white/10 ${stat.iconColor}`}>
                          <stat.icon size={30} />
                        </div>
                        <h3 className="text-4xl font-bold">
                          <AnimatedCounter end={stat.end} />
                        </h3>
                        <p className="text-lg font-semibold mt-2">{stat.label}</p>
                        <p className="text-sm text-white/80 mt-1">{stat.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 px-4">
              <div className="max-w-5xl mx-auto">
                <div className="glass-card bg-transparent-black p-8 md:p-12 rounded-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-yellow-400 drop-shadow">
                      Advancing Technology for Humanity
                    </h2>
                    <p className="text-xl md:text-1xl text-white/80 leading-relaxed">
                      The IEEE Computer Society is the premier source for information, inspiration, and collaboration in computer science and engineering.
                      Connecting members worldwide, we drive technology innovation and excellence for the benefit of humanity.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="glass-card bg-transparent-black p-8 md:p-12 rounded-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-glow">
                      Why Join Us
                    </h2>
                    <p className="text-xl md:text-1xl text-white/80 leading-relaxed">
                      Joining the IEEE Computer Society means being part of a global community of technology leaders and innovators.
                      As a member, you'll have access to exclusive benefits, including networking opportunities, career development resources, and more.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            <footer className="glass-card bg-black/80 text-white border-t border-white/10 backdrop-blur-sm mt-20">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                  <div className="md:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/ieee1.png"
                        alt="IEEE CS Logo"
                        className="w-10 h-10 object-contain"
                      />
                      <h2 className="text-xl font-bold text-yellow-400">IEEE Computer Society</h2>
                    </div>
                    <p className="text-sm text-gray-400">
                      Empowering technologists for the digital future through innovation, collaboration, and excellence.
                    </p>
                    <div className="flex space-x-4 pt-2">
                      <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110"><Instagram size={20} /></a>
                      <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110"><Linkedin size={20} /></a>
                      <a href="#" className="hover:text-yellow-400 transition-transform hover:scale-110"><Mail size={20} /></a>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-yellow-400 mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                      <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
                      <li><a href="/events" className="hover:text-yellow-400">Events</a></li>
                      <li><a href="/members" className="hover:text-yellow-400">Membership</a></li>
                      <li><a href="/cygnus" className="hover:text-yellow-400">Cygnus</a></li>
                    </ul>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-yellow-400 mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                      <li><button onClick={() => handleOpenModal('privacy')} className="hover:text-yellow-400 bg-transparent border-none p-0 text-left">Privacy Policy</button></li>
                      <li><button onClick={() => handleOpenModal('terms')} className="hover:text-yellow-400 bg-transparent border-none p-0 text-left">Terms of Service</button></li>
                    </ul>
                  </div>

                  <div className="md:col-span-4">
                    <h3 className="font-semibold text-yellow-400 mb-4">Contact Us</h3>
                    <p className="text-sm text-gray-400">GHRCE, Nagpur, India</p>
                    <p className="text-sm text-gray-400">Email: info@ieeecomputersociety.org</p>
                  </div>
                </div>
              </div>
              <div className="text-center py-4 border-t border-white/10 text-sm text-gray-500">
                &copy; {new Date().getFullYear()} IEEE Computer Society. All rights reserved.
              </div>
            </footer>
            <LegalModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              title={modalContent.title}
            >
              {modalContent.content}
            </LegalModal>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;