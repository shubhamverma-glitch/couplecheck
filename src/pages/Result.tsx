import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home, AlertTriangle } from "lucide-react";

const Result = () => {
  const [searchParams] = useSearchParams();
  const [showReveal, setShowReveal] = useState(false);
  
  let resultData = { 
    prankId: "", 
    friendName: "", 
    crushName: "", 
    answers: {} as Record<string, boolean>,
    pranksterName: ""
  };
  
  try {
    const data = JSON.parse(atob(searchParams.get("data") || ""));
    resultData = { ...resultData, ...data };
    
    // Get prankster name from the original prank data
    if (data.prankId) {
      const prankData = JSON.parse(atob(data.prankId));
      resultData.pranksterName = prankData.yourName || "";
    }
  } catch {
    // Invalid data
  }

  useEffect(() => {
    // Show prank reveal after a brief suspense
    const timer = setTimeout(() => setShowReveal(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {/* Loading state before reveal */}
          {!showReveal && (
            <div className="text-center">
              <div className="card-romantic rounded-3xl p-8">
                <Heart className="w-16 h-16 text-primary mx-auto animate-heartbeat mb-4" fill="currentColor" />
                <h2 className="text-2xl font-bold text-gradient mb-2">Calculating Love...</h2>
                <p className="text-muted-foreground">Please wait while we analyze your compatibility 💕</p>
              </div>
            </div>
          )}

          {/* Prank Reveal */}
          {showReveal && (
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <AlertTriangle className="w-16 h-16 text-yellow-500 animate-bounce" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  You Have Been Fooled by {resultData.pranksterName}! 😂
                </h1>
                <p className="text-muted-foreground">
                  Your name and name of your love has been shared with <span className="text-primary font-bold">{resultData.pranksterName}</span>
                </p>
              </div>

              <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20">
                  <HeartIcon size="xl" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Cute character/emoji */}
                  <div className="text-center">
                    <div className="text-8xl mb-4">🙈</div>
                  </div>

                  {/* Revealed info */}
                  <div className="bg-secondary rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Your Name:</span>
                      <span className="font-bold text-foreground">{resultData.friendName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Your Crush:</span>
                      <span className="font-bold text-primary">{resultData.crushName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Shared with:</span>
                      <span className="font-bold text-foreground">{resultData.pranksterName}</span>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      😏 {resultData.pranksterName} now knows your secret crush!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Don't worry, it's just a fun prank! Now it's your turn to prank your friends!
                    </p>
                  </div>

                  {/* CTA to create own prank */}
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4 text-center">
                      <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">
                        Register now to prank your friends too!
                      </p>
                    </div>

                    <Link to="/">
                      <Button variant="romantic" size="lg" className="w-full gap-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        Create Your Own Prank Link
                      </Button>
                    </Link>
                  </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
