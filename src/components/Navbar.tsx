import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Cygnus', isSpecial: true },
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/members', label: 'Members' },
    /* { path: '/events', label: 'Events' }, */
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#191919]/80 backdrop-blur-lg border-b border-[#ffd300]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-[#ffd300] font-bold text-xl">IEEE CS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  item.isSpecial
                    ? 'bg-gradient-to-r from-[#ffd300] to-[#ff8c00] text-[#191919] px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-[#ffd300]/30 hover:scale-105 transition-all duration-300'
                    : location.pathname === item.path
                    ? 'text-[#ffd300] py-2'
                    : 'text-[#f2f3f4] hover:text-[#ffd300] py-2'
                } transition-all duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f2f3f4] hover:text-[#ffd300]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#191919]/95 backdrop-blur-lg">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  item.isSpecial
                    ? 'bg-gradient-to-r from-[#ffd300] to-[#ff8c00] text-[#191919] mx-2 px-4 py-2 rounded-full font-semibold text-center block'
                    : location.pathname === item.path
                    ? 'text-[#ffd300]'
                    : 'text-[#f2f3f4] hover:text-[#ffd300]'
                } ${!item.isSpecial ? 'block px-3 py-2 text-base' : 'text-base'} transition-all duration-300`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;