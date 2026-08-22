// Common professions a newcomer to German-speaking Switzerland regularly
// interacts with, plus phrases specifically useful for each interaction
// (not generic greetings — those are covered elsewhere).

export const PROFESSIONS = [
  {
    id: "doctor",
    emoji: "🩺",
    hochdeutsch: "der Arzt / die Ärztin",
    schwiizerduetsch: "de Dokter / d'Dokteri",
    description: {
      es: "El médico o la médica te examina cuando estás enfermo o te duele algo; visítalo si tienes fiebre, dolor persistente o necesitas una receta.",
      en: "The doctor examines you when you're sick or in pain; visit them if you have a fever, ongoing pain, or need a prescription.",
      pt: "O médico ou a médica examina-te quando estás doente ou com dores; visita-o se tiveres febre, dor persistente ou precisares de uma receita.",
      fr: "Le médecin vous examine quand vous êtes malade ou souffrez ; consultez-le en cas de fièvre, de douleur persistante ou si vous avez besoin d'une ordonnance.",
      it: "Il medico o la dottoressa ti visita quando sei malato o hai dolori; vai da lui se hai la febbre, un dolore persistente o serve una ricetta.",
      sq: "Mjeku ose mjekja të ekzaminon kur je i sëmurë ose ke dhimbje; vizitoje nëse ke temperaturë, dhimbje të vazhdueshme ose nevojitet një recetë.",
      tr: "Doktor hasta olduğunuzda veya ağrınız olduğunda sizi muayene eder; ateşiniz varsa, ağrınız sürüyorsa ya da reçeteye ihtiyacınız varsa ona gidin.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Es tut hier weh",
        schwiizerduetsch: "Es tuet weh da",
        base: { es: "Me duele aquí", en: "It hurts here", pt: "Dói-me aqui", fr: "J'ai mal ici", it: "Mi fa male qui", sq: "Më dhemb këtu", tr: "Burası ağrıyor" },
      },
      {
        hochdeutsch: "Ich habe Fieber",
        schwiizerduetsch: "Ich ha Fieber",
        base: { es: "Tengo fiebre", en: "I have a fever", pt: "Tenho febre", fr: "J'ai de la fièvre", it: "Ho la febbre", sq: "Kam temperaturë", tr: "Ateşim var" },
      },
      {
        hochdeutsch: "Brauche ich ein Rezept?",
        schwiizerduetsch: "Bruuch ich es Rezept?",
        base: { es: "¿Necesito una receta?", en: "Do I need a prescription?", pt: "Preciso de uma receita?", fr: "Ai-je besoin d'une ordonnance ?", it: "Ho bisogno di una ricetta?", sq: "A më duhet një recetë?", tr: "Reçeteye ihtiyacım var mı?" },
      },
    ],
  },
  {
    id: "teacher",
    emoji: "📚",
    hochdeutsch: "der Lehrer / die Lehrerin",
    schwiizerduetsch: "de Lehrer / d'Lehrerin",
    description: {
      es: "El profesor o la profesora enseña a tus hijos en el colegio; habla con él o ella en las reuniones de padres o si tienes dudas sobre el aprendizaje de tu hijo.",
      en: "The teacher educates your children at school; talk to them at parent meetings or whenever you have questions about your child's learning.",
      pt: "O professor ou a professora ensina os teus filhos na escola; fala com ele ou ela nas reuniões de pais ou sempre que tiveres dúvidas sobre a aprendizagem do teu filho.",
      fr: "L'enseignant ou l'enseignante instruit vos enfants à l'école ; parlez-lui lors des réunions de parents ou dès que vous avez des questions sur l'apprentissage de votre enfant.",
      it: "L'insegnante istruisce i tuoi figli a scuola; parlagli durante i colloqui con i genitori o ogni volta che hai dubbi sull'apprendimento di tuo figlio.",
      sq: "Mësuesi ose mësuesja i mëson fëmijët e tu në shkollë; flisni me të në takimet e prindërve ose sa herë keni pyetje rreth mësimit të fëmijës.",
      tr: "Öğretmen çocuklarınızı okulda eğitir; veli toplantılarında veya çocuğunuzun eğitimiyle ilgili sorularınız olduğunda onunla konuşun.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Wie geht es meinem Kind in der Schule?",
        schwiizerduetsch: "Wie gaht's mim Kind i de Schuel?",
        base: { es: "¿Cómo le va a mi hijo/a en la escuela?", en: "How is my child doing at school?", pt: "Como está o meu filho/a na escola?", fr: "Comment se débrouille mon enfant à l'école ?", it: "Come va mio figlio/a a scuola?", sq: "Si po ia kalon fëmija im në shkollë?", tr: "Çocuğum okulda nasıl gidiyor?" },
      },
      {
        hochdeutsch: "Wann ist der Elternabend?",
        schwiizerduetsch: "Wenn isch de Elterenabig?",
        base: { es: "¿Cuándo es la reunión de padres?", en: "When is the parents' evening?", pt: "Quando é a reunião de pais?", fr: "Quand a lieu la réunion de parents ?", it: "Quando è la riunione dei genitori?", sq: "Kur është takimi i prindërve?", tr: "Veli toplantısı ne zaman?" },
      },
      {
        hochdeutsch: "Hat mein Kind Hausaufgaben?",
        schwiizerduetsch: "Het mis Kind Hausufgabe?",
        base: { es: "¿Tiene mi hijo/a deberes?", en: "Does my child have homework?", pt: "O meu filho/a tem trabalhos de casa?", fr: "Mon enfant a-t-il des devoirs ?", it: "Mio figlio/a ha compiti?", sq: "A ka fëmija im detyra shtëpie?", tr: "Çocuğumun ödevi var mı?" },
      },
    ],
  },
  {
    id: "police",
    emoji: "👮",
    hochdeutsch: "der Polizist / die Polizistin",
    schwiizerduetsch: "de Polizist / d'Polizistin",
    description: {
      es: "El policía o la policía te ayuda en emergencias, para denunciar algo o pedir indicaciones si te sientes perdido o inseguro.",
      en: "The police officer helps in emergencies, to report something, or to ask for directions if you feel lost or unsafe.",
      pt: "O polícia ou a polícia ajuda em emergências, para denunciar algo ou pedir indicações se te sentires perdido ou inseguro.",
      fr: "Le policier ou la policière vous aide en cas d'urgence, pour signaler quelque chose ou demander votre chemin si vous vous sentez perdu ou en insécurité.",
      it: "Il poliziotto o la poliziotta ti aiuta in caso di emergenza, per denunciare qualcosa o chiedere indicazioni se ti senti perso o insicuro.",
      sq: "Polici ose policja të ndihmon në raste urgjence, për të raportuar diçka ose për të pyetur për drejtim nëse ndihesh i humbur ose i pasigurt.",
      tr: "Polis memuru acil durumlarda, bir şey bildirmek istediğinizde ya da kaybolduğunuzda veya güvende hissetmediğinizde yol tarifi almak için size yardımcı olur.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Ich möchte etwas melden",
        schwiizerduetsch: "Ich möcht öppis mälde",
        base: { es: "Quisiera denunciar algo", en: "I'd like to report something", pt: "Gostaria de denunciar algo", fr: "Je voudrais signaler quelque chose", it: "Vorrei denunciare qualcosa", sq: "Dëshiroj të raportoj diçka", tr: "Bir şey bildirmek istiyorum" },
      },
      {
        hochdeutsch: "Können Sie mir helfen?",
        schwiizerduetsch: "Chöit Sie mir hälfe?",
        base: { es: "¿Puede ayudarme?", en: "Can you help me?", pt: "Pode ajudar-me?", fr: "Pouvez-vous m'aider ?", it: "Può aiutarmi?", sq: "A mund të më ndihmoni?", tr: "Bana yardım edebilir misiniz?" },
      },
      {
        hochdeutsch: "Wo ist der nächste Polizeiposten?",
        schwiizerduetsch: "Wo isch de nächscht Polizeiposte?",
        base: { es: "¿Dónde está la comisaría más cercana?", en: "Where is the nearest police station?", pt: "Onde é a esquadra mais próxima?", fr: "Où est le poste de police le plus proche ?", it: "Dov'è la stazione di polizia più vicina?", sq: "Ku është stacioni policor më i afërt?", tr: "En yakın polis karakolu nerede?" },
      },
    ],
  },
  {
    id: "baker",
    emoji: "🥐",
    hochdeutsch: "der Bäcker / die Bäckerin",
    schwiizerduetsch: "de Beck / d'Beckere",
    description: {
      es: "El panadero o la panadera vende pan fresco, panecillos y pasteles cada día; es una parada habitual camino al trabajo o la escuela.",
      en: "The baker sells fresh bread, rolls, and pastries every day; it's a common stop on the way to work or school.",
      pt: "O padeiro ou a padeira vende pão fresco, pãezinhos e pastelaria todos os dias; é uma paragem habitual a caminho do trabalho ou da escola.",
      fr: "Le boulanger ou la boulangère vend du pain frais, des petits pains et des pâtisseries chaque jour ; c'est un arrêt habituel en allant au travail ou à l'école.",
      it: "Il fornaio o la fornaia vende pane fresco, panini e pasticcini ogni giorno; è una tappa abituale andando al lavoro o a scuola.",
      sq: "Furrtari ose furrtarja shet bukë të freskët, simite dhe ëmbëlsira çdo ditë; është një ndalesë e zakonshme rrugës për në punë ose shkollë.",
      tr: "Fırıncı her gün taze ekmek, sandviç ekmeği ve hamur işleri satar; işe ya da okula giderken sık uğranan bir yerdir.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Ich hätte gern ein Brot",
        schwiizerduetsch: "Ich hätt gern es Brot",
        base: { es: "Quisiera un pan", en: "I'd like a bread", pt: "Queria um pão", fr: "Je voudrais un pain", it: "Vorrei un pane", sq: "Do të doja një bukë", tr: "Bir ekmek istiyorum" },
      },
      {
        hochdeutsch: "Was kostet das?",
        schwiizerduetsch: "Was choschtet das?",
        base: { es: "¿Cuánto cuesta esto?", en: "How much does that cost?", pt: "Quanto custa isto?", fr: "Combien ça coûte ?", it: "Quanto costa?", sq: "Sa kushton kjo?", tr: "Bu ne kadar tutuyor?" },
      },
      {
        hochdeutsch: "Ist das noch frisch?",
        schwiizerduetsch: "Isch das no frisch?",
        base: { es: "¿Está todavía fresco?", en: "Is that still fresh?", pt: "Isto ainda está fresco?", fr: "C'est encore frais ?", it: "È ancora fresco?", sq: "A është ende i freskët?", tr: "Bu hâlâ taze mi?" },
      },
    ],
  },
  {
    id: "mechanic",
    emoji: "🔧",
    hochdeutsch: "der Automechaniker / die Automechanikerin",
    schwiizerduetsch: "de Automechaniker / d'Automechanikerin",
    description: {
      es: "El mecánico o la mecánica revisa y repara tu coche; acude a él si escuchas ruidos raros, hay una avería o toca el mantenimiento.",
      en: "The mechanic checks and repairs your car; go to them if you hear strange noises, something breaks down, or it's time for maintenance.",
      pt: "O mecânico ou a mecânica revê e repara o teu carro; procura-o se ouvires ruídos estranhos, houver uma avaria ou for altura da manutenção.",
      fr: "Le mécanicien ou la mécanicienne vérifie et répare votre voiture ; allez le voir si vous entendez des bruits étranges, en cas de panne ou pour l'entretien.",
      it: "Il meccanico o la meccanica controlla e ripara la tua auto; rivolgiti a lui se senti rumori strani, c'è un guasto o è ora della manutenzione.",
      sq: "Mekaniku ose mekanikja kontrollon dhe riparon makinën tënde; shko tek ai nëse dëgjon zhurma të çuditshme, prishet diçka ose është koha për mirëmbajtje.",
      tr: "Tamirci arabanızı kontrol edip tamir eder; garip sesler duyarsanız, bir arıza olursa veya bakım zamanı geldiğinde ona başvurun.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Mein Auto macht ein komisches Geräusch",
        schwiizerduetsch: "Mis Auto macht en komisch Gruusch",
        base: { es: "Mi coche hace un ruido raro", en: "My car is making a strange noise", pt: "O meu carro está a fazer um ruído estranho", fr: "Ma voiture fait un bruit bizarre", it: "La mia auto fa uno strano rumore", sq: "Makina ime bën një zhurmë të çuditshme", tr: "Arabam garip bir ses çıkarıyor" },
      },
      {
        hochdeutsch: "Wann ist es fertig?",
        schwiizerduetsch: "Wenn isch's parat?",
        base: { es: "¿Cuándo estará listo?", en: "When will it be ready?", pt: "Quando estará pronto?", fr: "Quand sera-ce prêt ?", it: "Quando sarà pronta?", sq: "Kur do të jetë gati?", tr: "Ne zaman hazır olacak?" },
      },
      {
        hochdeutsch: "Was kostet die Reparatur?",
        schwiizerduetsch: "Was choschtet d'Reparatur?",
        base: { es: "¿Cuánto cuesta la reparación?", en: "How much does the repair cost?", pt: "Quanto custa a reparação?", fr: "Combien coûte la réparation ?", it: "Quanto costa la riparazione?", sq: "Sa kushton riparimi?", tr: "Tamir ne kadar tutar?" },
      },
    ],
  },
  {
    id: "nurse",
    emoji: "💉",
    hochdeutsch: "der Krankenpfleger / die Krankenschwester",
    schwiizerduetsch: "de Pfleger / d'Pflegere",
    description: {
      es: "El enfermero o la enfermera te cuida en el hospital o la clínica, controla tu dolor y te explica los cuidados después de una consulta o cirugía.",
      en: "The nurse cares for you in the hospital or clinic, manages your pain, and explains aftercare following a visit or procedure.",
      pt: "O enfermeiro ou a enfermeira cuida de ti no hospital ou na clínica, controla a tua dor e explica os cuidados após uma consulta ou cirurgia.",
      fr: "L'infirmier ou l'infirmière s'occupe de vous à l'hôpital ou en clinique, gère votre douleur et explique les soins après une consultation ou une opération.",
      it: "L'infermiere o l'infermiera si prende cura di te in ospedale o in clinica, gestisce il tuo dolore e ti spiega le cure dopo una visita o un intervento.",
      sq: "Infermieri ose infermierja kujdeset për ty në spital ose klinikë, menaxhon dhimbjen tënde dhe të shpjegon kujdesin pas një vizite ose operacioni.",
      tr: "Hemşire hastanede veya klinikte size bakar, ağrınızı yönetir ve bir muayene ya da işlemden sonraki bakımı açıklar.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Kann ich etwas gegen die Schmerzen haben?",
        schwiizerduetsch: "Chan ich öppis gäge d'Schmerze ha?",
        base: { es: "¿Puedo tomar algo para el dolor?", en: "Can I have something for the pain?", pt: "Posso tomar algo para a dor?", fr: "Puis-je avoir quelque chose contre la douleur ?", it: "Posso avere qualcosa per il dolore?", sq: "A mund të kem diçka për dhimbjen?", tr: "Ağrı için bir şey alabilir miyim?" },
      },
      {
        hochdeutsch: "Wann kann ich nach Hause gehen?",
        schwiizerduetsch: "Wenn cha ich hei gah?",
        base: { es: "¿Cuándo puedo irme a casa?", en: "When can I go home?", pt: "Quando posso ir para casa?", fr: "Quand puis-je rentrer chez moi ?", it: "Quando posso tornare a casa?", sq: "Kur mund të shkoj në shtëpi?", tr: "Ne zaman eve gidebilirim?" },
      },
      {
        hochdeutsch: "Mir ist schwindlig",
        schwiizerduetsch: "Mir isch schwindlig",
        base: { es: "Estoy mareado/a", en: "I feel dizzy", pt: "Sinto-me tonto/a", fr: "J'ai des vertiges", it: "Ho le vertigini", sq: "Ndihem i/e trullosur", tr: "Başım dönüyor" },
      },
    ],
  },
  {
    id: "cashier",
    emoji: "🛒",
    hochdeutsch: "der Verkäufer / die Verkäuferin",
    schwiizerduetsch: "de Verchöifer / d'Verchöiferin",
    description: {
      es: "El dependiente o la dependienta te atiende en la tienda, te ayuda a encontrar productos y cobra tu compra en caja.",
      en: "The shop assistant helps you in the store, guides you to find products, and processes your payment at the till.",
      pt: "O empregado ou a empregada de loja atende-te na loja, ajuda-te a encontrar produtos e cobra a tua compra na caixa.",
      fr: "Le vendeur ou la vendeuse vous aide en magasin, vous guide pour trouver des produits et encaisse votre achat à la caisse.",
      it: "Il commesso o la commessa ti assiste in negozio, ti aiuta a trovare i prodotti e incassa il tuo acquisto alla cassa.",
      sq: "Shitësi ose shitësja të ndihmon në dyqan, të udhëzon të gjesh produktet dhe merr pagesën tënde në arkë.",
      tr: "Satış görevlisi mağazada size yardımcı olur, ürünleri bulmanıza rehberlik eder ve kasada ödemenizi alır.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Wo finde ich...?",
        schwiizerduetsch: "Wo find ich...?",
        base: { es: "¿Dónde encuentro...?", en: "Where do I find...?", pt: "Onde encontro...?", fr: "Où puis-je trouver... ?", it: "Dove trovo...?", sq: "Ku e gjej...?", tr: "...nerede bulabilirim?" },
      },
      {
        hochdeutsch: "Haben Sie das auch in der Größe...?",
        schwiizerduetsch: "Hend Sie das o in de Grössi...?",
        base: { es: "¿Tiene esto también en la talla...?", en: "Do you have this in size...?", pt: "Tem isto também no tamanho...?", fr: "Avez-vous ceci aussi en taille... ?", it: "Ha questo anche nella taglia...?", sq: "A e keni këtë edhe në madhësinë...?", tr: "Bunun ... bedeni var mı?" },
      },
      {
        hochdeutsch: "Kann ich mit Karte zahlen?",
        schwiizerduetsch: "Chan ich mit Charte zahle?",
        base: { es: "¿Puedo pagar con tarjeta?", en: "Can I pay by card?", pt: "Posso pagar com cartão?", fr: "Puis-je payer par carte ?", it: "Posso pagare con la carta?", sq: "A mund të paguaj me kartë?", tr: "Kartla ödeme yapabilir miyim?" },
      },
    ],
  },
  {
    id: "waiter",
    emoji: "🍽️",
    hochdeutsch: "der Kellner / die Kellnerin",
    schwiizerduetsch: "de Kellner / d'Kellnerin",
    description: {
      es: "El camarero o la camarera te atiende en el restaurante, toma tu pedido y te trae la cuenta al final.",
      en: "The waiter or waitress serves you at the restaurant, takes your order, and brings the bill at the end.",
      pt: "O empregado de mesa ou a empregada de mesa atende-te no restaurante, anota o teu pedido e traz a conta no final.",
      fr: "Le serveur ou la serveuse vous sert au restaurant, prend votre commande et apporte l'addition à la fin.",
      it: "Il cameriere o la cameriera ti serve al ristorante, prende la tua ordinazione e porta il conto alla fine.",
      sq: "Kamarieri ose kamarierja të shërben në restorant, merr porosinë tënde dhe sjell faturën në fund.",
      tr: "Garson restoranda size hizmet eder, siparişinizi alır ve sonunda hesabı getirir.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Die Rechnung bitte",
        schwiizerduetsch: "D'Rächnig bitte",
        base: { es: "La cuenta, por favor", en: "The bill, please", pt: "A conta, por favor", fr: "L'addition, s'il vous plaît", it: "Il conto, per favore", sq: "Faturën, ju lutem", tr: "Hesap, lütfen" },
      },
      {
        hochdeutsch: "Was empfehlen Sie?",
        schwiizerduetsch: "Was empfehlet Sie?",
        base: { es: "¿Qué me recomienda?", en: "What do you recommend?", pt: "O que recomenda?", fr: "Que me recommandez-vous ?", it: "Cosa mi consiglia?", sq: "Çfarë më rekomandoni?", tr: "Ne önerirsiniz?" },
      },
      {
        hochdeutsch: "Ich bin Vegetarier/in",
        schwiizerduetsch: "Ich bi Vegetarier/i",
        base: { es: "Soy vegetariano/a", en: "I am vegetarian", pt: "Sou vegetariano/a", fr: "Je suis végétarien(ne)", it: "Sono vegetariano/a", sq: "Jam vegjetarian/e", tr: "Vejetaryenim" },
      },
    ],
  },
  {
    id: "hairdresser",
    emoji: "💇",
    hochdeutsch: "der Coiffeur / die Coiffeuse",
    schwiizerduetsch: "de Coiffeur / d'Coiffeuse",
    description: {
      es: "El peluquero o la peluquera (aquí se dice 'Coiffeur') te corta y peina el cabello; conviene pedir cita con antelación.",
      en: "The hairdresser (called 'Coiffeur' here) cuts and styles your hair; it's best to book an appointment in advance.",
      pt: "O cabeleireiro ou a cabeleireira (aqui chamado 'Coiffeur') corta e penteia o teu cabelo; convém marcar hora com antecedência.",
      fr: "Le coiffeur ou la coiffeuse coupe et coiffe vos cheveux ; il vaut mieux prendre rendez-vous à l'avance.",
      it: "Il parrucchiere o la parrucchiera (qui chiamato 'Coiffeur') taglia e acconcia i capelli; conviene prenotare un appuntamento in anticipo.",
      sq: "Berberi ose parukierja (këtu quhet 'Coiffeur') pret dhe stilizon flokët; është mirë të rezervosh një takim paraprakisht.",
      tr: "Kuaför (burada 'Coiffeur' denir) saçınızı keser ve şekillendirir; önceden randevu almak en iyisidir.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Nicht zu kurz bitte",
        schwiizerduetsch: "Nid z'kurz bitte",
        base: { es: "No muy corto, por favor", en: "Not too short, please", pt: "Não muito curto, por favor", fr: "Pas trop court, s'il vous plaît", it: "Non troppo corti, per favore", sq: "Jo shumë të shkurtër, ju lutem", tr: "Çok kısa olmasın, lütfen" },
      },
      {
        hochdeutsch: "Können Sie die Spitzen schneiden?",
        schwiizerduetsch: "Chönd Sie d'Spitze schniide?",
        base: { es: "¿Puede cortarme las puntas?", en: "Can you trim the ends?", pt: "Pode cortar as pontas?", fr: "Pouvez-vous couper les pointes ?", it: "Può spuntare le punte?", sq: "A mund të prisni majat?", tr: "Uçlarını kesebilir misiniz?" },
      },
      {
        hochdeutsch: "Ich hätte gern einen Termin",
        schwiizerduetsch: "Ich hätt gern en Termin",
        base: { es: "Quisiera pedir una cita", en: "I'd like to book an appointment", pt: "Gostaria de marcar uma hora", fr: "Je voudrais prendre rendez-vous", it: "Vorrei prenotare un appuntamento", sq: "Do të doja të rezervoja një takim", tr: "Randevu almak istiyorum" },
      },
    ],
  },
  {
    id: "handwerker",
    emoji: "🔌",
    hochdeutsch: "der Elektriker / die Elektrikerin (Handwerker)",
    schwiizerduetsch: "de Handwercher / d'Handwercherin",
    description: {
      es: "El o la Handwerker (electricista o fontanero) arregla averías en casa, como luces que no funcionan o fugas de agua; llámalo si algo se estropea.",
      en: "The Handwerker (electrician or plumber) fixes problems at home, like lights that don't work or water leaks; call them if something breaks.",
      pt: "O Handwerker (eletricista ou canalizador) resolve avarias em casa, como luzes que não funcionam ou fugas de água; chama-o se algo avariar.",
      fr: "Le Handwerker (électricien ou plombier) répare les pannes à la maison, comme des lumières qui ne fonctionnent pas ou des fuites d'eau ; appelez-le en cas de problème.",
      it: "L'Handwerker (elettricista o idraulico) ripara i guasti in casa, come luci che non funzionano o perdite d'acqua; chiamalo se qualcosa si rompe.",
      sq: "Handwerker-i (elektricisti ose hidraulikja) rregullon defektet në shtëpi, si dritat që nuk punojnë ose rrjedhjet e ujit; thirre nëse diçka prishet.",
      tr: "Handwerker (elektrikçi veya tesisatçı) evdeki arızaları, örneğin çalışmayan ışıkları veya su kaçaklarını onarır; bir şey bozulursa onu arayın.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Das Licht geht nicht",
        schwiizerduetsch: "D'Liecht gaht nid",
        base: { es: "La luz no funciona", en: "The light doesn't work", pt: "A luz não funciona", fr: "La lumière ne fonctionne pas", it: "La luce non funziona", sq: "Drita nuk punon", tr: "Işık çalışmıyor" },
      },
      {
        hochdeutsch: "Es gibt einen Wasserschaden",
        schwiizerduetsch: "Es hät en Wasserschade",
        base: { es: "Hay un daño por agua", en: "There's water damage", pt: "Há um dano de água", fr: "Il y a un dégât des eaux", it: "C'è un danno causato dall'acqua", sq: "Ka një dëmtim nga uji", tr: "Su hasarı var" },
      },
      {
        hochdeutsch: "Wann können Sie kommen?",
        schwiizerduetsch: "Wenn chönd Sie cho?",
        base: { es: "¿Cuándo puede venir?", en: "When can you come?", pt: "Quando pode vir?", fr: "Quand pouvez-vous venir ?", it: "Quando può venire?", sq: "Kur mund të vini?", tr: "Ne zaman gelebilirsiniz?" },
      },
    ],
  },
  {
    id: "postal-worker",
    emoji: "📮",
    hochdeutsch: "der Pöstler / die Pöstlerin",
    schwiizerduetsch: "de Pöstler / d'Pöstlere",
    description: {
      es: "El cartero o la cartera reparte tu correo y paquetes; en la oficina de correos también puedes enviar cartas o paquetes tú mismo.",
      en: "The postal worker delivers your mail and parcels; at the post office you can also send letters or packages yourself.",
      pt: "O carteiro ou a carteira entrega o teu correio e encomendas; nos correios também podes enviar cartas ou pacotes tu próprio.",
      fr: "Le facteur ou la factrice livre votre courrier et vos colis ; à la poste, vous pouvez aussi envoyer des lettres ou des colis vous-même.",
      it: "Il postino o la postina consegna la tua posta e i pacchi; all'ufficio postale puoi anche spedire lettere o pacchi tu stesso.",
      sq: "Postieri ose postierja të dorëzon postën dhe paketat; në zyrën postare mund të dërgosh vetë letra ose pako.",
      tr: "Postacı postanızı ve paketlerinizi teslim eder; postanede kendiniz de mektup veya paket gönderebilirsiniz.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Ich möchte ein Paket aufgeben",
        schwiizerduetsch: "Ich möcht es Päckli ufgäh",
        base: { es: "Quisiera enviar un paquete", en: "I'd like to send a package", pt: "Gostaria de enviar uma encomenda", fr: "Je voudrais envoyer un colis", it: "Vorrei spedire un pacco", sq: "Do të doja të dërgoja një pako", tr: "Bir paket göndermek istiyorum" },
      },
      {
        hochdeutsch: "Wo ist die Post?",
        schwiizerduetsch: "Wo isch d'Poscht?",
        base: { es: "¿Dónde está la oficina de correos?", en: "Where is the post office?", pt: "Onde são os correios?", fr: "Où est la poste ?", it: "Dov'è l'ufficio postale?", sq: "Ku është zyra postare?", tr: "Postane nerede?" },
      },
      {
        hochdeutsch: "Wie lange braucht das?",
        schwiizerduetsch: "Wie lang bruucht das?",
        base: { es: "¿Cuánto tiempo tardará?", en: "How long will it take?", pt: "Quanto tempo vai demorar?", fr: "Combien de temps cela va-t-il prendre ?", it: "Quanto tempo ci vorrà?", sq: "Sa kohë do të marrë kjo?", tr: "Bu ne kadar sürer?" },
      },
    ],
  },
  {
    id: "driver",
    emoji: "🚌",
    hochdeutsch: "der Buschauffeur / die Buschauffeurin",
    schwiizerduetsch: "de Buschauffeur / d'Buschauffeurin",
    description: {
      es: "El conductor o la conductora de bus o tranvía te lleva por la ciudad; pregúntale si tienes dudas sobre paradas o transbordos.",
      en: "The bus or tram driver takes you around the city; ask them if you're unsure about stops or transfers.",
      pt: "O condutor ou a condutora de autocarro ou elétrico leva-te pela cidade; pergunta-lhe se tiveres dúvidas sobre paragens ou transbordos.",
      fr: "Le conducteur ou la conductrice de bus ou de tram vous transporte en ville ; demandez-lui si vous avez des doutes sur les arrêts ou les correspondances.",
      it: "L'autista di bus o tram ti porta in giro per la città; chiedigli se hai dubbi su fermate o coincidenze.",
      sq: "Shoferi ose shoferja e autobusit ose tramvajit të çon nëpër qytet; pyete nëse ke dyshime për ndalesat ose ndërrimet.",
      tr: "Otobüs veya tramvay şoförü sizi şehirde gezdirir; duraklar veya aktarmalar konusunda emin değilseniz ona sorun.",
    },
    usefulPhrases: [
      {
        hochdeutsch: "Hält er bei...?",
        schwiizerduetsch: "Hebet de bim...?",
        base: { es: "¿Para en...?", en: "Do you stop at...?", pt: "Para em...?", fr: "Est-ce que ça s'arrête à... ?", it: "Si ferma a...?", sq: "A ndalon te...?", tr: "...durağına duruyor mu?" },
      },
      {
        hochdeutsch: "Wo muss ich umsteigen?",
        schwiizerduetsch: "Wo mues ich umstiige?",
        base: { es: "¿Dónde tengo que hacer transbordo?", en: "Where do I need to transfer?", pt: "Onde tenho de fazer transbordo?", fr: "Où dois-je changer ?", it: "Dove devo cambiare?", sq: "Ku duhet të ndërroj?", tr: "Nerede aktarma yapmam gerekiyor?" },
      },
      {
        hochdeutsch: "Ist das der Bus zum Bahnhof?",
        schwiizerduetsch: "Isch das de Bus zum Bahnhof?",
        base: { es: "¿Es este el autobús a la estación?", en: "Is this the bus to the station?", pt: "É este o autocarro para a estação?", fr: "Est-ce le bus pour la gare ?", it: "È questo l'autobus per la stazione?", sq: "A është ky autobusi për në stacion?", tr: "Bu, istasyona giden otobüs mü?" },
      },
    ],
  },
]
