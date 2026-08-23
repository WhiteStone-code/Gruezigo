# una app de idiomas's A1 course structure — findings from the user's screen recording

Reviewed via 47 frames (1fps) extracted with a portable ffmpeg from a ~47s screen
recording of una app de idiomas's "Curso completo de alemán — Principiante A1" course map
(Spanish UI). The recording is a slow scroll through the *entire* course map,
not an opened lesson — so what follows is the structural/curricular picture,
not individual exercise-screen mechanics (those were already covered by the
earlier `docs/una app de idiomas-comparison.md` web-research pass).

## The structure

The whole A1 level is **~30 numbered chapters** ("Capítulo 1" ... "Capítulo
~30"), each with its own progress bar (e.g. "83%", "100%"), containing a
vertical path of **4-7 nodes**. Every chapter ends the same way and every
chapter's nodes follow the same rhythm:

```
[2-4 topic/vocab lessons] → [🗣️ Práctica de expresión oral] → [Adquirir fluidez] → [🏁 Prueba de control]
```

### Node types (this is the part GrüeziGo is missing)

| Node type | Visual | What it is |
|---|---|---|
| **Vocab/topic lesson** | Green ring, real photo (stock photography of people/objects/places) | The bulk of nodes — e.g. "Hallo!", "Presentarte", "Nombrar a los miembros de tu familia" |
| **Grammar lesson** | Yellow/gold ring, icon (not a photo) | Explicitly labeled, e.g. "Gramática: preposiciones (dativo)", "El verbo modal 'sollen'", "Hacer preguntas de sí/no" — grammar gets its **own distinct node type**, not folded invisibly into a vocab lesson |
| **Speaking practice** | Purple "✨ PRÁCTICA DE EXPRESIÓN ORAL" badge + decorative purple flourish graphic | Short, single-purpose: "Practica hablando alemán" |
| **Fluency/free production** | Green ring, "Adquirir fluidez" title | A capstone per chapter: "Habla de animales o personas que te gustan o que odias" — open speaking **or writing**, not multiple choice |
| **Chapter checkpoint** | Distinct flag/pennant icon, "Prueba de control" | Closes every chapter: "Evalúa tus conocimientos" — this is the una app de idiomas equivalent of an exam, but it's **once per chapter**, not once per lesson |
| **Level-end certificate gate** | Full-width blue banner, una app de idiomas-badge icon | Appears once, at the very end of all ~30 chapters: "¿Te animas a pasar de nivel? Has llegado al final del curso... demuestra tus logros con un certificado de una app de idiomas" + a "Pon a prueba tus conocimientos" CTA |

### Confirms and corrects the earlier web-research pass

- Confirms: chapters group a handful of lessons around one goal, checkpoints
  are periodic not per-lesson, speaking is a short dedicated beat.
- **New/corrected**: grammar is its own visible node type on the map (not
  just content folded into a lesson) — GrüeziGo's new `THEORY` step type
  (added this session) is the right *content* shape, but it's invisible at
  the map level right now; a lesson containing theory looks identical on the
  roadmap to one that doesn't.
- **New**: the certificate moment is **once per entire level** (~30
  chapters), gated behind a final test — GrüeziGo already does this
  correctly (certificate per CEFR level, not per lesson).
- **New**: chapter progress % and a chapter-level checkpoint are a layer
  GrüeziGo doesn't have at all — today it's flat `level → lessons`, no
  "chapter" grouping in between.

## Chapter topics actually seen (partial list, in order seen)

Greetings across regions → informal conversations (how are you, describing
yourself, understanding a short chat) → feelings → origin/nationality/where
you live/languages → pets → family & family visits → describing cities
(plurals, articles) → suggestions/cafés → housing & distances → numbers
above 20, telling time → dative prepositions → forms, emails, modal verb
"sollen" → final certificate gate.

## What this changes for GrüeziGo (implemented this pass)

1. Added `lessonType` metadata (`vocab | grammar | speaking | checkpoint`) to
   every lesson, and a matching distinct icon/color per type wherever
   lessons are listed (mountain path sheet, Repaso) — grammar-heavy lessons
   now visibly stand out instead of looking identical to vocab ones.
2. Named the two existing A1 groups as real chapters ("Capítulo 1: Primeros
   pasos", "Capítulo 2: Vida diaria") instead of bare level codes, matching
   una app de idiomas's "Capítulo N: <goal>" framing.
3. Not done this pass (flagged honestly): actually authoring ~30
   chapters/150+ nodes of content at una app de idiomas's scale. That's a multi-session
   content-authoring effort, not a structural one — the roadmap already
   shows A2.1 onward as "Próximamente" with real topic lists rather than
   pretending this breadth exists today.
