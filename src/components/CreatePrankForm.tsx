import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Loader2 } from "lucide-react";
import HeartIcon from "./HeartIcon";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const CreatePrankForm = () => {
  const [yourName, setYourName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, getLocalizedPath } = useLanguage();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourName.trim()) {
      toast.error(t('form.enterName'));
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("pranks").insert({
        creator_name: yourName.trim(),
        crush_name: ""
      }).select().single();
      if (error) throw error;
      navigate(getLocalizedPath(`/link-created?id=${data.id}`));
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error(t('form.error'));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-romantic rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 opacity-20">
          <HeartIcon size="xl" />
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-10">
          <HeartIcon size="lg" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HeartIcon size="md" animated />
            <h2 className="text-2xl font-bold text-gradient">{t('index.title')}</h2>
            <HeartIcon size="md" animated />
          </div>

          <p className="text-center text-muted-foreground mb-8">
            {t('index.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('form.yourName')}
              </label>
              <Input
                type="text"
                placeholder={t('form.namePlaceholder')}
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                required
                className="text-center"
              />
            </div>

            <Button
              type="submit"
              variant="romantic"
              size="lg"
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('form.creating')}
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" fill="currentColor" />
                  {t('form.createLink')}
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePrankForm;
