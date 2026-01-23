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
  shareText: string;
}> = {
  ja: {
    title: 'ラブチェック - 愛の相性診断',
    description: 'あなたの恋愛相性を診断して、本当の愛の強さを確かめよう！',
    ogTitle: '💝 恋愛診断 - 好きな人との相性をチェック 💝',
    ogDescription: '🥰 このテストで本当の恋の相手を見つけよう！ 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Japanese.png',
    shareText: '💝👩‍❤️‍👨 *本当の愛*か*ただの片思い*か？ 👩‍❤️‍👩💝\n🥰 このテストで本当の恋の相手を見つけよう！ 🥰',
  },
  en: {
    title: 'Love Check - Love Compatibility Test',
    description: 'Test your love compatibility and discover the true strength of your love!',
    ogTitle: '💝 Love Test - Check Your Compatibility 💝',
    ogDescription: '🥰 Find your true love match with this test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_English.png',
    shareText: '💝👩‍❤️‍👨 *True Love* or *Just a Crush*? 👩‍❤️‍👩💝\n🥰 Find your true love match with this test! 🥰',
  },
  ar: {
    title: 'فحص الحب - اختبار التوافق العاطفي',
    description: 'اختبر توافقك العاطفي واكتشف قوة حبك الحقيقية!',
    ogTitle: '💝 اختبار الحب - تحقق من توافقك 💝',
    ogDescription: '🥰 اكتشف شريك حياتك الحقيقي مع هذا الاختبار! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Arabic.png',
    shareText: '💝👩‍❤️‍👨 *حب حقيقي* أم *مجرد إعجاب*؟ 👩‍❤️‍👩💝\n🥰 اكتشف شريك حياتك الحقيقي مع هذا الاختبار! 🥰',
  },
  es: {
    title: 'Love Check - Test de Compatibilidad Amorosa',
    description: '¡Prueba tu compatibilidad amorosa y descubre la verdadera fuerza de tu amor!',
    ogTitle: '💝 Test de Amor - Comprueba tu Compatibilidad 💝',
    ogDescription: '🥰 ¡Encuentra tu amor verdadero con este test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Spanish.png',
    shareText: '💝👩‍❤️‍👨 *¿Amor Verdadero* o *Solo un Crush*? 👩‍❤️‍👩💝\n🥰 ¡Encuentra tu amor verdadero con este test! 🥰',
  },
  fr: {
    title: 'Love Check - Test de Compatibilité Amoureuse',
    description: 'Testez votre compatibilité amoureuse et découvrez la vraie force de votre amour!',
    ogTitle: '💝 Test d\'Amour - Vérifiez Votre Compatibilité 💝',
    ogDescription: '🥰 Trouvez votre véritable âme sœur avec ce test! 🥰',
    metaImage: 'https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_French.png',
    shareText: '💝👩‍❤️‍👨 *Vrai Amour* ou *Juste un Crush*? 👩‍❤️‍👩💝\n🥰 Trouvez votre véritable âme sœur avec ce test! 🥰',
  },
};

// Detect language from URL path
const detectLanguageFromPath = (path: string): string => {
  const langMatch = path.match(/^\/(en|ar|es|fr|ja)/);
  return langMatch ? langMatch[1] : 'ja';
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.searchParams.get('path') || '/';
    const format = url.searchParams.get('format') || 'json';
    const lang = url.searchParams.get('lang') || detectLanguageFromPath(path);
    const config = languageConfigs[lang] || languageConfigs.ja;

    // Return JSON for API calls
    if (format === 'json') {
      return new Response(JSON.stringify(config), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Return full HTML for social crawlers
    const baseUrl = 'https://couplecheck.lovable.app';
    const fullUrl = `${baseUrl}${path}`;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const html = `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <meta name="description" content="${config.description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${config.ogTitle}">
  <meta property="og:description" content="${config.ogDescription}">
  <meta property="og:image" content="${config.metaImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${config.ogTitle}">
  <meta name="twitter:description" content="${config.ogDescription}">
  <meta name="twitter:image" content="${config.metaImage}">
  
  <!-- Redirect to actual app -->
  <meta http-equiv="refresh" content="0;url=${fullUrl}">
  <link rel="canonical" href="${fullUrl}">
</head>
<body>
  <p>Redirecting to <a href="${fullUrl}">${config.title}</a>...</p>
</body>
</html>`;

    return new Response(html, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('OG Meta error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
