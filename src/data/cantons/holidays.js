// Festivos y eventos culturales de los cantones (mayoritariamente)
// germanófonos de Suiza. Las fechas fijas son exactas; las fechas
// "movibles" (Pascua, Fasnacht, Sechseläuten, etc.) están calculadas para
// 2026 como mejor aproximación de demo — antes de producción, verificar
// contra la fuente oficial de cada cantón (p. ej. feiertagskalender.ch) y
// recalcular cada año o implementar el cálculo real de Pascua computus.
//
// type: 'national'   -> festivo en toda Suiza
//       'cantonal'    -> festivo oficial solo en ese cantón
//       'cultural'    -> evento tradicional sin ser día no laborable
export const CANTONS = [
  { id: 'zurich', name: 'Zürich', shortName: 'ZH', color: '#0060A9' },
  { id: 'bern', name: 'Bern', shortName: 'BE', color: '#D52B1E' },
  { id: 'luzern', name: 'Luzern', shortName: 'LU', color: '#0F5FA6' },
  { id: 'basel', name: 'Basel-Stadt', shortName: 'BS', color: '#000000' },
  { id: 'baselland', name: 'Basel-Landschaft', shortName: 'BL', color: '#C1272D' },
  { id: 'stgallen', name: 'St. Gallen', shortName: 'SG', color: '#00843D' },
  { id: 'aargau', name: 'Aargau', shortName: 'AG', color: '#1B75BB' },
  { id: 'thurgau', name: 'Thurgau', shortName: 'TG', color: '#00A651' },
  { id: 'schaffhausen', name: 'Schaffhausen', shortName: 'SH', color: '#F7941D' },
  { id: 'zug', name: 'Zug', shortName: 'ZG', color: '#1857A4' },
  { id: 'solothurn', name: 'Solothurn', shortName: 'SO', color: '#C1272D' },
  { id: 'schwyz', name: 'Schwyz', shortName: 'SZ', color: '#D52B1E' },
  { id: 'glarus', name: 'Glarus', shortName: 'GL', color: '#C1272D' },
  { id: 'uri', name: 'Uri', shortName: 'UR', color: '#F7B500' },
  { id: 'obwalden', name: 'Obwalden', shortName: 'OW', color: '#C1272D' },
  { id: 'nidwalden', name: 'Nidwalden', shortName: 'NW', color: '#C1272D' },
  { id: 'appenzellAR', name: 'Appenzell Ausserrhoden', shortName: 'AR', color: '#000000' },
  { id: 'appenzellAI', name: 'Appenzell Innerrhoden', shortName: 'AI', color: '#000000' },
  { id: 'graubuenden', name: 'Graubünden', shortName: 'GR', color: '#3A789E' },
]

const NATIONAL_2026 = [
  { date: '2026-01-01', name: 'Neujahrstag', icon: '🎆', type: 'national', description: 'Año Nuevo — día festivo en toda Suiza.' },
  { date: '2026-04-03', name: 'Karfreitag', icon: '✝️', type: 'national', description: 'Viernes Santo.' },
  { date: '2026-04-06', name: 'Ostermontag', icon: '🐣', type: 'national', description: 'Lunes de Pascua.' },
  { date: '2026-05-14', name: 'Auffahrt', icon: '🕊️', type: 'national', description: 'Ascensión.' },
  { date: '2026-05-25', name: 'Pfingstmontag', icon: '🌼', type: 'national', description: 'Lunes de Pentecostés.' },
  { date: '2026-08-01', name: 'Bundesfeier', icon: '🇨🇭', type: 'national', description: 'Fiesta Nacional Suiza — fuegos artificiales y hogueras en todo el país.' },
  { date: '2026-12-25', name: 'Weihnachten', icon: '🎄', type: 'national', description: 'Navidad.' },
  { date: '2026-12-26', name: 'Stephanstag', icon: '❄️', type: 'national', description: 'San Esteban (segundo día de Navidad).' },
]

const CANTONAL_EVENTS_2026 = {
  zurich: [
    { date: '2026-01-02', name: 'Berchtoldstag', icon: '🎊', type: 'cantonal', description: 'Día festivo cantonal tras Año Nuevo.' },
    { date: '2026-04-20', name: 'Sechseläuten', icon: '🔥', type: 'cultural', description: 'Los gremios desfilan a caballo y queman al "Böögg", un muñeco de nieve, para anunciar el fin del invierno. Cuanto más rápido explota su cabeza, mejor será el verano.' },
    { date: '2026-09-12', name: 'Knabenschiessen', icon: '🎯', type: 'cultural', description: 'Histórico concurso de tiro juvenil convertido en la mayor feria popular de Zúrich, con atracciones y puestos de comida.' },
  ],
  bern: [
    { date: '2026-01-02', name: 'Berchtoldstag', icon: '🎊', type: 'cantonal', description: 'Día festivo cantonal tras Año Nuevo.' },
    { date: '2026-03-09', name: 'Berner Fasnacht', icon: '🎭', type: 'cultural', description: 'Carnaval de Berna: desfiles, disfraces y "Guggenmusik" (bandas de música estridente) por el casco antiguo.' },
    { date: '2026-11-23', name: 'Zibelemärit', icon: '🧅', type: 'cultural', description: 'El "Mercado de la Cebolla": el evento más pintoresco del año, con puestos de trenzas de cebolla, confeti y batallas de serpentinas.' },
  ],
  luzern: [
    { date: '2026-02-12', name: 'Schmutziger Donnerstag', icon: '🎪', type: 'cultural', description: 'Arranque de la Fasnacht de Lucerna a las 5:00 con el estruendo de las "Guuggenmusigen" — el carnaval más ruidoso de Suiza.' },
    { date: '2026-02-17', name: 'Lozärner Fasnacht (cierre)', icon: '🎉', type: 'cultural', description: 'Días finales del carnaval lucernés, con el "Monstercorso" desfilando por el centro histórico.' },
    { date: '2026-08-15', name: 'Mariä Himmelfahrt', icon: '⛪', type: 'cantonal', description: 'Asunción de María — festivo cantonal de tradición católica.' },
  ],
  basel: [
    { date: '2026-01-19', name: 'Vogel-Gryff-Fäscht', icon: '🦅', type: 'cultural', description: 'Fiesta gremial de "Kleinbasel": el Grifo, el León Salvaje y el Leu bailan en el Rin en una balsa, sin dirigirse la palabra a los gremios de "Grossbasel".' },
    { date: '2026-02-23', name: 'Basler Fasnacht — Morgestraich', icon: '🏮', type: 'cultural', description: 'A las 4:00 en punto se apagan las luces de la ciudad y miles de faroles pintados a mano inundan las calles: arranca el mayor carnaval protestante de Europa (3 días).' },
  ],
  baselland: [
    { date: '2026-02-23', name: 'Basler Fasnacht (regional)', icon: '🏮', type: 'cultural', description: 'Muchos pueblos del Baselbiet participan de la misma Fasnacht que la ciudad de Basilea, con sus propias "cliqueras" locales.' },
    { date: '2026-04-06', name: 'Temporada de floración de cerezos', icon: '🌸', type: 'cultural', description: 'El Baselbiet es tierra de huertos y cerezos ("Chriesi") — primavera es la mejor época para rutas por sus pueblos agrícolas.' },
  ],
  stgallen: [
    { date: '2026-10-08', name: 'OLMA', icon: '🐄', type: 'cultural', description: 'Feria suiza de otoño (agricultura y estilo de vida): degustaciones, ganado premiado y la icónica bratwurst de St. Gallen.' },
    { date: '2026-06-15', name: 'Kinderfest (referencia)', icon: '🎈', type: 'cultural', description: 'Fiesta infantil centenaria que se celebra cada 3 años con desfile de disfraces por el centro histórico (próxima edición a confirmar).' },
  ],
  aargau: [
    { date: '2026-11-04', name: 'Rüeblimärt', icon: '🥕', type: 'cultural', description: 'El "Mercado de la Zanahoria" de Aarau: puestos, trenzas y esculturas hechas enteramente de zanahorias, todo un día.' },
  ],
  thurgau: [
    { date: '2026-07-09', name: 'Frauenfelder Openair', icon: '🎸', type: 'cultural', description: 'Uno de los festivales de música al aire libre más grandes de Suiza, en Frauenfeld.' },
    { date: '2026-10-01', name: 'Cosecha de manzanas', icon: '🍎', type: 'cultural', description: 'Thurgau es "Mostindien" — la tierra suiza de la sidra: en otoño los huertos y lagares abren sus puertas.' },
  ],
  schaffhausen: [
    { date: '2026-02-16', name: 'Schaffhauser Fasnacht', icon: '🎭', type: 'cultural', description: 'Carnaval local con desfiles y música por el casco antiguo medieval.' },
    { date: '2026-05-01', name: 'Rheinfall', icon: '💦', type: 'cultural', description: 'No es una fecha fija, sino la gran postal del cantón: la catarata más grande de Europa, espectacular todo el año.' },
  ],
  zug: [
    { date: '2026-08-28', name: 'Zuger Chilbi', icon: '🎡', type: 'cultural', description: 'La gran feria popular de la ciudad de Zug, con atracciones junto al lago.' },
    { date: '2026-09-01', name: 'Temporada de Zuger Kirsch', icon: '🍒', type: 'cultural', description: 'Zug es famoso por sus cerezas y el aguardiente "Kirsch" que se destila con ellas.' },
  ],
  solothurn: [
    { date: '2026-01-15', name: 'Solothurner Filmtage', icon: '🎬', type: 'cultural', description: 'El festival de cine suizo más importante del país, referente del cine hecho en Suiza.' },
  ],
  schwyz: [
    { date: '2026-12-04', name: 'Chlausjagen (Küssnacht am Rigi)', icon: '🔔', type: 'cultural', description: 'Procesión nocturna con enormes mitras de papel iluminadas ("Iffele") y el estruendo de cencerros y cuernos de vaca.' },
    { date: '2026-08-01', name: 'Rütlischwur (referencia histórica)', icon: '📜', type: 'cultural', description: 'Schwyz es uno de los tres cantones fundadores de Suiza (1291) — su museo guarda el "Bundesbrief", el pacto federal original.' },
  ],
  glarus: [
    { date: '2026-04-02', name: 'Näfelser Fahrt', icon: '🕯️', type: 'cultural', description: 'Procesión conmemorativa centenaria de la batalla de Näfels (1388) — toda la población participa, incluidas las escuelas.' },
  ],
  uri: [
    { date: '2026-07-04', name: 'Tellspiele Altdorf (temporada)', icon: '🎯', type: 'cultural', description: 'Representaciones al aire libre de la leyenda de Wilhelm Tell, en la ciudad natal del mito, Altdorf — temporada de verano.' },
  ],
  obwalden: [
    { date: '2026-09-01', name: 'Alpabzug', icon: '🐮', type: 'cultural', description: 'Bajada del ganado de los alpes tras el verano, con las vacas engalanadas con coronas de flores — tradición típica de los cantones alpinos centrales.' },
  ],
  nidwalden: [
    { date: '2026-09-01', name: 'Alpabzug', icon: '🐮', type: 'cultural', description: 'Igual que en los cantones vecinos, el fin del verano se celebra con el descenso festivo del ganado desde los alpes.' },
  ],
  appenzellAR: [
    { date: '2026-01-13', name: 'Silvesterchlausen', icon: '🔔', type: 'cultural', description: 'Los "Chlaus", con máscaras y tocados enormes, recorren los pueblos cantando el "Zäuerli" para celebrar el fin de año según el calendario juliano.' },
  ],
  appenzellAI: [
    { date: '2026-04-26', name: 'Landsgemeinde', icon: '🙌', type: 'cultural', description: 'Asamblea popular al aire libre única en el mundo: los ciudadanos votan a mano alzada en la plaza del pueblo de Appenzell.' },
  ],
  graubuenden: [
    { date: '2026-03-01', name: 'Chalandamarz', icon: '🐄', type: 'cultural', description: 'Fiesta romanche de la llegada de la primavera: los niños recorren los pueblos de la Engadina haciendo sonar grandes cencerros.' },
    { date: '2026-01-19', name: 'World Economic Forum (Davos)', icon: '🏔️', type: 'cultural', description: 'Cada enero, Davos se convierte en el centro de atención mundial durante el Foro Económico Mundial.' },
  ],
}

export function getCantonEvents(cantonId) {
  const cantonal = CANTONAL_EVENTS_2026[cantonId] ?? []
  return [...NATIONAL_2026, ...cantonal].sort((a, b) => a.date.localeCompare(b.date))
}

export function getUpcomingEvent(cantonId, fromDate = new Date()) {
  const iso = fromDate.toISOString().slice(0, 10)
  return getCantonEvents(cantonId).find((event) => event.date >= iso) ?? null
}
