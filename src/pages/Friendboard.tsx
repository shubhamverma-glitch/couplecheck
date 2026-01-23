import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, Eye, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

interface PrankResponse {
  id: string;
  prank_id: string;
  friend_name: string;
  crush_name: string;
  answers: Record<string, boolean>;
  submitted_at: string;
}

interface Prank {
  id: string;
  creator_name: string;
  crush_name: string;
}

const Friendboard = () => {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const prankId = searchParams.get("id") || "";
  const [responses, setResponses] = useState<PrankResponse[]>([]);
  const [prank, setPrank] = useState<Prank | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<PrankResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const questions = [
    { id: "date", textKey: "question.thinkOften", emoji: "💋" },
    { id: "fake", textKey: "question.nervousAround", emoji: "🌹" },
    { id: "dream", textKey: "question.dreamAbout", emoji: "💭" },
    { id: "spark", textKey: "question.smileWhenSee", emoji: "📱" },
    { id: "confess", textKey: "question.talkForHours", emoji: "💌" },
  ];
  
  const loveLink = language === 'ja' 
    ? `${window.location.origin}/love?id=${prankId}`
    : `${window.location.origin}/${language}/love?id=${prankId}`;
  const shareText = t('share.text');

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "friend_board" });

    const fetchData = async () => {
      if (!prankId) {
        setIsLoading(false);
        return;
      }
      const { data: prankData } = await supabase
        .from("pranks")
        .select("*")
        .eq("id", prankId)
        .maybeSingle();
      if (prankData) {
        setPrank(prankData);
      }
      const { data: responsesData } = await supabase
        .from("prank_responses")
        .select("*")
        .eq("prank_id", prankId)
        .order("submitted_at", { ascending: false });
      if (responsesData) {
        setResponses(responsesData as PrankResponse[]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [prankId]);

  const formatDate = (dateString: string) => {
    const locale = language === 'ja' ? 'ja-JP' : language === 'ar' ? 'ar-SA' : language === 'es' ? 'es-ES' : language === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(loveLink);
      setCopied(true);
      toast.success(t('linkCreated.copied'));
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error(t('linkCreated.copyFailed'));
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + "\n" + loveLink)}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(loveLink)}`;
    window.open(url, "_blank");
  };

  const handleSnapchatShare = () => {
    const url = `https://www.snapchat.com/share?url=${encodeURIComponent(loveLink)}`;
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{t('friendboard.title')}</h1>
            <p className="text-muted-foreground">{t('result.secretRevealed')}</p>
            {prank && (
              <p className="text-sm text-primary mt-2">
                {t('friendboard.createdBy')} <span className="font-bold">{prank.creator_name}</span>
              </p>
            )}
          </div>

          {selectedResponse ? (
            <div className="card-romantic rounded-3xl p-8 relative overflow-hidden mb-6">
              <div className="absolute -top-4 -right-4 opacity-20">
                <HeartIcon size="xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedResponse(null)}
                  className="gap-2 mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('friendboard.back')}
                </Button>

                <div className="bg-secondary rounded-xl p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('result.yourName')}</p>
                      <p className="font-bold text-xl text-foreground">{selectedResponse.friend_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('friendboard.crush')}</p>
                      <p className="font-bold text-xl text-primary">{selectedResponse.crush_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-5 h-5 text-primary animate-heartbeat" fill="currentColor" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground">{t('friendboard.answers')}</h3>
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between bg-background/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{q.emoji}</span>
                        <span className="text-sm text-foreground">{t(q.textKey, { crushName: selectedResponse.crush_name })}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                          selectedResponse.answers[q.id]
                            ? "bg-green-500/20 text-green-600"
                            : "bg-red-500/20 text-red-600"
                        }`}
                      >
                        {selectedResponse.answers[q.id] ? (
                          <>
                            <Check className="w-4 h-4" /> {t('prank.yes')}
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" /> {t('prank.no')}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {t('friendboard.submittedAt')} {formatDate(selectedResponse.submitted_at)}
                </p>
              </div>
            </div>
          ) : (
            <>
              {responses.length === 0 ? (
                <div className="card-romantic rounded-3xl p-8 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-xl font-bold text-foreground mb-2">{t('friendboard.noResponses')}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t('friendboard.shareToGet')}
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleWhatsAppShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-green-500/10 hover:bg-green-500/20 text-green-600"
                      >
                        <span className="text-xl">💬</span>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleTwitterShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600"
                      >
                        <span className="text-xl">🐦</span>
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleSnapchatShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600"
                      >
                        <span className="text-xl">👻</span>
                        <span className="text-xs">Snapchat</span>
                      </Button>
                    </div>
                    <Button variant="soft" onClick={handleCopy} className="w-full">
                      {copied ? t('linkCreated.copied') : t('linkCreated.copyLink')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">
                      {responses.length} {t('friendboard.responses')}
                    </h2>
                  </div>

                  {responses.map((response) => (
                    <div
                      key={response.id}
                      className="card-romantic rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform"
                      onClick={() => setSelectedResponse(response)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{response.friend_name}</p>
                            <p className="text-sm text-primary">
                              {t('friendboard.crush')} <span className="font-semibold">{response.crush_name}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(response.submitted_at)}
                          </span>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="card-romantic rounded-2xl p-6 mt-6">
                    <p className="text-sm font-semibold text-foreground text-center mb-4">
                      {t('linkCreated.shareVia')}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleWhatsAppShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-green-500/10 hover:bg-green-500/20 text-green-600"
                      >
                        <span className="text-xl">💬</span>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleTwitterShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600"
                      >
                        <span className="text-xl">🐦</span>
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button
                        variant="soft"
                        size="sm"
                        onClick={handleSnapchatShare}
                        className="flex flex-col items-center gap-1 h-auto py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600"
                      >
                        <span className="text-xl">👻</span>
                        <span className="text-xs">Snapchat</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friendboard;
