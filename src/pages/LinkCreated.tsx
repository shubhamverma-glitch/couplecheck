import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Copy, Check, Share2, ArrowLeft, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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

  const prankLink = `${window.location.origin}/prank?id=${encodeURIComponent(prankId)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prankLink);
      setCopied(true);
      toast.success("リンクをコピーしました！友達に共有しよう 💕");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("リンクのコピーに失敗しました");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "愛の計算機 💕",
          text: "愛のパーセンテージを計算しよう！この楽しい愛の計算機を試してみて！",
          url: prankLink,
        });
      } catch {
        // ユーザーがキャンセルしたか共有に失敗
      }
    } else {
      handleCopy();
    }
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
              リンクの準備完了！
            </h1>
            <p className="text-muted-foreground">
              このリンクを友達に共有して、魔法を見届けよう！✨
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
                <p className="text-sm text-muted-foreground mb-1">イタズラ作成者</p>
                <p className="font-bold text-xl text-foreground">{prank?.creator_name || "不明"}</p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  このリンクを友達に共有してください:
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
                  リンクをコピー
                </Button>
                <Button variant="romantic" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  共有する
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                友達がこのリンクをクリックすると、本物の「愛の計算機」だと思います。
                彼らは自分の名前、好きな人の名前を入力し、質問に答えます。
                そして、あなたがすべての秘密を受け取ったことを知ってびっくり！😏
              </p>

              <Link to={`/friendboard?id=${encodeURIComponent(prankId)}`} className="block">
                <Button variant="soft" size="lg" className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  フレンドボードを見る
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                別のイタズラを作成
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCreated;
