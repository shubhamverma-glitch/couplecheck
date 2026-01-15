import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Result = () => {
  const [searchParams] = useSearchParams();
  const [showReveal, setShowReveal] = useState(false);
  const [pranksterName, setPranksterName] = useState("");
  
  let resultData = {
    prankId: "",
    friendName: "",
    crushName: "",
    answers: {} as Record<string, boolean>,
  };
  
  try {
    const data = JSON.parse(atob(searchParams.get("data") || ""));
    resultData = {
      ...resultData,
      ...data
    };
  } catch {
    // 無効なデータ
  }

  useEffect(() => {
    // データベースからイタズラ作成者の名前を取得
    const fetchPranksterName = async () => {
      if (resultData.prankId) {
        const { data } = await supabase
          .from("pranks")
          .select("creator_name")
          .eq("id", resultData.prankId)
          .maybeSingle();
        
        if (data?.creator_name) {
          setPranksterName(data.creator_name);
        }
      }
    };
    
    fetchPranksterName();
    
    // 少しのサスペンスの後にイタズラを明かす
    const timer = setTimeout(() => setShowReveal(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {/* 明かす前のローディング状態 */}
          {!showReveal && (
            <div className="text-center">
              <div className="card-romantic rounded-3xl p-8">
                <Heart className="w-16 h-16 text-primary mx-auto animate-heartbeat mb-4" fill="currentColor" />
                <h2 className="text-2xl font-bold text-gradient mb-2">愛を計算中...</h2>
                <p className="text-muted-foreground">相性を分析しています。お待ちください 💕</p>
              </div>
            </div>
          )}

          {/* イタズラの公開 */}
          {showReveal && (
            <>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {pranksterName}に騙されました！😂
                </h1>
                <p className="text-muted-foreground">
                  あなたの名前と好きな人の名前が<span className="text-primary font-bold">{pranksterName}</span>に共有されました
                </p>
              </div>

              <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 opacity-20">
                  <HeartIcon size="xl" />
                </div>

                <div className="relative z-10 space-y-6">
                  {/* かわいいキャラクター/絵文字 */}
                  <div className="text-center">
                    <div className="text-8xl mb-4">🙈</div>
                  </div>

                  {/* 公開された情報 */}
                  <div className="bg-secondary rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">あなたの名前:</span>
                      <span className="font-bold text-foreground">{resultData.friendName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">好きな人:</span>
                      <span className="font-bold text-primary">{resultData.crushName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">イタズラした人:</span>
                      <span className="font-bold text-foreground">{pranksterName}</span>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-lg font-semibold text-foreground mb-2">
                      😏 {pranksterName}があなたの秘密の片思いを知っています！
                    </p>
                    <p className="text-sm text-muted-foreground">
                      心配しないで、これはただの楽しいイタズラです！今度はあなたの番です！
                    </p>
                  </div>

                  {/* 自分のイタズラを作成するCTA */}
                  <div className="space-y-4">
                    <div className="bg-primary/10 rounded-xl p-4 text-center my-[20px]">
                      <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">
                        今すぐ登録して友達にイタズラしよう！
                      </p>
                    </div>

                    <Link to="/">
                      <Button variant="romantic" size="lg" className="w-full gap-2">
                        <Heart className="w-5 h-5" fill="currentColor" />
                        自分のイタズラリンクを作成
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link to="/">
                  <Button variant="ghost" className="gap-2">
                    <Home className="w-4 h-4" />
                    ホームへ戻る
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
