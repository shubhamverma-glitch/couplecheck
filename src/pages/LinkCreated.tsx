import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Share2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const LinkCreated = () => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const prankId = searchParams.get("id") || "";
  
  let prankData = { yourName: "", crushName: "" };
  try {
    prankData = JSON.parse(atob(prankId));
  } catch {
    // Invalid data
  }

  const prankLink = `${window.location.origin}/prank?id=${encodeURIComponent(prankId)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prankLink);
      setCopied(true);
      toast.success("Link copied! Share it with your friend 💕");
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
          text: "Calculate your love percentage! Try this fun love calculator!",
          url: prankLink,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
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
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Your Link is Ready!
            </h1>
            <p className="text-muted-foreground">
              Share this link with your friend and watch the magic happen! ✨
            </p>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Prank created by</p>
                <p className="font-bold text-lg text-foreground">{prankData.yourName}</p>
              </div>

              <div className="flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
              </div>

              <div className="bg-secondary rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Secret crush name</p>
                <p className="font-bold text-lg text-primary">{prankData.crushName}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Share this link with your friend:
                </label>
                <div className="flex gap-2">
                  <Input
                    value={prankLink}
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
                  Copy Link
                </Button>
                <Button variant="romantic" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                When your friend clicks the link, they'll see a "Love Calculator". 
                They'll enter their name and answer questions about their crush - 
                and you'll see all their answers! 😏
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Create Another Prank
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCreated;
