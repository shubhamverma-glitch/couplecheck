import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Star, Home } from "lucide-react";

const Result = () => {
  const [searchParams] = useSearchParams();
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  let resultData = { 
    prankId: "", 
    friendName: "", 
    crushName: "", 
    answers: {} as Record<string, boolean> 
  };
  
  try {
    resultData = JSON.parse(atob(searchParams.get("data") || ""));
  } catch {
    // Invalid data
  }

  // Calculate fake percentage based on answers
  const yesCount = Object.values(resultData.answers).filter(Boolean).length;
  const basePercentage = 60 + (yesCount * 6) + Math.floor(Math.random() * 10);
  const finalPercentage = Math.min(basePercentage, 99);

  useEffect(() => {
    // Animated counting effect
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const stepValue = finalPercentage / steps;
    
    let current = 0;
    const interval = setInterval(() => {
      current += stepValue;
      if (current >= finalPercentage) {
        setDisplayPercentage(finalPercentage);
        clearInterval(interval);
        setTimeout(() => setShowResult(true), 500);
      } else {
        setDisplayPercentage(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [finalPercentage]);

  const getMessage = () => {
    if (finalPercentage >= 90) return "💕 True Love! You're meant to be together!";
    if (finalPercentage >= 75) return "😍 Amazing compatibility! Sparks are flying!";
    if (finalPercentage >= 60) return "💖 Great potential! Keep pursuing this love!";
    return "💫 There's hope! Love takes time to bloom!";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              Love Results
            </h1>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>
            <div className="absolute -bottom-4 -left-4 opacity-10">
              <HeartIcon size="lg" />
            </div>

            <div className="relative z-10 space-y-8">
              {/* Names */}
              <div className="flex items-center justify-center gap-4">
                <div className="bg-secondary rounded-xl px-4 py-2 text-center">
                  <p className="font-bold text-foreground">{resultData.friendName}</p>
                </div>
                <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
                <div className="bg-secondary rounded-xl px-4 py-2 text-center">
                  <p className="font-bold text-primary">{resultData.crushName}</p>
                </div>
              </div>

              {/* Percentage Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(displayPercentage / 100) * 283} 283`}
                    className="transition-all duration-100 ease-out"
                    style={{
                      filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))"
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gradient animate-count-up">
                    {displayPercentage}%
                  </span>
                  <span className="text-sm text-muted-foreground">Love Match</span>
                </div>
              </div>

              {/* Result Message */}
              {showResult && (
                <div className="text-center space-y-4 animate-count-up">
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${i < Math.floor(finalPercentage / 20) ? 'text-yellow-400' : 'text-muted'}`}
                        fill={i < Math.floor(finalPercentage / 20) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    {getMessage()}
                  </p>
                </div>
              )}

              {/* Fun fact */}
              {showResult && (
                <div className="bg-secondary rounded-xl p-4 text-center animate-count-up">
                  <p className="text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 inline mr-1 text-primary" />
                    {yesCount >= 4 
                      ? "Wow! You really have strong feelings! 💕" 
                      : yesCount >= 2 
                        ? "Love is in the air! Keep trying! 🌹"
                        : "Every love story starts somewhere! ✨"
                    }
                  </p>
                </div>
              )}

              {/* Share prompt */}
              {showResult && (
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Want to find out your other friends' crushes too?
                  </p>
                  <Link to="/">
                    <Button variant="romantic" size="lg" className="gap-2">
                      <Heart className="w-5 h-5" fill="currentColor" />
                      Create Your Own Link
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
