import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starfieldRef.current) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
      
      return star;
    };

    const stars = Array.from({ length: 200 }, createStar);
    stars.forEach(star => starfieldRef.current?.appendChild(star));

    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div ref={starfieldRef} className="starfield" />;
};

export default Starfield;