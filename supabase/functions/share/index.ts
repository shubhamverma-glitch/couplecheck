import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const languageConfigs: Record<string, { metaImage: string; title: string; ogTitle: string; ogDescription: string }> = {
  en: {
    metaImage: "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg",
    title: "Love Check - Love Compatibility Test",
    ogTitle: "💝 Love Calculator - Check Your Compatibility 💝",
    ogDescription: "Valentine week just got intensified ❤️ This Love calculator shows your true compatibility % 😳 Check your score NOW👇",
  },
  ar: {
    metaImage: "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg",
    title: "اختبار الحب - اختبار التوافق في الحب",
    ogTitle: "💝 حاسبة الحب - تحقق من توافقك 💝",
    ogDescription: "أسبوع الفالنتاين صار أقوى ❤️ حاسبة الحب هذي تبين نسبة توافقكم الحقيقية % 😳 شيك على نتيجتك الحين👇",
  },
  es: {
    metaImage: "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg",
    title: "Love Check - Test de Compatibilidad Amorosa",
    ogTitle: "💝 Test de Amor - Comprueba Tu Compatibilidad 💝",
    ogDescription: "🥰 ¡Encuentra tu pareja ideal con este test! 🥰",
  },
  fr: {
    metaImage: "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg",
    title: "Love Check - Test de Compatibilité Amoureuse",
    ogTitle: "💝 Test d'Amour - Vérifie Ta Compatibilité 💝",
    ogDescription: "🥰 Trouve ton âme sœur avec ce test ! 🥰",
  },
  ja: {
    metaImage: "https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg",
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
