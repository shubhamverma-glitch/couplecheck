import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ArabicAdBanner from "@/components/ArabicAdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

interface Prank {
  id: string;
  creator_name: string;
  crush_name: string;
}

interface PrankResponse {
  id: string;
  friend_name: string;
  crush_name: string;
  submitted_at: string;
}

const LinkCreated = () => {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [prank, setPrank] = useState<Prank | null>(null);
  const [responses, setResponses] = useState<PrankResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const prankId = searchParams.get("id") || "";

  const fetchResponses = useCallback(async () => {
    if (!prankId) return;
    
    const { data } = await supabase
      .from("prank_responses")
      .select("id, friend_name, crush_name, submitted_at")
      .eq("prank_id", prankId)
      .order("submitted_at", { ascending: false });

    if (data) {
      setResponses(data);
    }
  }, [prankId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchResponses();
    setIsRefreshing(false);
    toast.success(t('linkCreated.refreshed') || "Refreshed!");
  };

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "quiz_completion" });

    const fetchData = async () => {
      if (!prankId) {
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from("pranks")
        .select("*")
        .eq("id", prankId)
        .maybeSingle();

      if (data) {
        setPrank(data);
      }
      
      await fetchResponses();
      setIsLoading(false);
    };

    fetchData();
  }, [prankId, fetchResponses]);

  // Use language prefix for the love link
  const loveLink = language === 'ja' 
    ? `${window.location.origin}/love?id=${prankId}`
    : `${window.location.origin}/${language}/love?id=${prankId}`;
  
  const shareText = t('share.text');

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('meta.title'),
          text: shareText,
          url: loveLink,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
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
    const stickerUrl = "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/Snap_New/LoveMeter_CA-English.png";
    const url = `https://www.snapchat.com/share?url=${encodeURIComponent(loveLink)}&sticker=${encodeURIComponent(stickerUrl)}`;
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
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {t('linkCreated.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('linkCreated.subtitle')}
            </p>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Responses Section - At Top */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    {t('linkCreated.responses') || "Responses"} ({responses.length})
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="gap-1"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {t('linkCreated.refresh') || "Refresh"}
                  </Button>
                </div>
                
                {responses.length === 0 ? (
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t('linkCreated.noResponses') || "No responses yet. Share your link!"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {responses.map((response) => (
                      <div key={response.id} className="bg-secondary/50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">{t('linkCreated.friendLabel') || "Friend Name"}</p>
                            <p className="font-bold text-foreground truncate">{response.friend_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pl-11">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground">{t('linkCreated.crushLabel') || "Their Crush"}</p>
                            <p className="font-semibold text-primary truncate">❤️ {response.crush_name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" fill="currentColor" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{t('linkCreated.creator')}</p>
                <p className="font-bold text-xl text-foreground">{prank?.creator_name || "---"}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  {t('linkCreated.shareLabel')}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t('linkCreated.shareHint')}
                </p>
                <div className="flex gap-2">
                  <Input
                    value={loveLink}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    variant={copied ? "soft" : "romantic"}
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0 w-12"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="soft" onClick={handleCopy}>
                  {t('linkCreated.copyLink')}
                </Button>
                <Button variant="romantic" onClick={handleShare}>
                  {t('linkCreated.share')}
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground text-center">{t('linkCreated.shareVia')}</p>
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

              <ArabicAdBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCreated;
