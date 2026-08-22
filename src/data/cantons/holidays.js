// Festivos y eventos culturales de los 5 cantones germanófonos soportados
// en el lanzamiento. Las fechas fijas son exactas; las fechas "movibles"
// (Pascua, Fasnacht, Sechseläuten, etc.) están calculadas para 2026 como
// mejor aproximación de demo — antes de producción, verificar contra la
// fuente oficial de cada cantón (p. ej. feiertagskalender.ch) y recalcular
// cada año o implementar el cálculo real de Pascua computus.
//
// type: 'national'   -> festivo en toda Suiza
//       'cantonal'    -> festivo oficial solo en ese cantón
//       'cultural'    -> evento tradicional sin ser día no laborable
export const CANTONS = [
  { id: 'zurich', name: 'Zürich', shortName: 'ZH', color: '#0060A9' },
  { id: 'bern', name: 'Bern', shortName: 'BE', color: '#D52B1E' },
  { id: 'luzern', name: 'Luzern', shortName: 'LU', color: '#0F5FA6' },
  { id: 'basel', name: 'Basel-Stadt', shortName: 'BS', color: '#000000' },
  { id: 'stgallen', name: 'St. Gallen', shortName: 'SG', color: '#00843D' },
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
  stgallen: [
    { date: '2026-10-08', name: 'OLMA', icon: '🐄', type: 'cultural', description: 'Feria suiza de otoño (agricultura y estilo de vida): degustaciones, ganado premiado y la icónica bratwurst de St. Gallen.' },
    { date: '2026-06-15', name: 'Kinderfest (referencia)', icon: '🎈', type: 'cultural', description: 'Fiesta infantil centenaria que se celebra cada 3 años con desfile de disfraces por el centro histórico (próxima edición a confirmar).' },
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
