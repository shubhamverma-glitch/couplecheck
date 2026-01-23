import { useEffect } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import CreatePrankForm from "@/components/CreatePrankForm";
import HeartIcon from "@/components/HeartIcon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "instruction_page" });
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />

      {/* Language Switcher */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HeartIcon size="lg" animated />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">{t('index.title')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              <span className="text-primary font-semibold">{t('index.subtitle')}</span>
            </p>
          </div>

          <CreatePrankForm />

          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">{t('index.footer')}</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
