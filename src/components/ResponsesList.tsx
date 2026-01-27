import { Heart, RefreshCw, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import ResponseCard from "./ResponseCard";

interface PrankResponse {
  id: string;
  friend_name: string;
  crush_name: string;
  submitted_at: string;
}

interface ResponsesListProps {
  responses: PrankResponse[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

const ResponsesList = ({ responses, isRefreshing, onRefresh }: ResponsesListProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            {responses.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm animate-pulse">
                <span className="text-xs font-bold text-primary-foreground">{responses.length}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">
              {t('linkCreated.caughtSecrets') || "Caught Secrets"} 🤫
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('linkCreated.secretsHint') || "See who fell for your trap!"}
            </p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
          className="gap-2 hover:bg-primary/10"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {t('linkCreated.refresh') || "Refresh"}
        </Button>
      </div>
      
      {/* Responses List */}
      {responses.length === 0 ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-accent/20 to-primary/10 rounded-2xl p-8 text-center border border-dashed border-primary/30">
          {/* Floating hearts background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Heart className="absolute top-4 left-8 w-4 h-4 text-primary/20 animate-float" style={{ animationDelay: '0s' }} />
            <Heart className="absolute top-8 right-12 w-3 h-3 text-primary/15 animate-float" style={{ animationDelay: '0.5s' }} />
            <Heart className="absolute bottom-6 left-16 w-5 h-5 text-primary/10 animate-float" style={{ animationDelay: '1s' }} />
            <Heart className="absolute bottom-4 right-8 w-4 h-4 text-primary/20 animate-float" style={{ animationDelay: '1.5s' }} />
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-2">
              {t('linkCreated.waitingForSecrets') || "Waiting for secrets..."}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('linkCreated.shareLinkHint') || "Share your link to catch some crushes! 💕"}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
          {responses.map((response, index) => (
            <ResponseCard
              key={response.id}
              friendName={response.friend_name}
              crushName={response.crush_name}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponsesList;
