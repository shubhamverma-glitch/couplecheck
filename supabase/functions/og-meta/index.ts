import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Language configurations for meta tags
const languageConfigs: Record<string, {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  metaImage: string;
}> = {
  ja: {
    title: 'ラブチェック - 愛の相性診断',
    description: 'あなたの恋愛相性を診断して、本当の愛の強さを確かめよう！',
    ogTitle: '💝 恋愛診断 - 好きな人との相性をチェック 💝',
    ogDescription: '🥰 このテストで本当の恋の相手を見つけよう！ 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Japanese.png',
  },
  en: {
    title: 'Love Check - Love Compatibility Test',
    description: 'Test your love compatibility and discover the true strength of your love!',
    ogTitle: '💝 Love Test - Check Your Compatibility 💝',
    ogDescription: '🥰 Find your true love match with this test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_English.png',
  },
  ar: {
    title: 'فحص الحب - اختبار التوافق العاطفي',
    description: 'اختبر توافقك العاطفي واكتشف قوة حبك الحقيقية!',
    ogTitle: '💝 اختبار الحب - تحقق من توافقك 💝',
    ogDescription: '🥰 اكتشف شريك حياتك الحقيقي مع هذا الاختبار! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Arabic.png',
  },
  es: {
    title: 'Love Check - Test de Compatibilidad Amorosa',
    description: '¡Prueba tu compatibilidad amorosa y descubre la verdadera fuerza de tu amor!',
    ogTitle: '💝 Test de Amor - Comprueba tu Compatibilidad 💝',
    ogDescription: '🥰 ¡Encuentra tu amor verdadero con este test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Spanish.png',
  },
  fr: {
    title: 'Love Check - Test de Compatibilité Amoureuse',
    description: 'Testez votre compatibilité amoureuse et découvrez la vraie force de votre amour!',
    ogTitle: '💝 Test d\'Amour - Vérifiez Votre Compatibilité 💝',
    ogDescription: '🥰 Trouvez votre véritable âme sœur avec ce test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_French.png',
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang') || 'ja';
    const config = languageConfigs[lang] || languageConfigs.ja;

    return new Response(JSON.stringify(config), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
