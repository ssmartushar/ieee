import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Award, Briefcase, Calendar } from 'lucide-react';

interface Member {
  name: string;
  position: string;
  image: string;
  bio: string;
  achievements: string[];
  experience: string;
  joinDate: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const Members: React.FC = () => {
  const members: Member[] = [
    {
      name: 'Bharat Jambhulkar',
      position: 'Chair',
      image: '/assets/Bharat Jambhulkar.jpg',
      bio: 'Visionary leader driving the chapter towards new heights of innovation and excellence.',
      achievements: ['Spearheaded major tech initiatives', 'Fostered industry collaborations', 'Mentored student projects'],
      experience: '4+ years in leadership',
      joinDate: 'Member since 2021',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Rutuj Langde',
      position: 'Secretary',
      image: '/assets/rutuj.png',
      bio: 'Organized and efficient, ensuring the smooth operation of all chapter activities.',
      achievements: ['Streamlined communication channels', 'Managed event logistics', 'Maintained chapter records'],
      experience: '3+ years in administration',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Vaibhavi Mangrulkar',
      position: 'Vice Chair',
      image: '/assets/vaibhavi.jpg',
      bio: 'Dynamic and supportive, assisting the Chair and driving member engagement.',
      achievements: ['Led successful recruitment drives', 'Organized member workshops', 'Enhanced team collaboration'],
      experience: '3+ years in leadership',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Vibhor Joshi',
      position: 'Event Coordinator',
      image: '/assets/Vibhor_Joshi.jpg',
      bio: 'Creative planner and executor of memorable and impactful tech events.',
      achievements: ['Managed flagship annual symposium', 'Introduced innovative event formats', 'Secured key speakers'],
      experience: '2+ years in event management',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Yug Agarwal',
      position: 'Co-Event Coordinator',
      image: '/assets/Yug Agrawal.jpg',
      bio: 'Collaborative and energetic, supporting the planning of all chapter events.',
      achievements: ['Assisted in workshop logistics', 'Managed volunteer teams', 'Contributed to event marketing'],
      experience: '2+ years in event support',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Abhijeet Moghe',
      position: 'Treasurer',
      image: '/assets/Abhijeet Moghe .jpg',
      bio: 'Detail-oriented manager of the chapter\'s finances, ensuring fiscal responsibility.',
      achievements: ['Managed budget for all events', 'Secured sponsorships', 'Provided transparent financial reporting'],
      experience: '2+ years in finance',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Shivansh Verma',
      position: 'Webmaster',
      image: '/assets/Shivansh Verma..jpg',
      bio: 'The architect of our digital presence, building and maintaining our online platform.',
      achievements: ['Redesigned chapter website', 'Implemented new features', 'Ensured website security and performance'],
      experience: '2+ years in web development',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Shreyash Bahe',
      position: 'Co-Webmaster',
      image: '/assets/shreyash_bahe.jpeg',
      bio: 'Dedicated developer supporting the chapter\'s website and digital infrastructure.',
      achievements: ['Assisted in front-end development', 'Managed content updates', 'Troubleshot technical issues'],
      experience: '2+ years in web development',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Priyanshu Mishra',
      position: 'Publicity Lead',
      image: '/assets/Priyanshu Mishra.jpg',
      bio: 'Strategic communicator spreading the word about our events and achievements.',
      achievements: ['Increased social media engagement', 'Developed successful marketing campaigns', 'Managed press releases'],
      experience: '2+ years in marketing',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Tanish Tawri',
      position: 'Co-Publicity Lead',
      image: '/assets/tanishtawri.jpg',
      bio: 'Creative marketer assisting in all publicity efforts for the chapter.',
      achievements: ['Created engaging promotional content', 'Analyzed marketing data', 'Supported campaign execution'],
      experience: '1+ year in marketing',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Harshal Ghoradkar',
      position: 'Design Lead',
      image: '/assets/Harshal Ghoradkar.jpg',
      bio: 'The creative force behind our visual identity, crafting stunning designs for all platforms.',
      achievements: ['Developed chapter style guide', 'Designed all event branding', 'Created marketing materials'],
      experience: '3+ years in graphic design',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Prince Rayamwar',
      position: 'Co-Design Lead',
      image: '/assets/Prince Rayamwar.png',
      bio: 'Talented designer supporting the visual branding and creative output of the chapter.',
      achievements: ['Created social media graphics', 'Assisted in video production', 'Contributed to UI/UX design'],
      experience: '2+ years in graphic design',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Palash Shende',
      position: 'Coordination Lead',
      image: '/assets/Palash Shende.jpg',
      bio: 'Master organizer ensuring seamless collaboration and execution across all teams.',
      achievements: ['Facilitated inter-team communication', 'Managed project timelines', 'Resolved logistical challenges'],
      experience: '2+ years in project coordination',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Ritunash Singh',
      position: 'Co-Coordination Lead',
      image: '/assets/qaz.jpg',
      bio: 'Proactive coordinator assisting in the smooth operation of chapter projects.',
      achievements: ['Supported team meetings', 'Tracked action items', 'Assisted in resource allocation'],
      experience: '1+ year in coordination',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Ridhima Shukla',
      position: 'Social Media Lead',
      image: '/assets/Riddhima Shukla.jpg',
      bio: 'The voice of our chapter online, engaging our community across all social platforms.',
      achievements: ['Grew follower base by 50%', 'Launched successful online campaigns', 'Managed content calendar'],
      experience: '2+ years in social media management',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Shikha Tiwari',
      position: 'Co-Social Media Lead',
      image: '/assets/Shikha Tiwari.jpg',
      bio: 'Creative content creator and community manager for our social media channels.',
      achievements: ['Crafted engaging posts', 'Monitored social trends', 'Interacted with our online community'],
      experience: '1+ year in social media',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Riya Yadav',
      position: 'Content Lead',
      image: '/assets/Riya Yadav.jpg',
      bio: 'Our master storyteller, creating compelling narratives for our blog, newsletters, and more.',
      achievements: ['Authored key articles', 'Managed editorial calendar', 'Ensured brand voice consistency'],
      experience: '2+ years in content creation',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Pranav Kharat',
      position: 'Videography Lead',
      image: '/assets/Pranav Kharat.jpg',
      bio: 'Capturing our chapter\'s moments through the lens, producing high-quality video content.',
      achievements: ['Produced event highlight reels', 'Created promotional videos', 'Managed video equipment'],
      experience: '3+ years in videography',
      joinDate: 'Member since 2022',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Navinya Yede',
      position: 'Resource and Development Lead',
      image: '/assets/Navinya Yede.jpg',
      bio: 'Connecting our members with valuable resources and opportunities for growth.',
      achievements: ['Secured partnerships for workshops', 'Developed a mentorship program', 'Curated learning materials'],
      experience: '2+ years in community development',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Anjali Bopche',
      position: 'Execom',
      image: '/assets/Anjali Bopche.jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Neha Kathole',
      position: 'Execom',
      image: '/assets/Neha Kathole .jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Janvi Chichudde',
      position: 'Execom',
      image: '/assets/Janvi Chichudde.jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Dewansh Shukla',
      position: 'Execom',
      image: '/assets/dewansh shukla.jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Tushar Funde',
      position: 'Execom',
      image: '/assets/Tushar funde.jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    },
    {
      name: 'Sai Rahangdale',
      position: 'Execom',
      image: '/assets/sai.jpg',
      bio: 'Dedicated member of the executive committee, contributing to the chapter\'s success.',
      achievements: ['Supported various initiatives', 'Volunteered at key events', 'Active in chapter meetings'],
      experience: '1+ year in committee roles',
      joinDate: 'Member since 2023',
      social: { linkedin: '#', email: '#' }
    }
  ];

  return (
    <div className="pt-16">


      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto bg-black/80 p-10 rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            
            <h1 className="page-title text-neon-white animate-glow">Meet Our Team</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Dedicated professionals driving innovation and excellence in computer science.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group [perspective:1000px]"
              >
                <div className="relative transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] h-[360px]">
                  {/* Front of card */}
                  <div className="absolute inset-0 bg-deep-space/80 backdrop-blur-sm overflow-hidden transform skew-x-2 hover:skew-x-0 transition-transform duration-300 [backface-visibility:hidden]" 
                       style={{
                         clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                       }}>
                    <div className="h-full flex flex-col">
                      <div className="relative h-[240px] overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent" />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-end">
                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-sm text-neon-yellow font-medium">{member.position}</p>
                      </div>
                      <div className="p-2 border-t border-white/10 flex justify-center space-x-3">
                        {member.social.github && (
                          <a href={member.social.github} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.social.email && (
                          <a href={member.social.email} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Mail size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 bg-deep-space/80 backdrop-blur-sm overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
                       style={{
                         clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)',
                       }}>
                    <div className="h-full p-4 flex flex-col">
                      <h3 className="text-lg font-bold text-neon-yellow mb-2">{member.name}</h3>
                      
                      <p className="text-white/80 text-xs mb-3 line-clamp-2">{member.bio}</p>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-white/70">
                          <Briefcase size={12} className="mr-1.5" />
                          <span className="text-xs">{member.experience}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <Calendar size={12} className="mr-1.5" />
                          <span className="text-xs">{member.joinDate}</span>
                        </div>
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <Award size={12} className="text-neon-yellow mr-1.5" />
                          <h4 className="text-xs font-semibold text-white">Achievements</h4>
                        </div>
                        <ul className="space-y-1 text-xs text-white/70 list-disc list-inside">
                          {member.achievements.map((ach, i) => (
                            <li key={i}>{ach}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex justify-center space-x-3">
                        {member.social.github && (
                          <a href={member.social.github} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Github size={16} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Linkedin size={16} />
                          </a>
                        )}
                        {member.social.email && (
                          <a href={member.social.email} className="text-white/70 hover:text-neon-yellow transition-colors">
                            <Mail size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Members;