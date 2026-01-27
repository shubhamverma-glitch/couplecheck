import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ArabicAdBanner from "@/components/ArabicAdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const Prank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t, getLocalizedPath } = useLanguage();
  const prankId = searchParams.get("id") || "";

  const [step, setStep] = useState<"loading" | "info">("loading");
  const [friendName, setFriendName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prankExists, setPrankExists] = useState(true);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "user_friend" });

    const checkPrank = async () => {
      if (!prankId) {
        setPrankExists(false);
        setStep("info");
        return;
      }

      const { data, error } = await supabase.from("pranks").select("id").eq("id", prankId).maybeSingle();

      if (error || !data) {
        setPrankExists(false);
      }
      setStep("info");
    };

    checkPrank();
  }, [prankId]);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim() || !crushName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("prank_responses").insert({
        prank_id: prankId,
        friend_name: friendName.trim(),
        crush_name: crushName.trim(),
        answers: {},
      });

      if (error) throw error;

      const resultData = btoa(
        JSON.stringify({
          prankId,
          friendName: friendName.trim(),
          crushName: crushName.trim(),
        }),
      );
      navigate(getLocalizedPath(`/result?data=${encodeURIComponent(resultData)}`));
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error(t('prank.error'));
      setIsSubmitting(false);
    }
  };


  if (step === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!prankExists) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingHearts />
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <HeartIcon size="lg" animated />
          <h1 className="text-2xl font-bold mt-4 mb-2">{t('notFound.title')}</h1>
          <p className="text-muted-foreground">{t('notFound.message')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />

      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{t('prank.title')}</h1>
            <p className="text-muted-foreground">{t('prank.subtitle')}</p>

            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-xs">
                  👩
                </span>
                <span className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center text-xs">
                  👨
                </span>
                <span className="w-6 h-6 rounded-full bg-red-400 border-2 border-white flex items-center justify-center text-xs">
                  💕
                </span>
              </span>
              <span>{t('prank.socialProof')}</span>
            </div>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10">
              {step === "info" && (
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h2 className="text-xl font-bold">{t('prank.title')}</h2>
                    <p className="text-muted-foreground text-sm">{t('prank.subtitle')}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t('prank.yourName')}</label>
                      <Input
                        type="text"
                        placeholder={t('prank.namePlaceholder')}
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        required
                        className="text-center"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-3 py-2">
                      <div className="h-px bg-border flex-1" />
                      <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                      <div className="h-px bg-border flex-1" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">{t('prank.crushName')} 😁</label>
                      <Input
                        type="text"
                        placeholder={t('prank.crushPlaceholder')} 
                        value={crushName}
                        onChange={(e) => setCrushName(e.target.value)}
                        required
                        className="text-center"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="romantic" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>😍 {t('prank.startQuiz')}</>}
                    <Heart className="w-5 h-5" fill="currentColor" />
                  </Button>

                  <ArabicAdBanner />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prank;
