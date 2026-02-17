export type Language = 'ja' | 'en' | 'ar' | 'es' | 'fr';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  metaImage: string;
}

// Configure meta images per language here
export const languageConfigs: Record<Language, LanguageConfig> = {
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    dir: 'ltr',
    metaImage: 'https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    metaImage: 'https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    metaImage: 'https://img.myfriendshipquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_ar_800x420.jpg',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    dir: 'ltr',
    metaImage: 'https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    dir: 'ltr',
    metaImage: 'https://img.holaquiz.com/public/site_content/quiz/ck_editor/images/love_calculator_meta_800x420.jpg',
  },
};

export const translations: Record<Language, Record<string, string>> = {
  ja: {
    // Meta
    'meta.title': 'ラブチェック - 愛の相性診断',
    'meta.description': 'バレンタインウィークがもっと熱くなった ❤️ この恋愛計算機であなたの本当の相性%がわかる 😳 今すぐスコアをチェック👇',
    'meta.ogTitle': '💝 恋愛計算機 - あなたの相性をチェック 💝',
    'meta.ogDescription': 'バレンタインウィークがもっと熱くなった ❤️ この恋愛計算機であなたの本当の相性%がわかる 😳 今すぐスコアをチェック👇',
    
    // Index page
    'index.title': 'ラブトラップ',
    'index.subtitle': '友達の好きな人をこっそり知れる、ちょっとしたイタズラ 💕',
    'index.footer': '楽しいイタズラのために愛を込めて作りました',
    
    // Create form
    'form.yourName': 'あなたの名前',
    'form.namePlaceholder': '名前を入力してください',
    'form.createLink': '💕 ラブトラップを作成',
    'form.creating': '作成中...',
    'form.enterName': '名前を入力してください',
    'form.error': 'トラップの作成に失敗しました',
    
    // Link created
    'linkCreated.title': '💖 ラブトラップ完成！',
    'linkCreated.subtitle': 'このリンクを友達に共有して、恋の秘密を暴いちゃおう ✨💌',
    'linkCreated.creator': '😏 トラップ作成者',
    'linkCreated.shareLabel': '💕 友達に共有しよう',
    'linkCreated.shareHint': '友達には楽しいクイズ…あなたには大きな秘密の暴露 🤭💗',
    'linkCreated.copyLink': '📋 リンクをコピー',
    'linkCreated.share': '💌 シェア',
    'linkCreated.shareVia': 'シェア先:',
    'linkCreated.viewResponses': '💕 友達の回答を見る',
    'linkCreated.copied': 'リンクをコピーしました！友達に共有しよう 💕',
    'linkCreated.copyFailed': 'リンクのコピーに失敗しました',
    
    // Prank page
    'prank.title': '💝 恋愛相性診断 💝',
    'prank.subtitle': 'あなたと好きな人の相性を診断しよう！',
    'prank.socialProof': '2,000人以上が相性診断を試しました！',
    'prank.yourName': 'あなたの名前',
    'prank.crushName': '好きな人の名前',
    'prank.namePlaceholder': '名前を入力',
    'prank.crushPlaceholder': '好きな人の名前を入力',
    'prank.startQuiz': '💕 計算する！',
    'prank.fillBoth': '両方の名前を入力してください',
    'prank.answerQuestions': '質問に答えてね 💕',
    'prank.questionOf': '質問',
    'prank.yes': 'はい 💕',
    'prank.no': 'いいえ 💔',
    'prank.calculating': '相性計算中...',
    'prank.analyzingCompatibility': 'あなたと{crushName}の相性を分析しています 💕',
    'prank.error': '回答の送信に失敗しました',
    
    // Questions
    'question.thinkOften': '{crushName}のことをよく考えますか？',
    'question.nervousAround': '{crushName}の近くにいると緊張しますか？',
    'question.dreamAbout': '{crushName}の夢を見たことがありますか？',
    'question.smileWhenSee': '{crushName}を見ると自然と笑顔になりますか？',
    'question.talkForHours': '{crushName}と何時間でも話していたいですか？',
    
    // Result page
    'result.calculating': '相性を計算中...',
    'result.analyzing': 'あなたの相性を分析しています。少々お待ちください 💕',
    'result.trapped': 'トラップでした 😭',
    'result.secretRevealed': 'あなたの秘密、バレちゃいました 😏',
    'result.yourName': '👀 あなたの名前:',
    'result.yourCrush': 'あなたの好きな人:',
    'result.gotYourSecret': '😳 {pranksterName}があなたの秘密の好きな人を知っちゃった！',
    'result.justPrank': '大丈夫、これはただの楽しいトラップだよ！今度はあなたの番！',
    'result.yourTurn': '今度は友達をトラップにかける番 😈🔥',
    'result.createOwn': '🔥 自分のトラップを作る',
    'result.wantRevenge': '仕返ししたい',
    
    // Friendboard
    'friendboard.title': '💕 友達の回答',
    'friendboard.createdBy': '作成者:',
    'friendboard.noResponses': 'まだ回答がありません',
    'friendboard.shareToGet': '友達にリンクを共有して、回答をもらおう！',
    'friendboard.responses': '件の回答',
    'friendboard.back': '← 戻る',
    'friendboard.crush': '好きな人:',
    'friendboard.submittedAt': '回答日時:',
    'friendboard.answers': '回答:',
    
    // Not found
    'notFound.title': '404',
    'notFound.message': 'おっと！このページは存在しません',
    'notFound.backHome': 'ホームに戻る',
    
    // Share text
    'share.text': '💝👩‍❤️‍👨 バレンタインウィークがもっと熱くなった ❤️ 👩‍❤️‍👩💝\nこの恋愛計算機であなたの本当の相性%がわかる 😳\n今すぐスコアをチェック👇\n🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩',
  },
  
  en: {
    // Meta
    'meta.title': 'Love Check - Love Compatibility Test',
    'meta.description': 'Valentine week just got intensified ❤️ This Love calculator shows your true compatibility % 😳 Check your score NOW👇',
    'meta.ogTitle': '💖 Love Calculator - Find Your Match! 💖',
    'meta.ogDescription': 'Is it meant to be? 😳 See your true compatibility score in seconds!',
    
    // Index page
    'index.title': 'Love Trap',
    'index.subtitle': "Secretly discover your friend's crush with a fun prank 💕",
    'index.footer': 'Made with love for fun pranks',
    
    // Create form
    'form.yourName': 'Your Name',
    'form.namePlaceholder': 'Enter your name',
    'form.createLink': '💕 Create Love Trap',
    'form.creating': 'Creating...',
    'form.enterName': 'Please enter your name',
    'form.error': 'Failed to create trap',
    
    // Link created
    'linkCreated.title': '💖 Love Trap Ready!',
    'linkCreated.subtitle': 'Share this link with friends and discover their secret crush ✨💌',
    'linkCreated.creator': '😏 Trap Creator',
    'linkCreated.shareLabel': '💕 Share with friends',
    'linkCreated.shareHint': "For them it's a fun quiz... for you it's a big secret reveal 🤭💗",
    'linkCreated.copyLink': '📋 Copy Link',
    'linkCreated.share': '💌 Share',
    'linkCreated.shareVia': 'Share via:',
    'linkCreated.viewResponses': "💕 View Friends' Responses",
    'linkCreated.copied': 'Link copied! Share it with friends 💕',
    'linkCreated.copyFailed': 'Failed to copy link',
    
    // Prank page
    'prank.title': '💝 Love Compatibility Test 💝',
    'prank.subtitle': 'Test your compatibility with your crush!',
    'prank.socialProof': '2,000+ people checked their love compatibility!',
    'prank.yourName': 'Your Name',
    'prank.crushName': "Your Crush's Name",
    'prank.namePlaceholder': 'Enter your name',
    'prank.crushPlaceholder': "Enter your crush's name",
    'prank.startQuiz': '💕 Calculate!',
    'prank.fillBoth': 'Please fill in both names',
    'prank.answerQuestions': 'Answer the questions 💕',
    'prank.questionOf': 'Question',
    'prank.yes': 'Yes 💕',
    'prank.no': 'No 💔',
    'prank.calculating': 'Calculating compatibility...',
    'prank.analyzingCompatibility': 'Analyzing your compatibility with {crushName} 💕',
    'prank.error': 'Failed to submit response',
    
    // Questions
    'question.thinkOften': 'Do you often think about {crushName}?',
    'question.nervousAround': 'Do you get nervous around {crushName}?',
    'question.dreamAbout': 'Have you ever dreamed about {crushName}?',
    'question.smileWhenSee': 'Do you naturally smile when you see {crushName}?',
    'question.talkForHours': 'Would you want to talk with {crushName} for hours?',
    
    // Result page
    'result.calculating': 'Calculating compatibility...',
    'result.analyzing': 'Analyzing your compatibility. Please wait 💕',
    'result.trapped': "You've been trapped! 😭",
    'result.secretRevealed': 'Your secret has been revealed 😏',
    'result.yourName': '👀 Your name:',
    'result.yourCrush': 'Your crush:',
    'result.gotYourSecret': '😳 {pranksterName} now knows your secret crush!',
    'result.justPrank': "Don't worry, it's just a fun prank! Now it's your turn!",
    'result.yourTurn': "Now it's your turn to trap your friends 😈🔥",
    'result.createOwn': '🔥 Create Your Own Trap',
    'result.wantRevenge': 'I want revenge',
    
    // Friendboard
    'friendboard.title': "💕 Friends' Responses",
    'friendboard.createdBy': 'Created by:',
    'friendboard.noResponses': 'No responses yet',
    'friendboard.shareToGet': 'Share the link with friends to get responses!',
    'friendboard.responses': 'responses',
    'friendboard.back': '← Back',
    'friendboard.crush': 'Crush:',
    'friendboard.submittedAt': 'Submitted at:',
    'friendboard.answers': 'Answers:',
    
    // Not found
    'notFound.title': '404',
    'notFound.message': "Oops! This page doesn't exist",
    'notFound.backHome': 'Back to Home',
    
    // Share text
    'share.text': '💝👩‍❤️‍👨 Valentine week just got intensified ❤️ 👩‍❤️‍👩💝\nThis Love calculator shows your true compatibility % 😳\nCheck your score NOW👇\n🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩',
  },
  
  ar: {
    // Meta
    'meta.title': 'فحص الحب - اختبار التوافق العاطفي',
    'meta.description': 'أسبوع الفالنتاين صار أقوى ❤️ حاسبة الحب هذي تبين نسبة توافقكم الحقيقية % 😳 شيك على نتيجتك الحين👇',
    'meta.ogTitle': '💖 حاسبة الحب - اكتشف شريكك الحقيقي! 💖',
    'meta.ogDescription': 'هل أنتما مقدران لبعضكما؟ 😳 اكتشف نسبة التوافق الحقيقية بينكما في ثوانٍ!',
    
    // Index page
    'index.title': 'فخ الحب',
    'index.subtitle': 'اكتشف سراً من يحبه صديقك بمزحة ممتعة 💕',
    'index.footer': 'صُنع بحب للمزاح الممتع',
    
    // Create form
    'form.yourName': 'اسمك',
    'form.namePlaceholder': 'أدخل اسمك',
    'form.createLink': '💕 أنشئ فخ الحب',
    'form.creating': 'جارٍ الإنشاء...',
    'form.enterName': 'الرجاء إدخال اسمك',
    'form.error': 'فشل في إنشاء الفخ',
    
    // Link created
    'linkCreated.title': '💖 فخ الحب جاهز!',
    'linkCreated.subtitle': 'شارك هذا الرابط مع أصدقائك واكتشف حبهم السري ✨💌',
    'linkCreated.creator': '😏 منشئ الفخ',
    'linkCreated.shareLabel': '💕 شارك مع الأصدقاء',
    'linkCreated.shareHint': 'بالنسبة لهم إنه اختبار ممتع... بالنسبة لك إنه كشف سر كبير 🤭💗',
    'linkCreated.copyLink': '📋 نسخ الرابط',
    'linkCreated.share': '💌 مشاركة',
    'linkCreated.shareVia': 'شارك عبر:',
    'linkCreated.viewResponses': '💕 عرض ردود الأصدقاء',
    'linkCreated.copied': 'تم نسخ الرابط! شاركه مع أصدقائك 💕',
    'linkCreated.copyFailed': 'فشل في نسخ الرابط',
    
    // Prank page
    'prank.title': '💝 اختبار التوافق العاطفي 💝',
    'prank.subtitle': 'اختبر توافقك مع من تحب!',
    'prank.socialProof': 'أكثر من 2,000 شخص فحصوا توافقهم العاطفي!',
    'prank.yourName': 'اسمك',
    'prank.crushName': 'اسم من تحب',
    'prank.namePlaceholder': 'أدخل اسمك',
    'prank.crushPlaceholder': 'أدخل اسم من تحب',
    'prank.startQuiz': '💕 احسب!',
    'prank.fillBoth': 'الرجاء ملء كلا الاسمين',
    'prank.answerQuestions': 'أجب على الأسئلة 💕',
    'prank.questionOf': 'سؤال',
    'prank.yes': 'نعم 💕',
    'prank.no': 'لا 💔',
    'prank.calculating': 'جارٍ حساب التوافق...',
    'prank.analyzingCompatibility': 'جارٍ تحليل توافقك مع {crushName} 💕',
    'prank.error': 'فشل في إرسال الرد',
    
    // Questions
    'question.thinkOften': 'هل تفكر كثيراً في {crushName}؟',
    'question.nervousAround': 'هل تتوتر عندما تكون بالقرب من {crushName}؟',
    'question.dreamAbout': 'هل حلمت يوماً بـ {crushName}؟',
    'question.smileWhenSee': 'هل تبتسم تلقائياً عندما ترى {crushName}؟',
    'question.talkForHours': 'هل تريد التحدث مع {crushName} لساعات؟',
    
    // Result page
    'result.calculating': 'جارٍ حساب التوافق...',
    'result.analyzing': 'جارٍ تحليل توافقك. انتظر قليلاً 💕',
    'result.trapped': 'لقد وقعت في الفخ! 😭',
    'result.secretRevealed': 'تم كشف سرك 😏',
    'result.yourName': '👀 اسمك:',
    'result.yourCrush': 'من تحب:',
    'result.gotYourSecret': '😳 {pranksterName} يعرف الآن سرك!',
    'result.justPrank': 'لا تقلق، إنها مجرد مزحة ممتعة! الآن دورك!',
    'result.yourTurn': 'الآن دورك لإيقاع أصدقائك في الفخ 😈🔥',
    'result.createOwn': '🔥 أنشئ فخك الخاص',
    'result.wantRevenge': 'أريد الانتقام',
    
    // Friendboard
    'friendboard.title': '💕 ردود الأصدقاء',
    'friendboard.createdBy': 'أنشأه:',
    'friendboard.noResponses': 'لا توجد ردود بعد',
    'friendboard.shareToGet': 'شارك الرابط مع الأصدقاء للحصول على ردود!',
    'friendboard.responses': 'ردود',
    'friendboard.back': '→ رجوع',
    'friendboard.crush': 'من يحب:',
    'friendboard.submittedAt': 'تاريخ الإرسال:',
    'friendboard.answers': 'الإجابات:',
    
    // Not found
    'notFound.title': '404',
    'notFound.message': 'عفواً! هذه الصفحة غير موجودة',
    'notFound.backHome': 'العودة للرئيسية',
    
    // Share text
    'share.text': 'يا برو، أنا ما عم بمزح! 😳\nحاسبة الحب هي رح تكشف لك شريك حياتك الحقيقي ❤️\nافحص نتيجتك الآن 👇',
  },
  
  es: {
    // Meta
    'meta.title': 'Love Check - Test de Compatibilidad Amorosa',
    'meta.description': '¡La semana de San Valentín se puso intensa! ❤️ Esta calculadora de amor muestra tu compatibilidad real % 😳 ¡Mira tu resultado AHORA👇',
    'meta.ogTitle': '💝 Calculadora de Amor - Comprueba tu Compatibilidad 💝',
    'meta.ogDescription': '¡La semana de San Valentín se puso intensa! ❤️ Esta calculadora de amor muestra tu compatibilidad real % 😳 ¡Mira tu resultado AHORA👇',
    
    // Index page
    'index.title': 'Trampa de Amor',
    'index.subtitle': 'Descubre en secreto quién le gusta a tu amigo con una broma divertida 💕',
    'index.footer': 'Hecho con amor para bromas divertidas',
    
    // Create form
    'form.yourName': 'Tu Nombre',
    'form.namePlaceholder': 'Ingresa tu nombre',
    'form.createLink': '💕 Crear Trampa de Amor',
    'form.creating': 'Creando...',
    'form.enterName': 'Por favor ingresa tu nombre',
    'form.error': 'Error al crear la trampa',
    
    // Link created
    'linkCreated.title': '💖 ¡Trampa de Amor Lista!',
    'linkCreated.subtitle': 'Comparte este enlace con amigos y descubre su amor secreto ✨💌',
    'linkCreated.creator': '😏 Creador de la Trampa',
    'linkCreated.shareLabel': '💕 Comparte con amigos',
    'linkCreated.shareHint': 'Para ellos es un quiz divertido... para ti es revelar un gran secreto 🤭💗',
    'linkCreated.copyLink': '📋 Copiar Enlace',
    'linkCreated.share': '💌 Compartir',
    'linkCreated.shareVia': 'Compartir vía:',
    'linkCreated.viewResponses': '💕 Ver Respuestas de Amigos',
    'linkCreated.copied': '¡Enlace copiado! Compártelo con amigos 💕',
    'linkCreated.copyFailed': 'Error al copiar el enlace',
    
    // Prank page
    'prank.title': '💝 Test de Compatibilidad Amorosa 💝',
    'prank.subtitle': '¡Prueba tu compatibilidad con tu crush!',
    'prank.socialProof': '¡Más de 2,000 personas comprobaron su compatibilidad amorosa!',
    'prank.yourName': 'Tu Nombre',
    'prank.crushName': 'Nombre de tu Crush',
    'prank.namePlaceholder': 'Ingresa tu nombre',
    'prank.crushPlaceholder': 'Ingresa el nombre de tu crush',
    'prank.startQuiz': '💕 ¡Calcular!',
    'prank.fillBoth': 'Por favor llena ambos nombres',
    'prank.answerQuestions': 'Responde las preguntas 💕',
    'prank.questionOf': 'Pregunta',
    'prank.yes': 'Sí 💕',
    'prank.no': 'No 💔',
    'prank.calculating': 'Calculando compatibilidad...',
    'prank.analyzingCompatibility': 'Analizando tu compatibilidad con {crushName} 💕',
    'prank.error': 'Error al enviar respuesta',
    
    // Questions
    'question.thinkOften': '¿Piensas a menudo en {crushName}?',
    'question.nervousAround': '¿Te pones nervioso/a cerca de {crushName}?',
    'question.dreamAbout': '¿Has soñado alguna vez con {crushName}?',
    'question.smileWhenSee': '¿Sonríes naturalmente cuando ves a {crushName}?',
    'question.talkForHours': '¿Querrías hablar con {crushName} por horas?',
    
    // Result page
    'result.calculating': 'Calculando compatibilidad...',
    'result.analyzing': 'Analizando tu compatibilidad. Por favor espera 💕',
    'result.trapped': '¡Has caído en la trampa! 😭',
    'result.secretRevealed': 'Tu secreto ha sido revelado 😏',
    'result.yourName': '👀 Tu nombre:',
    'result.yourCrush': 'Tu crush:',
    'result.gotYourSecret': '😳 ¡{pranksterName} ahora sabe tu crush secreto!',
    'result.justPrank': '¡No te preocupes, es solo una broma divertida! ¡Ahora es tu turno!',
    'result.yourTurn': 'Ahora es tu turno de atrapar a tus amigos 😈🔥',
    'result.createOwn': '🔥 Crea Tu Propia Trampa',
    'result.wantRevenge': 'Quiero venganza',
    
    // Friendboard
    'friendboard.title': '💕 Respuestas de Amigos',
    'friendboard.createdBy': 'Creado por:',
    'friendboard.noResponses': 'Aún no hay respuestas',
    'friendboard.shareToGet': '¡Comparte el enlace con amigos para obtener respuestas!',
    'friendboard.responses': 'respuestas',
    'friendboard.back': '← Volver',
    'friendboard.crush': 'Crush:',
    'friendboard.submittedAt': 'Enviado el:',
    'friendboard.answers': 'Respuestas:',
    
    // Not found
    'notFound.title': '404',
    'notFound.message': '¡Ups! Esta página no existe',
    'notFound.backHome': 'Volver al Inicio',
    
    // Share text
    'share.text': '💝👩‍❤️‍👨 ¡La semana de San Valentín se puso intensa! ❤️ 👩‍❤️‍👩💝\nEsta calculadora de amor muestra tu compatibilidad real % 😳\n¡Mira tu resultado AHORA👇\n🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩',
  },
  
  fr: {
    // Meta
    'meta.title': 'Love Check - Test de Compatibilité Amoureuse',
    'meta.description': 'La semaine de la Saint-Valentin vient de s\'intensifier ❤️ Cette calculatrice d\'amour montre votre vraie compatibilité % 😳 Vérifiez votre score MAINTENANT👇',
    'meta.ogTitle': '💝 Calculatrice d\'Amour - Vérifiez Votre Compatibilité 💝',
    'meta.ogDescription': 'La semaine de la Saint-Valentin vient de s\'intensifier ❤️ Cette calculatrice d\'amour montre votre vraie compatibilité % 😳 Vérifiez votre score MAINTENANT👇',
    
    // Index page
    'index.title': 'Piège d\'Amour',
    'index.subtitle': 'Découvrez secrètement le crush de votre ami avec une blague amusante 💕',
    'index.footer': 'Fait avec amour pour des blagues amusantes',
    
    // Create form
    'form.yourName': 'Votre Nom',
    'form.namePlaceholder': 'Entrez votre nom',
    'form.createLink': '💕 Créer Piège d\'Amour',
    'form.creating': 'Création...',
    'form.enterName': 'Veuillez entrer votre nom',
    'form.error': 'Échec de la création du piège',
    
    // Link created
    'linkCreated.title': '💖 Piège d\'Amour Prêt!',
    'linkCreated.subtitle': 'Partagez ce lien avec vos amis et découvrez leur crush secret ✨💌',
    'linkCreated.creator': '😏 Créateur du Piège',
    'linkCreated.shareLabel': '💕 Partagez avec des amis',
    'linkCreated.shareHint': 'Pour eux c\'est un quiz amusant... pour vous c\'est révéler un grand secret 🤭💗',
    'linkCreated.copyLink': '📋 Copier le Lien',
    'linkCreated.share': '💌 Partager',
    'linkCreated.shareVia': 'Partager via:',
    'linkCreated.viewResponses': '💕 Voir les Réponses des Amis',
    'linkCreated.copied': 'Lien copié! Partagez-le avec vos amis 💕',
    'linkCreated.copyFailed': 'Échec de la copie du lien',
    
    // Prank page
    'prank.title': '💝 Test de Compatibilité Amoureuse 💝',
    'prank.subtitle': 'Testez votre compatibilité avec votre crush!',
    'prank.socialProof': 'Plus de 2 000 personnes ont vérifié leur compatibilité amoureuse!',
    'prank.yourName': 'Votre Nom',
    'prank.crushName': 'Nom de Votre Crush',
    'prank.namePlaceholder': 'Entrez votre nom',
    'prank.crushPlaceholder': 'Entrez le nom de votre crush',
    'prank.startQuiz': '💕 Calculer!',
    'prank.fillBoth': 'Veuillez remplir les deux noms',
    'prank.answerQuestions': 'Répondez aux questions 💕',
    'prank.questionOf': 'Question',
    'prank.yes': 'Oui 💕',
    'prank.no': 'Non 💔',
    'prank.calculating': 'Calcul de la compatibilité...',
    'prank.analyzingCompatibility': 'Analyse de votre compatibilité avec {crushName} 💕',
    'prank.error': 'Échec de l\'envoi de la réponse',
    
    // Questions
    'question.thinkOften': 'Pensez-vous souvent à {crushName}?',
    'question.nervousAround': 'Êtes-vous nerveux près de {crushName}?',
    'question.dreamAbout': 'Avez-vous déjà rêvé de {crushName}?',
    'question.smileWhenSee': 'Souriez-vous naturellement quand vous voyez {crushName}?',
    'question.talkForHours': 'Voudriez-vous parler avec {crushName} pendant des heures?',
    
    // Result page
    'result.calculating': 'Calcul de la compatibilité...',
    'result.analyzing': 'Analyse de votre compatibilité. Veuillez patienter 💕',
    'result.trapped': 'Vous êtes tombé dans le piège! 😭',
    'result.secretRevealed': 'Votre secret a été révélé 😏',
    'result.yourName': '👀 Votre nom:',
    'result.yourCrush': 'Votre crush:',
    'result.gotYourSecret': '😳 {pranksterName} connaît maintenant votre crush secret!',
    'result.justPrank': 'Ne vous inquiétez pas, c\'est juste une blague amusante! Maintenant c\'est votre tour!',
    'result.yourTurn': 'Maintenant c\'est votre tour de piéger vos amis 😈🔥',
    'result.createOwn': '🔥 Créez Votre Propre Piège',
    'result.wantRevenge': 'Je veux me venger',
    
    // Friendboard
    'friendboard.title': '💕 Réponses des Amis',
    'friendboard.createdBy': 'Créé par:',
    'friendboard.noResponses': 'Pas encore de réponses',
    'friendboard.shareToGet': 'Partagez le lien avec des amis pour obtenir des réponses!',
    'friendboard.responses': 'réponses',
    'friendboard.back': '← Retour',
    'friendboard.crush': 'Crush:',
    'friendboard.submittedAt': 'Envoyé le:',
    'friendboard.answers': 'Réponses:',
    
    // Not found
    'notFound.title': '404',
    'notFound.message': 'Oups! Cette page n\'existe pas',
    'notFound.backHome': 'Retour à l\'Accueil',
    
    // Share text
    'share.text': '💝👩‍❤️‍👨 La semaine de la Saint-Valentin s\'intensifie ❤️ 👩‍❤️‍👩💝\nCette calculatrice d\'amour montre votre vraie compatibilité % 😳\nVérifiez votre score MAINTENANT👇\n🤩👇🏻👇🏻👇🏻👇🏻👇🏻🤩',
  },
};

export const getTranslation = (lang: Language, key: string, replacements?: Record<string, string>): string => {
  let text = translations[lang]?.[key] || translations['en']?.[key] || key;
  
  if (replacements) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      text = text.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), value);
    });
  }
  
  return text;
};

export const detectLanguageFromPath = (pathname: string): Language => {
  const langMatch = pathname.match(/^\/(en|ar|es|fr|ja)\b/);
  return (langMatch?.[1] as Language) || 'ja';
};

export const getPathWithLanguage = (path: string, lang: Language): string => {
  // Remove existing language prefix if any (with word boundary to avoid partial matches)
  let cleanPath = path.replace(/^\/(en|ar|es|fr|ja)(\/|$)/, '/');
  
  // Ensure path starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Japanese is default, no prefix needed
  if (lang === 'ja') {
    return cleanPath || '/';
  }
  
  return `/${lang}${cleanPath}`;
};
