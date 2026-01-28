import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ArabicAdBanner from "@/components/ArabicAdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Loader2, RefreshCw, Trash2 } from "lucide-react";
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
  prank_id: string;
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

  const fetchData = async () => {
    if (!prankId) {
      setIsLoading(false);
      return;
    }

    const { data: prankData } = await supabase.from("pranks").select("*").eq("id", prankId).maybeSingle();

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

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "quiz_completion" });
    fetchData();
  }, [prankId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success(t("linkCreated.refreshed") || "Refreshed!");
  };

  // Use language prefix for the love link
  const loveLink =
    language === "ja"
      ? `${window.location.origin}/love?id=${prankId}`
      : `${window.location.origin}/${language}/love?id=${prankId}`;

  const shareText = t("share.text");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(loveLink);
      setCopied(true);
      toast.success(t("linkCreated.copied"));
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error(t("linkCreated.copyFailed"));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("meta.title"),
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
    const stickerUrl =
      "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/Snap_New/LoveMeter_CA-English.png";
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">{t("linkCreated.title")}</h1>
            <p className="text-muted-foreground">{t("linkCreated.subtitle")}</p>
            {prank && (
              <p className="text-sm text-primary mt-2">
                {t("linkCreated.creator")}: <span className="font-bold">{prank.creator_name}</span>
              </p>
            )}
          </div>

          {/* Responses Table - At Top */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                {t("friendboard.title")}
              </h2>
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="gap-2">
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                {t("linkCreated.refresh") || "Refresh"}
              </Button>
            </div>

            {responses.length === 0 ? (
              <div className="card-romantic rounded-2xl p-6 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground">{t("friendboard.noResponses")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("friendboard.shareToGet")}</p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border-2 border-primary/30">
                {/* Table Header */}
                <div className="bg-primary text-primary-foreground">
                  <div className="grid grid-cols-2 text-center font-bold py-3 px-4">
                    <div>{t("friendName") || "Friend-Name"}</div>
                    <div>{t("friendboard.crushName") || "Name of Crush"}</div>
                  </div>
                </div>
                {/* Table Body */}
                <div className="bg-primary/10">
                  {responses.map((response, index) => (
                    <div
                      key={response.id}
                      className={`grid grid-cols-2 text-center py-3 px-4 ${
                        index !== responses.length - 1 ? "border-b border-primary/20" : ""
                      }`}
                    >
                      <div className="font-medium text-foreground">{response.friend_name}</div>
                      <div className="font-bold text-primary">{response.crush_name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Section */}
          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">{t("linkCreated.shareLabel")}</label>
                <p className="text-xs text-muted-foreground">{t("linkCreated.shareHint")}</p>
                <div className="flex gap-2">
                  <Input value={loveLink} readOnly className="text-sm" />
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
                  {t("linkCreated.copyLink")}
                </Button>
                <Button variant="romantic" onClick={handleShare}>
                  {t("linkCreated.share")}
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground text-center">{t("linkCreated.shareVia")}</p>
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
          </div>

          <ArabicAdBanner />
        </div>
      </div>
    </div>
  );
};

export default LinkCreated;
