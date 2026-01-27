import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ArabicAdBanner from "@/components/ArabicAdBanner";
import ResponsesList from "@/components/ResponsesList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Loader2, Share2, Sparkles } from "lucide-react";
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
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Hero Header */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <HeartIcon size="lg" animated />
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-primary animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              {t('linkCreated.trapReady') || "Your Trap is Ready!"} 🎯
            </h1>
            <p className="text-muted-foreground">
              {t('linkCreated.subtitle')}
            </p>
          </div>

          {/* Responses Card - Featured Section */}
          <div className="card-romantic rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 opacity-10">
              <HeartIcon size="xl" />
            </div>
            <ResponsesList 
              responses={responses}
              isRefreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Share Section */}
          <div className="card-romantic rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -bottom-4 -left-4 opacity-10">
              <Heart className="w-20 h-20" />
            </div>
            
            <div className="relative z-10 space-y-5">
              {/* Creator Badge */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {prank?.creator_name?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t('linkCreated.trapMaster') || "Trap Master"}</p>
                  <p className="font-bold text-xl text-foreground">{prank?.creator_name || "---"}</p>
                </div>
              </div>

              {/* Share Link */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-primary" />
                  <label className="text-sm font-semibold text-foreground">
                    {t('linkCreated.magicLink') || "Your Magic Link"}
                  </label>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={loveLink}
                    readOnly
                    className="text-sm bg-secondary/50 border-primary/20 focus:border-primary"
                  />
                  <Button
                    variant={copied ? "soft" : "romantic"}
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0 w-12 transition-all duration-300"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Main Share Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="soft" 
                  onClick={handleCopy}
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  <Copy className="w-4 h-4" />
                  {t('linkCreated.copyLink')}
                </Button>
                <Button 
                  variant="romantic" 
                  onClick={handleShare}
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  <Share2 className="w-4 h-4" />
                  {t('linkCreated.share')}
                </Button>
              </div>

              {/* Social Share Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {t('linkCreated.shareVia')}
                  <Sparkles className="w-4 h-4 text-primary" />
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="soft" 
                    size="sm"
                    onClick={handleWhatsAppShare}
                    className="flex flex-col items-center gap-2 h-auto py-4 bg-gradient-to-br from-green-500/10 to-green-500/20 hover:from-green-500/20 hover:to-green-500/30 text-green-600 border border-green-500/20 hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-2xl">💬</span>
                    <span className="text-xs font-semibold">WhatsApp</span>
                  </Button>
                  <Button 
                    variant="soft" 
                    size="sm"
                    onClick={handleTwitterShare}
                    className="flex flex-col items-center gap-2 h-auto py-4 bg-gradient-to-br from-sky-500/10 to-sky-500/20 hover:from-sky-500/20 hover:to-sky-500/30 text-sky-600 border border-sky-500/20 hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-2xl">🐦</span>
                    <span className="text-xs font-semibold">Twitter</span>
                  </Button>
                  <Button 
                    variant="soft" 
                    size="sm"
                    onClick={handleSnapchatShare}
                    className="flex flex-col items-center gap-2 h-auto py-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 hover:from-yellow-500/20 hover:to-yellow-500/30 text-yellow-600 border border-yellow-500/20 hover:scale-105 transition-all duration-300"
                  >
                    <span className="text-2xl">👻</span>
                    <span className="text-xs font-semibold">Snapchat</span>
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
