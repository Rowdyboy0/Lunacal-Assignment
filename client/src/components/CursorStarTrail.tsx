import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  color: string;
  opacity: number;
}

const colors = [
  'hsl(280, 65%, 60%)',
  'hsl(170, 55%, 45%)',
  'hsl(35, 75%, 55%)',
];

export default function CursorStarTrail() {
  const [stars, setStars] = useState<Star[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let starId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );

      if (distance > 20) {
        const newStar: Star = {
          id: starId++,
          x: e.clientX,
          y: e.clientY,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
        };

        setStars(prev => [...prev.slice(-14), newStar]);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setStars(prev => prev.filter(star => {
        const age = Date.now() - star.id;
        return age < 800;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {stars.map(star => {
        const age = Date.now() - star.id;
        const opacity = Math.max(0, 1 - age / 800);

        return (
          <div
            key={star.id}
            className="absolute transition-opacity duration-300"
            style={{
              left: star.x,
              top: star.y,
              opacity,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z"
                fill={star.color}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
