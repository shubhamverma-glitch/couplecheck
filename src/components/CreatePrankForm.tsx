import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles } from "lucide-react";
import HeartIcon from "./HeartIcon";

const CreatePrankForm = () => {
  const [yourName, setYourName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (yourName.trim()) {
      // Create a simple encoded link with only prankster's name
      const prankId = btoa(JSON.stringify({ yourName, createdAt: Date.now() }));
      navigate(`/link-created?id=${encodeURIComponent(prankId)}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
        {/* Decorative hearts */}
        <div className="absolute -top-4 -right-4 opacity-20">
          <HeartIcon size="xl" />
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-10">
          <HeartIcon size="lg" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HeartIcon size="md" animated />
            <h2 className="text-2xl font-bold text-gradient">Create Your Prank</h2>
            <HeartIcon size="md" animated />
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Enter your name to create a prank link. Share it with friends to discover their crush's name! 💕
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Your Name
              </label>
              <Input
                type="text"
                placeholder="Enter your name..."
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                required
                className="text-center"
              />
            </div>

            <div className="flex justify-center py-2">
              <Heart className="w-8 h-8 text-primary animate-heartbeat" fill="currentColor" />
            </div>

            <Button 
              type="submit" 
              variant="romantic" 
              size="lg" 
              className="w-full mt-6"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              Create Prank Link
              <Sparkles className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePrankForm;
