import { useLanguage } from "@/i18n/LanguageContext";

const ArabicAdBanner = () => {
  const { language } = useLanguage();

  // Only show for Arabic language
  if (language !== 'ar') {
    return null;
  }

  return (
    <div className="w-full flex justify-center py-4 px-4">
      <a 
        href="https://ar.friendsforlife.me/اختبار-الصداقة-لأفضل-صديق-للأبد/play/2183"
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-md w-full"
      >
        <img 
          src="http://img.holaquiz.com//public/site_content/quiz/ck_editor/images/ads_custom/FFL_Two_Arabic.jpg"
          alt="إعلان"
          className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </a>
    </div>
  );
};

export default ArabicAdBanner;
