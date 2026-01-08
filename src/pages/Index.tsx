import FloatingHearts from "@/components/FloatingHearts";
import CreatePrankForm from "@/components/CreatePrankForm";
import HeartIcon from "@/components/HeartIcon";
import { Heart, Sparkles, Share2, Eye } from "lucide-react";

const Index = () => {
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
              <span className="text-gradient">Love Trap</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create a fun prank link and discover what your friends 
              <span className="text-primary font-semibold"> really think </span> 
              about their crush! 💕
            </p>
          </div>

          {/* Main Form */}
          <CreatePrankForm />

          {/* How it works */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gradient mb-8">
              How It Works
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-romantic rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-primary" fill="currentColor" />
                </div>
                <h4 className="font-bold text-lg mb-2">1. Create Link</h4>
                <p className="text-muted-foreground text-sm">
                  Enter your name and your crush's name to generate a secret link
                </p>
              </div>

              <div className="card-romantic rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2">2. Share It</h4>
                <p className="text-muted-foreground text-sm">
                  Send the link to your friend - they'll see a "Love Calculator"
                </p>
              </div>

              <div className="card-romantic rounded-2xl p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2">3. See Secrets</h4>
                <p className="text-muted-foreground text-sm">
                  They answer fun questions - you see their crush's name revealed!
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">Made with love for fun pranks</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
