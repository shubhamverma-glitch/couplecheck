import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Check, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  emoji: string;
}

const questions: Question[] = [
  { id: "date", text: "{CRUSH_NAME}とデートしたい？", emoji: "💑" },
  { id: "fake", text: "もし{CRUSH_NAME}が偽の恋人になってほしいと言ったら、OKする？", emoji: "🎭" },
  { id: "dream", text: "{CRUSH_NAME}の夢を見る？", emoji: "💭" },
  { id: "spark", text: "一緒にいるとき、小さな瞬間でもドキドキする？", emoji: "✨" },
  { id: "confess", text: "{CRUSH_NAME}に告白しようとしたことある？", emoji: "💌" },
];

const Prank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const prankId = searchParams.get("id") || "";

  const [step, setStep] = useState<"loading" | "info" | "questions">("loading");
  const [friendName, setFriendName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prankExists, setPrankExists] = useState(true);

  useEffect(() => {
    // Fire user_friend event when friend lands on love page
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "user_friend" });

    const checkPrank = async () => {
      if (!prankId) {
        setPrankExists(false);
        setStep("info");
        return;
      }

      const { data, error } = await supabase.from("pranks").select("id").eq("id", prankId).maybeSingle();

      if (error || !data) {
        setPrankExists(false);
      }
      setStep("info");
    };

    checkPrank();
  }, [prankId]);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName.trim() && crushName.trim()) {
      setStep("questions");
    }
  };

  const handleAnswer = async (answer: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Save to database
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from("prank_responses").insert({
          prank_id: prankId,
          friend_name: friendName.trim(),
          crush_name: crushName.trim(),
          answers: newAnswers,
        });

        if (error) throw error;

        // Navigate to result
        const resultData = btoa(
          JSON.stringify({
            prankId,
            friendName,
            crushName,
            answers: newAnswers,
          }),
        );
        navigate(`/result?data=${encodeURIComponent(resultData)}`);
      } catch (error) {
        console.error("Error saving response:", error);
        toast.error("回答の保存に失敗しました。もう一度お試しください。");
        setIsSubmitting(false);
      }
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Replace {CRUSH_NAME} with actual crush name in question text
  const getQuestionText = (text: string) => {
    return text.replace(/{CRUSH_NAME}/g, crushName);
  };

  if (step === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!prankExists) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingHearts />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <HeartIcon size="lg" animated />
          <h1 className="text-2xl font-bold mt-4 mb-2">リンクが見つかりません</h1>
          <p className="text-muted-foreground">このリンクは無効か、期限切れです。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HeartIcon size="lg" animated />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">💖 恋愛診断</h1>
            <p className="text-muted-foreground">あなたの恋の強さを確かめよう 💘</p>

            {/* Social Proof */}
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-pink-400 border-2 border-white flex items-center justify-center text-xs">
                  👩
                </span>
                <span className="w-6 h-6 rounded-full bg-rose-400 border-2 border-white flex items-center justify-center text-xs">
                  👨
                </span>
                <span className="w-6 h-6 rounded-full bg-red-400 border-2 border-white flex items-center justify-center text-xs">
                  💕
                </span>
              </span>
              <span>すでに200万人以上が試しています！</span>
            </div>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10">
              {/* Step 1: Enter both names on same page */}
              {step === "info" && (
                <form onSubmit={handleInfoSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h2 className="text-xl font-bold">ようこそ！</h2>
                    <p className="text-muted-foreground text-sm">あなたの恋愛相性を診断しよう 💘</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">あなたの名前</label>
                      <Input
                        type="text"
                        placeholder="ここに名前を入力してね"
                        value={friendName}
                        onChange={(e) => setFriendName(e.target.value)}
                        required
                        className="text-center"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-3 py-2">
                      <div className="h-px bg-border flex-1" />
                      <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                      <div className="h-px bg-border flex-1" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">好きな人の名前は？ 😁</label>
                      <Input
                        type="text"
                        placeholder="好きな人の名前を入力してね 👀"
                        value={crushName}
                        onChange={(e) => setCrushName(e.target.value)}
                        required
                        className="text-center"
                      />
                    </div>
                  </div>

                  <Button type="submit" variant="romantic" size="lg" className="w-full gap-2">
                    😍 相性をチェック
                    <Heart className="w-5 h-5" fill="currentColor" />
                  </Button>
                </form>
              )}

              {/* Step 2: Questions */}
              {step === "questions" && (
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        質問 {currentQuestionIndex + 1} / {questions.length}
                      </span>
                      <span className="text-primary font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">{currentQuestion.emoji}</div>
                    <h2 className="text-xl font-bold text-foreground mb-2">{getQuestionText(currentQuestion.text)}</h2>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-semibold">{crushName}</span>について
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="soft"
                      size="lg"
                      onClick={() => handleAnswer(false)}
                      className="gap-2"
                      disabled={isSubmitting}
                    >
                      <X className="w-5 h-5" />
                      いいえ
                    </Button>
                    <Button
                      variant="romantic"
                      size="lg"
                      onClick={() => handleAnswer(true)}
                      className="gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                      はい
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prank;
