import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Share2, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Prank {
  id: string;
  creator_name: string;
  crush_name: string;
}

const LinkCreated = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [prank, setPrank] = useState<Prank | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prankId = searchParams.get("id") || "";

  useEffect(() => {
    const fetchPrank = async () => {
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
      setIsLoading(false);
    };

    fetchPrank();
  }, [prankId]);

  const loveLink = `${window.location.origin}/love?id=${prankId}`;
  
  const shareText = `💝👩‍❤️‍👨 *Real Love* or *Just a Crush*? 👩‍❤️‍👩💝
🥰 Take this test to find out who your true love really is! 🥰
🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(loveLink);
      setCopied(true);
      toast.success("Link copied! Share it with your friends 💕");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Love Calculator 💕",
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

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(loveLink)}&quote=${encodeURIComponent(shareText)}`;
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
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              💖 Your Love Trap Is Ready!
            </h1>
            <p className="text-muted-foreground">
              Share this link with your friends and let the love secrets spill ✨💌
            </p>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="bg-secondary rounded-xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" fill="currentColor" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">😏 Trap Set By</p>
                <p className="font-bold text-xl text-foreground">{prank?.creator_name || "Unknown"}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  💕 Share this with your friends
                </label>
                <p className="text-xs text-muted-foreground">
                  A fun little quiz for them… a big secret reveal for you 🤭💗
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
                <Button variant="soft" onClick={handleCopy} className="gap-2">
                  <Copy className="w-4 h-4" />
                  📋 Copy Link
                </Button>
                <Button variant="romantic" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  💌 Share With Friends
                </Button>
              </div>

              {/* Social Share Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground text-center">Share on:</p>
                <div className="grid grid-cols-4 gap-2">
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
                    onClick={handleFacebookShare}
                    className="flex flex-col items-center gap-1 h-auto py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600"
                  >
                    <span className="text-xl">📘</span>
                    <span className="text-xs">Facebook</span>
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

              <Link to={`/friendboard?id=${encodeURIComponent(prankId)}`} className="block">
                <Button variant="soft" size="lg" className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  💕 See Your Friends' Answers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCreated;