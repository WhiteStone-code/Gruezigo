// Mapa completo del curso, estilo "escalera de niveles" (A1 → C2, como en
// otras apps de idiomas o una app de idiomas). El A1 tiene 5 capítulos jugables (A1.1-A1.5,
// modelados sobre la estructura real del A1 de una app de idiomas); el resto se muestra
// como hoja de ruta ("Próximamente") con temas reales para que quede claro
// qué viene, sin inventar contenido a medias.
//
// gradient: clases Tailwind para la "portada" ilustrada del nivel.
// emoji: par de emojis usados como ilustración de portada (sin imágenes
// externas — mantiene la app 100% autocontenida).
export const LEVELS = [
  {
    code: 'A1.1',
    group: 'A1',
    chapterNumber: 1,
    title: {
      es: 'Primeros pasos', en: 'First steps', pt: 'Primeiros passos', fr: 'Premiers pas',
      it: 'Primi passi', sq: 'Hapat e para', tr: 'İlk adımlar',
    },
    gradient: 'from-wood-400 to-wood-600',
    emoji: ['🧀', '🐄'],
    hasContent: true,
  },
  {
    code: 'A1.2',
    group: 'A1',
    chapterNumber: 2,
    title: {
      es: 'Vida diaria', en: 'Daily life', pt: 'Vida quotidiana', fr: 'Vie quotidienne',
      it: 'Vita quotidiana', sq: 'Jeta e përditshme', tr: 'Günlük yaşam',
    },
    gradient: 'from-cheese-400 to-swiss-red',
    emoji: ['🚋', '🏠'],
    hasContent: true,
  },
  {
    code: 'A1.3',
    group: 'A1',
    chapterNumber: 3,
    title: {
      es: 'Cuerpo y sentimientos', en: 'Body and feelings', pt: 'Corpo e sentimentos', fr: 'Corps et sentiments',
      it: 'Corpo e sentimenti', sq: 'Trupi dhe ndjenjat', tr: 'Beden ve duygular',
    },
    gradient: 'from-swiss-red to-cheese-500',
    emoji: ['🩺', '😊'],
    hasContent: true,
  },
  {
    code: 'A1.4',
    group: 'A1',
    chapterNumber: 4,
    title: {
      es: '¿De dónde eres?', en: 'Where are you from?', pt: 'De onde és?', fr: "D'où viens-tu ?",
      it: 'Di dove sei?', sq: 'Nga je?', tr: 'Nerelisin?',
    },
    gradient: 'from-wood-400 to-cheese-600',
    emoji: ['🌍', '🗣️'],
    hasContent: true,
  },
  {
    code: 'A1.5',
    group: 'A1',
    chapterNumber: 5,
    title: {
      es: 'Orientándote en la ciudad', en: 'Finding your way in town', pt: 'Orientar-te na cidade', fr: 'Se repérer en ville',
      it: 'Orientarsi in città', sq: 'Të orientohesh në qytet', tr: 'Şehirde yön bulmak',
    },
    gradient: 'from-alp-300 to-alp-600',
    emoji: ['🧭', '🏙️'],
    hasContent: true,
  },
  {
    code: 'A2.1',
    group: 'A2',
    chapterNumber: 6,
    title: {
      es: 'Explorando el barrio', en: 'Exploring the neighborhood', pt: 'Explorando o bairro', fr: 'Explorer le quartier',
      it: 'Esplorare il quartiere', sq: 'Duke eksploruar lagjen', tr: 'Mahalleyi keşfetmek',
    },
    gradient: 'from-alp-400 to-alp-600',
    emoji: ['🏔️', '⛺'],
    hasContent: false,
    topics: {
      es: ['Hablar del clima y las estaciones', 'Hacer planes con amigos', 'El correo y los trámites'],
      en: ['Talking about weather and seasons', 'Making plans with friends', 'Post office and paperwork'],
      pt: ['Falar do tempo e das estações', 'Fazer planos com amigos', 'Correios e trâmites'],
      fr: ['Parler du temps et des saisons', 'Faire des projets avec des amis', 'La poste et les démarches'],
      it: ['Parlare del meteo e delle stagioni', 'Fare programmi con gli amici', 'Posta e pratiche burocratiche'],
      sq: ['Të flasësh për motin dhe stinët', 'Të bësh plane me miq', 'Posta dhe procedurat'],
      tr: ['Hava durumu ve mevsimler hakkında konuşmak', 'Arkadaşlarla plan yapmak', 'Postane ve resmi işlemler'],
    },
  },
  {
    code: 'A2.2',
    group: 'A2',
    chapterNumber: 7,
    title: {
      es: 'Moviéndote por Suiza', en: 'Getting around Switzerland', pt: 'Deslocar-se pela Suíça', fr: 'Se déplacer en Suisse',
      it: 'Muoversi in Svizzera', sq: 'Të lëvizësh nëpër Zvicër', tr: 'İsviçre\'de dolaşmak',
    },
    gradient: 'from-alp-500 to-alp-800',
    emoji: ['🚂', '🕰️'],
    hasContent: false,
    topics: {
      es: ['El SBB y los trenes', 'Alquilar un piso', 'El banco y el seguro médico', 'De excursión en las montañas'],
      en: ['SBB and trains', 'Renting an apartment', 'Bank and health insurance', 'Hiking in the mountains'],
      pt: ['A SBB e os comboios', 'Alugar um apartamento', 'Banco e seguro de saúde', 'Caminhada nas montanhas'],
      fr: ['Les CFF et les trains', 'Louer un appartement', 'La banque et l\'assurance maladie', 'Randonnée en montagne'],
      it: ['Le FFS e i treni', 'Affittare un appartamento', 'Banca e assicurazione malattia', 'Escursioni in montagna'],
      sq: ['SBB dhe trenat', 'Të marrësh me qira një apartament', 'Banka dhe sigurimi shëndetësor', 'Ecje malore'],
      tr: ['SBB ve trenler', 'Daire kiralamak', 'Banka ve sağlık sigortası', 'Dağlarda yürüyüş'],
    },
  },
  {
    code: 'B1.1',
    group: 'B1',
    chapterNumber: 8,
    title: {
      es: 'Conversación real', en: 'Real conversation', pt: 'Conversa real', fr: 'Conversation réelle',
      it: 'Conversazione reale', sq: 'Bisedë reale', tr: 'Gerçek sohbet',
    },
    gradient: 'from-alp-600 to-alp-900',
    emoji: ['💼', '📖'],
    hasContent: false,
    topics: {
      es: ['Hablar de tu trabajo', 'Dar tu opinión educadamente', 'Pequeñas charlas ("Smalltalk")', 'Quejarte sin ser grosero/a'],
      en: ['Talking about your job', 'Giving your opinion politely', 'Small talk', 'Complaining without being rude'],
      pt: ['Falar do teu trabalho', 'Dar a tua opinião educadamente', 'Conversa fiada', 'Reclamar sem ser mal-educado'],
      fr: ['Parler de son travail', 'Donner son avis poliment', 'Faire la conversation', 'Se plaindre sans être impoli'],
      it: ['Parlare del proprio lavoro', 'Dare la propria opinione con garbo', 'Chiacchiere informali', 'Lamentarsi senza essere scortesi'],
      sq: ['Të flasësh për punën tënde', 'Të japësh mendimin me mirësjellje', 'Bisedë e lehtë', 'Të ankohesh pa qenë i vrazhdë'],
      tr: ['İşinden bahsetmek', 'Fikrini nazikçe belirtmek', 'Sohbet etmek', 'Kaba olmadan şikayet etmek'],
    },
  },
  {
    code: 'B1.2',
    group: 'B1',
    chapterNumber: 9,
    title: {
      es: 'La vida real', en: 'Real life', pt: 'A vida real', fr: 'La vraie vie',
      it: 'La vita reale', sq: 'Jeta reale', tr: 'Gerçek hayat',
    },
    gradient: 'from-swiss-red-dark to-alp-900',
    emoji: ['🏥', '🗳️'],
    hasContent: false,
    topics: {
      es: ['Citas médicas complejas', 'Entender una votación ("Abstimmung")', 'Hablar con la escuela de tus hijos', 'Resolver un conflicto de vecinos'],
      en: ['Complex medical appointments', 'Understanding a vote ("Abstimmung")', 'Talking to your kids\' school', 'Resolving a neighbor conflict'],
      pt: ['Consultas médicas complexas', 'Perceber uma votação', 'Falar com a escola dos filhos', 'Resolver um conflito de vizinhos'],
      fr: ['Rendez-vous médicaux complexes', 'Comprendre une votation', 'Parler à l\'école de ses enfants', 'Résoudre un conflit de voisinage'],
      it: ['Appuntamenti medici complessi', 'Capire una votazione', 'Parlare con la scuola dei figli', 'Risolvere un conflitto di vicinato'],
      sq: ['Takime mjekësore komplekse', 'Të kuptosh një votim', 'Të flasësh me shkollën e fëmijëve', 'Të zgjidhësh një konflikt fqinjësh'],
      tr: ['Karmaşık doktor randevuları', 'Bir oylamayı anlamak', 'Çocuğunun okuluyla konuşmak', 'Komşu anlaşmazlığı çözmek'],
    },
  },
  {
    code: 'B2.1',
    group: 'B2',
    chapterNumber: 10,
    title: {
      es: 'Fluidez', en: 'Fluency', pt: 'Fluência', fr: 'Aisance',
      it: 'Scioltezza', sq: 'Rrjedhshmëri', tr: 'Akıcılık',
    },
    gradient: 'from-swiss-red to-wood-700',
    emoji: ['📰', '💬'],
    hasContent: false,
    topics: {
      es: ['Seguir las noticias locales', 'Debatir con matices', 'Humor y expresiones idiomáticas', 'Escribir un email formal'],
      en: ['Following local news', 'Debating with nuance', 'Humor and idioms', 'Writing a formal email'],
      pt: ['Seguir as notícias locais', 'Debater com nuances', 'Humor e expressões idiomáticas', 'Escrever um email formal'],
      fr: ['Suivre l\'actualité locale', 'Débattre avec nuance', 'Humour et expressions idiomatiques', 'Écrire un e-mail formel'],
      it: ['Seguire le notizie locali', 'Discutere con sfumature', 'Umorismo e modi di dire', 'Scrivere un\'email formale'],
      sq: ['Të ndjekësh lajmet vendore', 'Të debatosh me nuanca', 'Humor dhe shprehje idiomatike', 'Të shkruash një email zyrtar'],
      tr: ['Yerel haberleri takip etmek', 'İnceliklerle tartışmak', 'Mizah ve deyimler', 'Resmi e-posta yazmak'],
    },
  },
  {
    code: 'B2.2',
    group: 'B2',
    chapterNumber: 11,
    title: {
      es: 'Cultura profunda', en: 'Deep culture', pt: 'Cultura profunda', fr: 'Culture approfondie',
      it: 'Cultura profonda', sq: 'Kultura e thellë', tr: 'Derin kültür',
    },
    gradient: 'from-wood-600 to-swiss-red-dark',
    emoji: ['🎭', '🏛️'],
    hasContent: false,
    topics: {
      es: ['Política suiza y federalismo', 'Historia reciente', 'Literatura y cine suizo', 'Diferencias entre cantones'],
      en: ['Swiss politics and federalism', 'Recent history', 'Swiss literature and film', 'Differences between cantons'],
      pt: ['Política suíça e federalismo', 'História recente', 'Literatura e cinema suíços', 'Diferenças entre cantões'],
      fr: ['Politique suisse et fédéralisme', 'Histoire récente', 'Littérature et cinéma suisses', 'Différences entre cantons'],
      it: ['Politica svizzera e federalismo', 'Storia recente', 'Letteratura e cinema svizzeri', 'Differenze tra cantoni'],
      sq: ['Politika zvicerane dhe federalizmi', 'Historia e fundit', 'Letërsia dhe filmi zviceran', 'Dallimet mes kantoneve'],
      tr: ['İsviçre siyaseti ve federalizm', 'Yakın tarih', 'İsviçre edebiyatı ve sineması', 'Kantonlar arası farklar'],
    },
  },
  {
    code: 'C1',
    group: 'C1',
    chapterNumber: 12,
    title: {
      es: 'Dominio', en: 'Mastery', pt: 'Domínio', fr: 'Maîtrise',
      it: 'Padronanza', sq: 'Zotërim', tr: 'Hakimiyet',
    },
    gradient: 'from-cheese-600 to-wood-800',
    emoji: ['🎓', '📜'],
    hasContent: false,
    topics: {
      es: ['Negociar en el trabajo', 'Entender dialectos de otros cantones', 'Argumentar por escrito', 'Presentaciones profesionales'],
      en: ['Negotiating at work', 'Understanding other cantons\' dialects', 'Written argumentation', 'Professional presentations'],
      pt: ['Negociar no trabalho', 'Perceber dialetos de outros cantões', 'Argumentação escrita', 'Apresentações profissionais'],
      fr: ['Négocier au travail', 'Comprendre les dialectes d\'autres cantons', 'Argumentation écrite', 'Présentations professionnelles'],
      it: ['Negoziare sul lavoro', 'Capire i dialetti di altri cantoni', 'Argomentazione scritta', 'Presentazioni professionali'],
      sq: ['Të negociosh në punë', 'Të kuptosh dialektet e kantoneve të tjera', 'Argumentim me shkrim', 'Prezantime profesionale'],
      tr: ['İş yerinde müzakere', 'Diğer kantonların lehçelerini anlamak', 'Yazılı tartışma', 'Profesyonel sunumlar'],
    },
  },
  {
    code: 'C2',
    group: 'C2',
    chapterNumber: 13,
    title: {
      es: 'Maestría', en: 'Mastery+', pt: 'Mestria', fr: 'Excellence',
      it: 'Eccellenza', sq: 'Përsosmëri', tr: 'Ustalık',
    },
    gradient: 'from-swiss-red via-wood-700 to-alp-900',
    emoji: ['🌼', '🇨🇭'],
    hasContent: false,
    topics: {
      es: ['Distinguir variantes de Züri-, Bärn- y Baseldütsch', 'Ironía y doble sentido', 'Suizo-alemán escrito informal (WhatsApp)', 'Pasar por local en cualquier conversación'],
      en: ['Distinguishing Züri-, Bärn- and Baseldütsch', 'Irony and double meaning', 'Informal written Swiss German (WhatsApp)', 'Passing as a local in any conversation'],
      pt: ['Distinguir variantes de Züri-, Bärn- e Baseldütsch', 'Ironia e duplo sentido', 'Suíço-alemão escrito informal (WhatsApp)', 'Passar por local em qualquer conversa'],
      fr: ['Distinguer les variantes zurichoise, bernoise et bâloise', 'Ironie et double sens', 'Suisse-allemand écrit informel (WhatsApp)', 'Passer pour un local dans toute conversation'],
      it: ['Distinguere le varianti di Züri-, Bärn- e Baseldütsch', 'Ironia e doppio senso', 'Svizzero-tedesco scritto informale (WhatsApp)', 'Sembrare del posto in ogni conversazione'],
      sq: ['Të dallosh variantet Züri-, Bärn- dhe Baseldütsch', 'Ironia dhe kuptimi i dyfishtë', 'Gjermanishtja zvicerane e shkruar joformalisht (WhatsApp)', 'Të duket si vendas në çdo bisedë'],
      tr: ['Züri-, Bärn- ve Baseldütsch varyantlarını ayırt etmek', 'İroni ve çift anlam', 'Gayri resmi yazılı İsviçre Almancası (WhatsApp)', 'Her sohbette yerli gibi görünmek'],
    },
  },
]

export function getLevelByCode(code) {
  return LEVELS.find((l) => l.code === code) ?? null
}

export function getNextLevelCode(code) {
  const idx = LEVELS.findIndex((l) => l.code === code)
  return idx >= 0 && idx + 1 < LEVELS.length ? LEVELS[idx + 1].code : null
}

// Calcula, para cada nivel del mapa, si está completado, en curso, bloqueado
// (aún no le toca) o "próximamente" (sin contenido todavía). Se apoya en
// getLessonsByLevel para no duplicar la lista de lecciones por nivel.
// `unlockAll` (Ajustes → Modo prueba) salta el bloqueo secuencial para poder
// probar cualquier nivel con contenido de inmediato.
export function computeLevelStates(completedLessons, getLessonsByLevel, unlockAll = false) {
  let previousContentDone = true
  return LEVELS.map((level) => {
    if (!level.hasContent) {
      return { ...level, state: 'soon', doneCount: 0, totalCount: 0 }
    }
    const lessons = getLessonsByLevel(level.code)
    const doneCount = lessons.filter((l) => completedLessons.includes(l.id)).length
    const isDone = lessons.length > 0 && doneCount === lessons.length
    const state = !previousContentDone && !unlockAll ? 'locked' : isDone ? 'done' : 'current'
    previousContentDone = previousContentDone && isDone
    return { ...level, state, doneCount, totalCount: lessons.length }
  })
}
