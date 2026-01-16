import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Result = () => {
  const [searchParams] = useSearchParams();
  const [showReveal, setShowReveal] = useState(false);
  const [pranksterName, setPranksterName] = useState("");
  
  let resultData = {
    prankId: "",
    friendName: "",
    crushName: "",
    answers: {} as Record<string, boolean>,
  };
  
  try {
    const data = JSON.parse(atob(searchParams.get("data") || ""));
    resultData = {
      ...resultData,
      ...data
    };
  } catch {
    // Invalid data
  }

  useEffect(() => {
    // Fetch prankster name from database
    const fetchPranksterName = async () => {
      if (resultData.prankId) {
        const { data } = await supabase
          .from("pranks")
          .select("creator_name")
          .eq("id", resultData.prankId)
          .maybeSingle();
        
        if (data?.creator_name) {
          setPranksterName(data.creator_name);
        }
      }
    };
    
    fetchPranksterName();
    
    // Reveal the prank after a moment of suspense
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
                <p className="text-muted-foreground">Analyzing your compatibility. Please wait 💕</p>
              </div>
            </div>
          )}

          {/* Prank Reveal */}
          {showReveal && (
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  You Got Pranked by {pranksterName}! 😂
                </h1>
                <p className="text-muted-foreground">
                  Your name and crush's name have been shared with <span className="text-primary font-bold">{pranksterName}</span>
                </p>
              </div>

              <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20">
                  <HeartIcon size="xl" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Laughing GIF */}
                  <div className="text-center">
                    <img 
                      src="https://media.giphy.com/media/Q7ozWVYCR0nyW2rvPW/giphy.gif" 
                      alt="Laughing"
                      className="w-32 h-32 mx-auto rounded-2xl object-cover"
                    />
                  </div>

                  {/* Revealed Info */}
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
                      <span className="text-muted-foreground">Pranked by:</span>
                      <span className="font-bold text-foreground">{pranksterName}</span>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      😏 {pranksterName} now knows your secret crush!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Don't worry, it's just a fun prank! Now it's your turn!
                    </p>
                  </div>

                  {/* CTA to create own prank */}
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4 text-center my-[20px]">
                      <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">
                        Create your own link and prank your friends!
                      </p>
                    </div>

                    <Link to="/">
                      <Button variant="romantic" size="lg" className="w-full gap-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        Create Your Own Love Trap
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link to="/">
                  <Button variant="ghost" className="gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home
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