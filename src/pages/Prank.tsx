import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import HeartIcon from "@/components/HeartIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, ArrowRight, Check, X } from "lucide-react";

interface Question {
  id: string;
  text: string;
  emoji: string;
}

const questions: Question[] = [
  { id: "kiss", text: "Have you ever kissed your crush?", emoji: "💋" },
  { id: "date", text: "Have you been on a date with your crush?", emoji: "🌹" },
  { id: "dream", text: "Do you dream about your crush?", emoji: "💭" },
  { id: "stalk", text: "Do you check their social media often?", emoji: "📱" },
  { id: "jealous", text: "Do you get jealous when they talk to others?", emoji: "😤" },
  { id: "confess", text: "Have you ever tried to confess your feelings?", emoji: "💌" },
];

const Prank = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const prankId = searchParams.get("id") || "";
  
  const [step, setStep] = useState<"name" | "crush" | "questions">("name");
  const [friendName, setFriendName] = useState("");
  const [crushName, setCrushName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  let prankData = { yourName: "" };
  try {
    prankData = JSON.parse(atob(prankId));
  } catch {
    // Invalid data
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (friendName.trim()) {
      setStep("crush");
    }
  };

  const handleCrushSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crushName.trim()) {
      setStep("questions");
    }
  };

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions answered, navigate to results
      const resultData = btoa(JSON.stringify({
        prankId,
        friendName,
        crushName,
        answers: { ...answers, [currentQuestion.id]: answer },
      }));
      navigate(`/result?data=${encodeURIComponent(resultData)}`);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              Love Calculator
            </h1>
            <p className="text-muted-foreground">
              Find out your true love percentage! 💕
            </p>
          </div>

          <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 opacity-20">
              <HeartIcon size="xl" />
            </div>

            <div className="relative z-10">
              {/* Step 1: Enter Name */}
              {step === "name" && (
                <form onSubmit={handleNameSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
                    <h2 className="text-xl font-bold">Welcome!</h2>
                    <p className="text-muted-foreground text-sm">
                      Let's calculate your love compatibility
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      What's your name?
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name..."
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      required
                      className="text-center"
                    />
                  </div>

                  <Button type="submit" variant="romantic" size="lg" className="w-full gap-2">
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>
              )}

              {/* Step 2: Enter Crush Name */}
              {step === "crush" && (
                <form onSubmit={handleCrushSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <Heart className="w-10 h-10 text-primary mx-auto mb-3 animate-heartbeat" fill="currentColor" />
                    <h2 className="text-xl font-bold">Hey, {friendName}! 👋</h2>
                    <p className="text-muted-foreground text-sm">
                      Now tell us about your crush
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">
                      What's your crush's name?
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter their name..."
                      value={crushName}
                      onChange={(e) => setCrushName(e.target.value)}
                      required
                      className="text-center"
                    />
                  </div>

                  <Button type="submit" variant="romantic" size="lg" className="w-full gap-2">
                    Let's Find Out
                    <Heart className="w-5 h-5" fill="currentColor" />
                  </Button>
                </form>
              )}

              {/* Step 3: Questions */}
              {step === "questions" && (
                <div className="space-y-6">
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</span>
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
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {currentQuestion.text}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      About <span className="text-primary font-semibold">{crushName}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="soft" 
                      size="lg" 
                      onClick={() => handleAnswer(false)}
                      className="gap-2"
                    >
                      <X className="w-5 h-5" />
                      No
                    </Button>
                    <Button 
                      variant="romantic" 
                      size="lg" 
                      onClick={() => handleAnswer(true)}
                      className="gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Yes
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
