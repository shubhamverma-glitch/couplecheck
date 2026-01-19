import { useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CreatePrankForm from "@/components/CreatePrankForm";
import HeartIcon from "@/components/HeartIcon";
import { Sparkles } from "lucide-react";

const Index = () => {
  useEffect(() => {
    // Fire instruction_page event when user lands on start page
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "instruction_page" });
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HeartIcon size="lg" animated />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">ラブトラップ</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span className="text-primary font-semibold">友達の好きな人をこっそり知れる、ちょっとしたイタズラ 💕</span>
            </p>
          </div>

          {/* Main Form */}
          <CreatePrankForm />

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">楽しいイタズラのために愛を込めて作りました</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
