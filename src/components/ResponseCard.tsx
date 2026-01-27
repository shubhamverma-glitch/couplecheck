import { Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ResponseCardProps {
  friendName: string;
  crushName: string;
  index: number;
}

const ResponseCard = ({ friendName, crushName, index }: ResponseCardProps) => {
  const { t } = useLanguage();
  
  return (
    <div 
      className="group relative bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/30 rounded-2xl p-4 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Sparkle decoration */}
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Avatar with heart */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-primary-foreground">
              {friendName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background flex items-center justify-center shadow-sm">
            <Heart className="w-3 h-3 text-primary" fill="currentColor" />
          </div>
        </div>
        
        {/* Names */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground truncate text-lg">
            {friendName}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{t('linkCreated.loves') || 'loves'}</span>
            <span className="font-semibold text-primary truncate flex items-center gap-1">
              <Heart className="w-3 h-3 inline" fill="currentColor" />
              {crushName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseCard;
