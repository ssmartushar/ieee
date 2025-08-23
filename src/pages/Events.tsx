import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink, Ticket } from 'lucide-react';
import SEO from '../components/SEO';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  type: 'upcoming' | 'past';
  time: string;
  registrationLink?: string;
  longDescription?: string;
  agenda?: string[];
  speakers?: Array<{ name: string; role: string; }>;
}

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const events: Event[] = [
    {
      id: '1',
      title: 'Cygnus - Annual Tech Symposium',
      date: 'TBD',
      location: 'VIT, Vellore',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&q=80',
      description: 'The flagship event of IEEE CS VITC. A 24-hour hackathon with exciting prizes and workshops.',
      longDescription: 'Cygnus is the annual technical symposium hosted by the IEEE Computer Society chapter of VIT, Vellore. It features a 24-hour hackathon where participants can build innovative solutions to real-world problems. The event also includes workshops on cutting-edge technologies, talks by industry experts, and networking opportunities.',
      type: 'upcoming',
      time: 'TBD',
      registrationLink: '/cygnus',
    }
  ];

  const filteredEvents = events.filter(event => filter === 'all' ? true : event.type === filter);

  return (
    <>
      <SEO
        title="Events — IEEE CS GHRCE"
        description="Explore upcoming and past events of IEEE CS GHRCE, including hackathons, workshops, and talks."
        path="/events"
        image="/assets/ieee1.png"
      />
      <div className="pt-16">
        <div className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-8 p-8">

          {/* Left Section: Event Details */}
          <div className="w-full md:w-[60%] bg-transparent-black backdrop-blur-lg border border-slate-700 rounded-3xl shadow-lg p-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-3xl"
                >
                  <div className="relative h-64 mb-8 rounded-2xl overflow-hidden shadow-lg">
                    <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h1 className="text-4xl font-bold text-white mb-2">{selectedEvent.title}</h1>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/80">
                        <span className="flex items-center"><Calendar size={16} className="mr-2" />{new Date(selectedEvent.date).toLocaleDateString()}</span>
                        <span className="flex items-center"><Clock size={16} className="mr-2" />{selectedEvent.time}</span>
                        <span className="flex items-center"><MapPin size={16} className="mr-2" />{selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-[#ffd300] mb-4">About the Event</h2>
                      <p className="text-white/80 leading-relaxed">{selectedEvent.longDescription}</p>
                    </div>

                    {selectedEvent.agenda && <div>
                      <h2 className="text-2xl font-bold text-[#ffd300] mb-4">Agenda</h2>
                      <ul className="space-y-2 pl-5 list-disc text-white/80">
                        {selectedEvent.agenda.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>}

                    {selectedEvent.speakers && <div>
                      <h2 className="text-2xl font-bold text-[#ffd300] mb-4">Speakers</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedEvent.speakers.map((speaker, index) => (
                          <div key={index} className="bg-transparent-black p-4 rounded-lg">
                            <h3 className="text-white font-semibold">{speaker.name}</h3>
                            <p className="text-white/60 text-sm">{speaker.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>}

                    {selectedEvent.type === 'upcoming' && selectedEvent.registrationLink && (
                      <div className="pt-4 flex justify-center">
                        <a href={'/cygnus'} className="neon-button inline-flex items-center">
                          Register Now
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center glass-card bg-transparent-black text-white/70"
                >
                  <Ticket size={64} className="mx-auto mb-4 text-slate-600" />
                  <h2 className="text-3xl font-bold mb-2">Select an event</h2>
                  <p>Choose an event from the list to see the details.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Section: Events List */}
          <div className="w-full md:w-[40%] bg-transparent-black backdrop-blur-lg border border-slate-700 rounded-3xl shadow-lg p-8 flex flex-col">
            <div className="flex-shrink-0 mb-6">
              <h2 className="text-3xl font-bold text-white mb-4">Events</h2>
              <div className="flex space-x-2 bg-transparent-black p-1 rounded-full">
                {(['all', 'upcoming', 'past'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`w-full capitalize text-sm font-medium py-2 rounded-full transition-colors duration-300 ${filter === f ? 'bg-neon-yellow text-slate-900' : 'text-white/70 hover:bg-slate-700/50'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-grow pr-2 -mr-2">
              <div className="space-y-4">
                {filteredEvents.map(event => (
                  <motion.div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${selectedEvent?.id === event.id ? 'bg-black/40 border-neon-yellow' : 'bg-transparent-black border-transparent hover:bg-black/30'}`}>
                    <div className="flex items-center gap-4">
                      <img src={event.image} alt={event.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                      <div>
                        <h3 className="font-bold text-white">{event.title}</h3>
                        <p className="text-sm text-white/60 mb-2 line-clamp-2">{event.description}</p>
                        <div className="flex items-center text-xs text-white/50 space-x-2">
                          <span className="flex items-center"><Calendar size={12} className="mr-1" />{new Date(event.date).toLocaleDateString()}</span>
                          <span className="flex items-center"><MapPin size={12} className="mr-1" />{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Events;