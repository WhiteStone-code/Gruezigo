import { ALL_LESSONS } from './lessons/index.js'
import { VOCAB_THEMES } from './vocabulary/themes.js'

// Une el vocabulario de todas las lecciones jugables con el de las
// bibliotecas temáticas (familia, animales, colegio...) en un único
// formato común: { id, hochdeutsch, schwiizerduetsch, audioText, base }.
// Es la "cantera" de la que se nutre el modo Práctica del Repaso.

export function getPracticeSources() {
  const lessonSources = ALL_LESSONS.map((lesson) => ({
    kind: 'lesson',
    id: lesson.id,
    title: lesson.title,
    words: lesson.vocabulary,
  }))
  const themeSources = VOCAB_THEMES.map((theme) => ({
    kind: 'theme',
    id: theme.id,
    title: theme.title,
    icon: theme.icon,
    words: theme.words,
  }))
  return [...lessonSources, ...themeSources]
}

export function getAllPracticeWords() {
  return getPracticeSources().flatMap((s) => s.words)
}

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function pickPracticeWords(sourceId, count = 8) {
  const pool = sourceId === 'all' ? getAllPracticeWords() : getPracticeSources().find((s) => s.id === sourceId)?.words ?? []
  return shuffle(pool).slice(0, Math.min(count, pool.length))
}

// Genera preguntas de opción múltiple "¿cómo se dice X en Schwiizerdütsch?"
// a partir de un pool de palabras — reutiliza <ExerciseMultipleChoice/> tal
// cual, sin necesitar preguntas escritas a mano por tema.
export function buildVocabQuizQuestions(words, lang) {
  return words.map((word, idx) => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id)).slice(0, 3)
    const options = shuffle([word, ...distractors]).map((w) => ({ text: w.schwiizerduetsch, correct: w.id === word.id }))
    return {
      id: `quiz-${word.id}-${idx}`,
      question: {
        es: `¿Cómo se dice "${word.base.es}" en Schwiizerdütsch?`,
        en: `How do you say "${word.base.en}" in Schwiizerdütsch?`,
        pt: `Como se diz "${word.base.pt}" em Schwiizerdütsch?`,
        fr: `Comment dit-on « ${word.base.fr} » en Schwiizerdütsch ?`,
        it: `Come si dice "${word.base.it}" in Schwiizerdütsch?`,
        sq: `Si thuhet "${word.base.sq}" në Schwiizerdütsch?`,
        tr: `"${word.base.tr}" Schwiizerdütsch'te nasıl denir?`,
      },
      options,
    }
  })
}

// Genera ejercicios de pronunciación a partir de un pool de palabras —
// reutiliza <ExerciseSpeaking/> igual que en las lecciones.
export function buildPronunciationExercises(words) {
  return words.map((word, idx) => ({
    id: `pron-${word.id}-${idx}`,
    expectedText: word.schwiizerduetsch,
    lang: 'de-DE',
    hint: word.base,
  }))
}
