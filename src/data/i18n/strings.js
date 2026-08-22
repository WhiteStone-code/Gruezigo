// Cadenas de interfaz (chrome de la app) en los 7 idiomas soportados.
// Los idiomas de lección/contenido viven en src/data/lessons/**.
export const SUPPORTED_LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
]

export const UI_STRINGS = {
  appName: { es: 'GrüeziGo', en: 'GrüeziGo', pt: 'GrüeziGo', fr: 'GrüeziGo', it: 'GrüeziGo', sq: 'GrüeziGo', tr: 'GrüeziGo' },
  tagline: {
    es: 'Tu puente al suizo-alemán de verdad',
    en: 'Your bridge to real Swiss German',
    pt: 'A sua ponte para o suíço-alemão real',
    fr: 'Votre pont vers le vrai suisse-allemand',
    it: 'Il tuo ponte verso il vero svizzero-tedesco',
    sq: 'Ura juaj drejt gjermanishtes zvicerane reale',
    tr: 'Gerçek İsviçre Almancasına köprünüz',
  },
  dashboard: { es: 'Panel', en: 'Dashboard', pt: 'Painel', fr: 'Tableau de bord', it: 'Pannello', sq: 'Paneli', tr: 'Panel' },
  lessons: { es: 'Lecciones', en: 'Lessons', pt: 'Lições', fr: 'Leçons', it: 'Lezioni', sq: 'Mësimet', tr: 'Dersler' },
  culture: { es: 'Cultura', en: 'Culture', pt: 'Cultura', fr: 'Culture', it: 'Cultura', sq: 'Kultura', tr: 'Kültür' },
  calendar: { es: 'Calendario', en: 'Calendar', pt: 'Calendário', fr: 'Calendrier', it: 'Calendario', sq: 'Kalendari', tr: 'Takvim' },
  review: { es: 'Repaso', en: 'Review', pt: 'Revisão', fr: 'Révision', it: 'Ripasso', sq: 'Rishikim', tr: 'Tekrar' },
  settings: { es: 'Ajustes', en: 'Settings', pt: 'Definições', fr: 'Paramètres', it: 'Impostazioni', sq: 'Cilësimet', tr: 'Ayarlar' },
  streak: { es: 'Racha', en: 'Streak', pt: 'Sequência', fr: 'Série', it: 'Serie', sq: 'Vazhdimësia', tr: 'Seri' },
  continue: { es: 'Continuar', en: 'Continue', pt: 'Continuar', fr: 'Continuer', it: 'Continua', sq: 'Vazhdo', tr: 'Devam et' },
  checkAnswer: { es: 'Comprobar', en: 'Check', pt: 'Verificar', fr: 'Vérifier', it: 'Verifica', sq: 'Kontrollo', tr: 'Kontrol et' },
  listen: { es: 'Escuchar', en: 'Listen', pt: 'Ouvir', fr: 'Écouter', it: 'Ascolta', sq: 'Dëgjo', tr: 'Dinle' },
  speakNow: { es: 'Habla ahora', en: 'Speak now', pt: 'Fale agora', fr: 'Parlez maintenant', it: 'Parla ora', sq: 'Fol tani', tr: 'Şimdi konuş' },
  correct: { es: '¡Correcto!', en: 'Correct!', pt: 'Correto!', fr: 'Correct !', it: 'Corretto!', sq: 'Saktë!', tr: 'Doğru!' },
  incorrect: { es: 'Casi... inténtalo de nuevo', en: 'Almost... try again', pt: 'Quase... tenta outra vez', fr: 'Presque... réessayez', it: 'Quasi... riprova', sq: 'Pothuajse... provo përsëri', tr: 'Neredeyse... tekrar dene' },
  finishLesson: { es: 'Terminar lección', en: 'Finish lesson', pt: 'Terminar lição', fr: 'Terminer la leçon', it: 'Termina lezione', sq: 'Përfundo mësimin', tr: 'Dersi bitir' },
  selectCanton: { es: 'Selecciona tu cantón', en: 'Select your canton', pt: 'Selecione o seu cantão', fr: 'Choisissez votre canton', it: 'Seleziona il tuo cantone', sq: 'Zgjidh kantonin tënd', tr: 'Kantonunu seç' },
  getCertificate: { es: 'Obtener certificado', en: 'Get certificate', pt: 'Obter certificado', fr: 'Obtenir le certificat', it: 'Ottieni il certificato', sq: 'Merr certifikatën', tr: 'Sertifika al' },
}

export function t(key, lang = 'es') {
  return UI_STRINGS[key]?.[lang] ?? UI_STRINGS[key]?.es ?? key
}
