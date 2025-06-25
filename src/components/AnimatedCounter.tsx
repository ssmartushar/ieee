import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  label: string;
  color?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  label,
  color = 'text-white'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  console.log("Is counter in view:", inView);
  
  const [isAnimating, setIsAnimating] = useState(false);

  const { number } = useSpring({
    from: { number: 0 },
    number: end,
    config: { duration },
  });
  

  const formattedNumber = (n: number) => {
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}k+`;
    }
    return n.toString();
  };

  return (
    <div ref={ref} className="stats-card text-center">
      <animated.div 
        className={`text-4xl font-bold mb-2 ${color}`}
      >
        {number.to((val: number) => formattedNumber(Math.floor(val)))}
      </animated.div>
      <div className="text-xl font-semibold text-white">{label}</div>
    </div>
  );
};

export default AnimatedCounter;