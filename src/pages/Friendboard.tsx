import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft, Users, Eye, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

const questions = [
  { id: "kiss", text: "好きな人にキスしたことがありますか？", emoji: "💋" },
  { id: "date", text: "好きな人とデートしたことがありますか？", emoji: "🌹" },
  { id: "dream", text: "好きな人の夢を見ますか？", emoji: "💭" },
  { id: "stalk", text: "よくSNSをチェックしますか？", emoji: "📱" },
  { id: "jealous", text: "他の人と話しているのを見ると嫉妬しますか？", emoji: "😤" },
  { id: "confess", text: "気持ちを告白しようとしたことがありますか？", emoji: "💌" },
];

const Friendboard = () => {
  const [searchParams] = useSearchParams();
  const prankId = searchParams.get("id") || "";
  const [responses, setResponses] = useState<PrankResponse[]>([]);
  const [prank, setPrank] = useState<Prank | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<PrankResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!prankId) {
        setIsLoading(false);
        return;
      }

      // イタズラ情報を取得
      const { data: prankData } = await supabase
        .from("pranks")
        .select("*")
        .eq("id", prankId)
        .maybeSingle();

      if (prankData) {
        setPrank(prankData);
      }

      // 回答を取得
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
    return new Date(dateString).toLocaleDateString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div className="max-w-2xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              フレンドボード
            </h1>
            <p className="text-muted-foreground">
              誰があなたのイタズラに引っかかったか見よう！😏
            </p>
            {prank && (
              <p className="text-sm text-primary mt-2">
                イタズラ作成者: <span className="font-bold">{prank.creator_name}</span>
              </p>
            )}
          </div>

          {/* 選択された回答の詳細 */}
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
                  リストに戻る
                </Button>

                {/* 友達と好きな人の情報 */}
                <div className="bg-secondary rounded-xl p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">友達の名前</p>
                      <p className="font-bold text-xl text-foreground">{selectedResponse.friend_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">好きな人</p>
                      <p className="font-bold text-xl text-primary">{selectedResponse.crush_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart className="w-5 h-5 text-primary animate-heartbeat" fill="currentColor" />
                  </div>
                </div>

                {/* 回答 */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-foreground">回答:</h3>
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
                          <><Check className="w-4 h-4" /> はい</>
                        ) : (
                          <><X className="w-4 h-4" /> いいえ</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  送信日時: {formatDate(selectedResponse.submitted_at)}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* 回答リスト */}
              {responses.length === 0 ? (
                <div className="card-romantic rounded-3xl p-8 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h2 className="text-xl font-bold text-foreground mb-2">まだ回答がありません</h2>
                  <p className="text-muted-foreground mb-6">
                    イタズラリンクを共有して、友達が引っかかるのを待とう！😄
                  </p>
                  <Link to="/">
                    <Button variant="romantic" className="gap-2">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      新しいイタズラを作成
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground">
                      {responses.length}人の友達がイタズラされました！
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
                              好きな人: <span className="font-semibold">{response.crush_name}</span>
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
                </div>
              )}
            </>
          )}

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendboard;
