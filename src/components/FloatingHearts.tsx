import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          size: Math.random() * 20 + 12,
          duration: Math.random() * 10 + 8,
          delay: Math.random() * 5,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-rise"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            animationIterationCount: "infinite",
          }}
        >
          <Heart
            className="text-heart-pink opacity-30"
            style={{ width: heart.size, height: heart.size }}
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
