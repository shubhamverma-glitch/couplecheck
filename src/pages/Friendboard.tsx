import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, Eye, Check, X } from "lucide-react";

interface PrankResponse {
  id: string;
  prankId: string;
  pranksterName: string;
  friendName: string;
  crushName: string;
  answers: Record<string, boolean>;
  submittedAt: string;
}

const questions = [
  { id: "kiss", text: "Have you ever kissed your crush?", emoji: "💋" },
  { id: "date", text: "Have you been on a date with your crush?", emoji: "🌹" },
  { id: "dream", text: "Do you dream about your crush?", emoji: "💭" },
  { id: "stalk", text: "Do you check their social media often?", emoji: "📱" },
  { id: "jealous", text: "Do you get jealous when they talk to others?", emoji: "😤" },
  { id: "confess", text: "Have you ever tried to confess your feelings?", emoji: "💌" },
];

const Friendboard = () => {
  const [searchParams] = useSearchParams();
  const prankId = searchParams.get("id") || "";
  const [responses, setResponses] = useState<PrankResponse[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<PrankResponse | null>(null);

  let prankData = { yourName: "" };
  try {
    prankData = JSON.parse(atob(prankId));
  } catch {
    // Invalid data
  }

  useEffect(() => {
    const allResponses: PrankResponse[] = JSON.parse(localStorage.getItem("prankResponses") || "[]");
    const filteredResponses = allResponses.filter(r => r.prankId === prankId);
    setResponses(filteredResponses);
  }, [prankId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              Friendboard
            </h1>
            <p className="text-muted-foreground">
              See who fell for your prank! 😏
            </p>
            {prankData.yourName && (
              <p className="text-sm text-primary mt-2">
                Prank by: <span className="font-bold">{prankData.yourName}</span>
              </p>
            )}
          </div>

          {/* Selected Response Detail */}
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
                  Back to list
                </Button>

                {/* Friend & Crush Info */}
                <div className="bg-secondary rounded-xl p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Friend's Name</p>
                      <p className="font-bold text-xl text-foreground">{selectedResponse.friendName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Their Crush</p>
                      <p className="font-bold text-xl text-primary">{selectedResponse.crushName}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-5 h-5 text-primary animate-heartbeat" fill="currentColor" />
                  </div>
                </div>

                {/* Answers */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground">Their Answers:</h3>
                  {questions.map((q) => (
                    <div 
                      key={q.id}
                      className="flex items-center justify-between bg-background/50 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{q.emoji}</span>
                        <span className="text-sm text-foreground">{q.text}</span>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                        selectedResponse.answers[q.id] 
                          ? "bg-green-500/20 text-green-600" 
                          : "bg-red-500/20 text-red-600"
                      }`}>
                        {selectedResponse.answers[q.id] ? (
                          <><Check className="w-4 h-4" /> Yes</>
                        ) : (
                          <><X className="w-4 h-4" /> No</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Submitted: {formatDate(selectedResponse.submittedAt)}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Response List */}
              {responses.length === 0 ? (
                <div className="card-romantic rounded-3xl p-8 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-xl font-bold text-foreground mb-2">No responses yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Share your prank link and wait for your friends to fall for it! 😄
                  </p>
                  <Link to="/">
                    <Button variant="romantic" className="gap-2">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      Create New Prank
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">
                      {responses.length} Friend{responses.length !== 1 ? "s" : ""} Pranked!
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
                            <p className="font-bold text-foreground">{response.friendName}</p>
                            <p className="text-sm text-primary">
                              Crush: <span className="font-semibold">{response.crushName}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(response.submittedAt)}
                          </span>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendboard;
