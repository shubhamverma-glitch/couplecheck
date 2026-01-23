import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

const Result = () => {
  const [searchParams] = useSearchParams();
  const { t, getLocalizedPath } = useLanguage();
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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "friend_result" });

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
    
    const timer = setTimeout(() => setShowReveal(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {!showReveal && (
            <div className="text-center">
              <div className="card-romantic rounded-3xl p-8">
                <Heart className="w-16 h-16 text-primary mx-auto animate-heartbeat mb-4" fill="currentColor" />
                <h2 className="text-2xl font-bold text-gradient mb-2">{t('result.calculating')}</h2>
                <p className="text-muted-foreground">{t('result.analyzing')}</p>
              </div>
            </div>
          )}

          {showReveal && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {t('result.trapped')}
                </h1>
                <p className="text-muted-foreground">
                  {t('result.secretRevealed')}
                </p>
              </div>

              <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20">
                  <HeartIcon size="xl" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <img 
                      src="https://media.giphy.com/media/Q7ozWVYCR0nyW2rvPW/giphy.gif" 
                      alt="😂"
                      className="w-32 h-32 mx-auto rounded-2xl object-cover"
                    />
                  </div>

                  <div className="bg-secondary rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('result.yourName')}</span>
                      <span className="font-bold text-foreground">{resultData.friendName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('result.yourCrush')}</span>
                      <span className="font-bold text-primary">{resultData.crushName}</span>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      {t('result.gotYourSecret', { pranksterName })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('result.justPrank')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4 text-center my-[20px]">
                      <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">
                        {t('result.yourTurn')}
                      </p>
                    </div>

                    <Link to={getLocalizedPath("/")}>
                      <Button variant="romantic" size="lg" className="w-full gap-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        {t('result.createOwn')}
                      </Button>
                    </Link>

                    <Link to={getLocalizedPath("/")}>
                      <Button variant="ghost" size="lg" className="w-full gap-2">
                        {t('result.wantRevenge')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
