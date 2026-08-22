# GrüeziGo 🇨🇭

App multiplataforma (Web/PWA) para integrar a extranjeros en la Suiza alemana a través del Schwiizerdütsch — el dialecto suizo-alemán real, cantón por cantón.

## Stack

- **React 18** + **Vite** — SPA rápida, sin backend.
- **TailwindCSS** — paleta "GrüeziGo" (rojo suizo, blanco alpino, madera, queso) en `tailwind.config.js`.
- **Framer Motion** — transiciones entre pasos de lección, calendario y modales.
- **Lucide Icons** — iconografía consistente.
- **localStorage** (`useLocalStorage`) para progreso/config; **IndexedDB** (`src/utils/storage.js`) reservado para blobs pesados (audio grabado, certificados exportados) en fases futuras.
- Sin servidor: todo el estado vive en el navegador del usuario.

## Cómo correrlo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build && npm run preview
```

## Estructura de carpetas

```
src/
├── App.jsx                    # Router simple basado en estado (dashboard/lessons/calendar/culture)
├── main.jsx
├── index.css
│
├── context/
│   ├── LanguageContext.jsx     # Idioma de interfaz (7 idiomas) persistido en localStorage
│   └── UserProgressContext.jsx # Racha, XP, cantón, lecciones completadas, medallas
│
├── hooks/
│   ├── useLocalStorage.js
│   └── useSpeech.js            # Web Speech API: síntesis (escuchar) + reconocimiento (hablar)
│
├── utils/
│   └── storage.js              # IndexedDB para assets pesados (fase 2)
│
├── data/
│   ├── i18n/strings.js         # Cadenas de interfaz ES/EN/PT/FR/IT/SQ/TR
│   ├── cantons/holidays.js     # Festivos y eventos de ZH, BE, LU, BS, SG
│   └── lessons/
│       ├── a1/a1-01-greetings.json
│       ├── a1/a1-02-supermarket.json
│       ├── a1/a1-03-restaurant.json
│       └── index.js            # Registro central — añadir aquí cada lección nueva
│
└── components/
    ├── layout/       # Header, NavBar (sidebar en desktop / bottom nav en móvil)
    ├── dashboard/     # Dashboard, StreakCounter
    ├── calendar/      # CantonalCalendar, CantonSelector
    ├── lesson/        # LessonView (orquestador) + cada módulo interactivo
    ├── culture/       # CultureModule, WinterSpecial, SurvivalGuide
    ├── certificate/   # CertificateModal (exporta PNG vía <canvas>)
    └── ui/            # Button, Card, ProgressRing
```

## El flujo de una lección (`LessonView.jsx`)

1. **Comparación** Hochdeutsch vs. Schwiizerdütsch (momento de aprendizaje).
2. **Emparejar vocabulario** — dos columnas, clic para emparejar.
3. **Escuchar audio** — síntesis de voz (de-DE como mejor sustituto disponible del dialecto) + opción múltiple.
4. **Construcción de oraciones** — banco de palabras desordenado.
5. **Pronunciación** — SpeechRecognition compara tu voz con el texto esperado (comparación tolerante).
6. **Opción múltiple** — refuerzo rápido.
7. **Examen final** — 10 preguntas del JSON `finalExam`, sin límite de tiempo.
8. **Pantalla de finalización** — XP, racha y acceso al certificado.

Cada paso es un objeto `{ type }` generado dinámicamente a partir del JSON de la lección, así que añadir/quitar módulos por lección no requiere tocar el orquestador.

## Añadir una lección nueva

1. Crea `src/data/lessons/<nivel>/<id>.json` siguiendo el esquema de las 3 lecciones A1 existentes (`title`, `grammarConcept`, `comparisonTable`, `vocabulary`, `exercises`, `finalExam`, todos con las 7 traducciones).
2. Impórtala y añádela al array correspondiente en `src/data/lessons/index.js`.

## Pendiente para producción

- Manifest + service worker (PWA instalable offline).
- Voces TTS dedicadas de Schwiizerdütsch (hoy se usa `de-DE` como aproximación).
- Verificar/recalcular las fechas movibles del calendario cantonal cada año (`src/data/cantons/holidays.js`).
- Niveles A1.2 en adelante y export real de certificado en PDF.
