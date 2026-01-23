import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const languageConfigs: Record<string, { metaImage: string; title: string; ogTitle: string; ogDescription: string }> = {
  en: {
    metaImage: "https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Arabic.png",
    title: "Love Check - Love Compatibility Test",
    ogTitle: "💝 Love Test - Check Your Compatibility 💝",
    ogDescription: "🥰 Find your true love match with this test! 🥰",
  },
  ar: {
    metaImage: "https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Arabic.png",
    title: "اختبار الحب - اختبار التوافق في الحب",
    ogTitle: "💝 اختبار الحب - تحقق من توافقك 💝",
    ogDescription: "🥰 اكتشف شريكك الحقيقي مع هذا الاختبار! 🥰",
  },
  es: {
    metaImage: "https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Spanish.png",
    title: "Love Check - Test de Compatibilidad Amorosa",
    ogTitle: "💝 Test de Amor - Comprueba Tu Compatibilidad 💝",
    ogDescription: "🥰 ¡Encuentra tu pareja ideal con este test! 🥰",
  },
  fr: {
    metaImage: "https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_French.png",
    title: "Love Check - Test de Compatibilité Amoureuse",
    ogTitle: "💝 Test d'Amour - Vérifie Ta Compatibilité 💝",
    ogDescription: "🥰 Trouve ton âme sœur avec ce test ! 🥰",
  },
  ja: {
    metaImage: "https://img.bakequiz.com/public/site_content/quiz/ck_editor/images/lovemeter/LC_Meta_Japanese.png",
    title: "ラブチェック - 愛の相性診断",
    ogTitle: "💝 恋愛診断 - 好きな人との相性をチェック 💝",
    ogDescription: "🥰 このテストで本当の恋の相手を見つけよう！ 🥰",
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const lang = url.searchParams.get("lang") || "en";
    const path = url.searchParams.get("path") || "/";
    const id = url.searchParams.get("id") || "";

    const config = languageConfigs[lang] || languageConfigs.en;
    
    // Build the redirect URL
    const baseUrl = "https://couplecheck.lovable.app";
    const langPrefix = lang === "ja" ? "" : `/${lang}`;
    const queryString = id ? `?id=${id}` : "";
    const redirectUrl = `${baseUrl}${langPrefix}${path}${queryString}`;

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title}</title>
  <meta name="description" content="${config.ogDescription}" />
  
  <meta property="og:title" content="${config.ogTitle}" />
  <meta property="og:description" content="${config.ogDescription}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${config.metaImage}" />
  <meta property="og:url" content="${redirectUrl}" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${config.ogTitle}" />
  <meta name="twitter:description" content="${config.ogDescription}" />
  <meta name="twitter:image" content="${config.metaImage}" />
  
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <script>window.location.href = "${redirectUrl}";</script>
</head>
<body>
  <p>Redirecting to <a href="${redirectUrl}">${redirectUrl}</a>...</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
