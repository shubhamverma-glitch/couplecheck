import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, Eye, Check, X, Loader2, Share2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
const questions = [{
  id: "kiss",
  text: "Have you ever kissed your crush?",
  emoji: "💋"
}, {
  id: "date",
  text: "Have you been on a date with your crush?",
  emoji: "🌹"
}, {
  id: "dream",
  text: "Do you dream about your crush?",
  emoji: "💭"
}, {
  id: "stalk",
  text: "Do you check their social media often?",
  emoji: "📱"
}, {
  id: "jealous",
  text: "Do you get jealous when they talk to others?",
  emoji: "😤"
}, {
  id: "confess",
  text: "Have you tried to confess your feelings?",
  emoji: "💌"
}];
const Friendboard = () => {
  const [searchParams] = useSearchParams();
  const prankId = searchParams.get("id") || "";
  const [responses, setResponses] = useState<PrankResponse[]>([]);
  const [prank, setPrank] = useState<Prank | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<PrankResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const loveLink = `${window.location.origin}/love?id=${prankId}`;
  const shareText = `💝👩‍❤️‍👨 *Real Love* or *Just a Crush*? 👩‍❤️‍👩💝
🥰 Take this test to find out who your true love really is! 🥰
🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩`;
  useEffect(() => {
    const fetchData = async () => {
      if (!prankId) {
        setIsLoading(false);
        return;
      }
      const {
        data: prankData
      } = await supabase.from("pranks").select("*").eq("id", prankId).maybeSingle();
      if (prankData) {
        setPrank(prankData);
      }
      const {
        data: responsesData
      } = await supabase.from("prank_responses").select("*").eq("prank_id", prankId).order("submitted_at", {
        ascending: false
      });
      if (responsesData) {
        setResponses(responsesData as PrankResponse[]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [prankId]);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
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
    const url = `https://www.snapchat.com/share?url=${encodeURIComponent(loveLink)}`;
    window.open(url, "_blank");
  };
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>;
  }
  return <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">💖 Friend Board 💖 </h1>
            <p className="text-muted-foreground">
              See who fell for your trap! 😏
            </p>
            {prank && <p className="text-sm text-primary mt-2">
                Created by: <span className="font-bold">{prank.creator_name}</span>
              </p>}
          </div>

          {/* Selected Response Detail */}
          {selectedResponse ? <div className="card-romantic rounded-3xl p-8 relative overflow-hidden mb-6">
              <div className="absolute -top-4 -right-4 opacity-20">
                <HeartIcon size="xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <Button variant="ghost" size="sm" onClick={() => setSelectedResponse(null)} className="gap-2 mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to List
                </Button>

                {/* Friend and Crush Info */}
                <div className="bg-secondary rounded-xl p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Friend's Name</p>
                      <p className="font-bold text-xl text-foreground">{selectedResponse.friend_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Their Crush</p>
                      <p className="font-bold text-xl text-primary">{selectedResponse.crush_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-5 h-5 text-primary animate-heartbeat" fill="currentColor" />
                  </div>
                </div>

                {/* Answers */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground">Answers:</h3>
                  {questions.map(q => <div key={q.id} className="flex items-center justify-between bg-background/50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{q.emoji}</span>
                        <span className="text-sm text-foreground">{q.text}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${selectedResponse.answers[q.id] ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"}`}>
                        {selectedResponse.answers[q.id] ? <><Check className="w-4 h-4" /> Yes</> : <><X className="w-4 h-4" /> No</>}
                      </div>
                    </div>)}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Submitted: {formatDate(selectedResponse.submitted_at)}
                </p>
              </div>
            </div> : <>
              {/* Response List */}
              {responses.length === 0 ? <div className="card-romantic rounded-3xl p-8 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-xl font-bold text-foreground mb-2">No responses yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Share your link and wait for your friends to fall for it! 😄
                  </p>
                  
                  {/* Share Buttons */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="soft" size="sm" onClick={handleWhatsAppShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-green-500/10 hover:bg-green-500/20 text-green-600">
                        <span className="text-xl">💬</span>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button variant="soft" size="sm" onClick={handleTwitterShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600">
                        <span className="text-xl">🐦</span>
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button variant="soft" size="sm" onClick={handleSnapchatShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600">
                        <span className="text-xl">👻</span>
                        <span className="text-xs">Snapchat</span>
                      </Button>
                    </div>
                    <Button variant="soft" onClick={handleCopy} className="w-full">
                      {copied ? "Copied!" : "📋 Copy Link"}
                    </Button>
                  </div>
                </div> : <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">
                      {responses.length} friend{responses.length > 1 ? "s" : ""} fell for it!
                    </h2>
                  </div>

                  {responses.map(response => <div key={response.id} className="card-romantic rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => setSelectedResponse(response)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-primary" fill="currentColor" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{response.friend_name}</p>
                            <p className="text-sm text-primary">
                              Crush: <span className="font-semibold">{response.crush_name}</span>
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
                    </div>)}

                  {/* Share Buttons for when there are responses */}
                  <div className="card-romantic rounded-2xl p-6 mt-6">
                    <p className="text-sm font-semibold text-foreground text-center mb-4">Share to get more responses:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="soft" size="sm" onClick={handleWhatsAppShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-green-500/10 hover:bg-green-500/20 text-green-600">
                        <span className="text-xl">💬</span>
                        <span className="text-xs">WhatsApp</span>
                      </Button>
                      <Button variant="soft" size="sm" onClick={handleTwitterShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600">
                        <span className="text-xl">🐦</span>
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button variant="soft" size="sm" onClick={handleSnapchatShare} className="flex flex-col items-center gap-1 h-auto py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600">
                        <span className="text-xl">👻</span>
                        <span className="text-xs">Snapchat</span>
                      </Button>
                    </div>
                  </div>
                </div>}
            </>}

          
        </div>
      </div>
    </div>;
};
export default Friendboard;