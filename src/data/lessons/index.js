import a1Greetings from './a1/a1-01-greetings.json'
import a1Supermarket from './a1/a1-02-supermarket.json'
import a1Restaurant from './a1/a1-03-restaurant.json'
import a12Transporte from './a1-2/a1-2-01-transporte.json'
import a12EnCasa from './a1-2/a1-2-02-en-casa.json'
import a12LaHora from './a1-2/a1-2-03-la-hora.json'

// Registro central de lecciones. Añadir aquí cada nuevo archivo JSON de nivel
// (a2-1-01-..., b1-1-01-..., etc.) para que aparezca en el mapa de niveles.
export const LESSONS_A1_1 = [a1Greetings, a1Supermarket, a1Restaurant]
export const LESSONS_A1_2 = [a12Transporte, a12EnCasa, a12LaHora]

export const ALL_LESSONS = [...LESSONS_A1_1, ...LESSONS_A1_2]

export function getLessonById(id) {
  return ALL_LESSONS.find((lesson) => lesson.id === id) ?? null
}

export function getLessonsByLevel(level) {
  return ALL_LESSONS.filter((lesson) => lesson.level === level).sort((a, b) => a.order - b.order)
}

// Todas las lecciones jugables, ordenadas por nivel y luego por orden dentro
// del nivel — es el "camino" completo que recorre el alumno.
export function getAllLessonsInOrder() {
  return [...ALL_LESSONS].sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level)
    return a.order - b.order
  })
}

// Primera lección no completada siguiendo el camino — usada en el Dashboard
// para el botón "Continuar", sin depender de qué nivel diga guardado el
// progreso (evita que quede desincronizado).
export function getNextLesson(completedLessons = []) {
  const path = getAllLessonsInOrder()
  return path.find((lesson) => !completedLessons.includes(lesson.id)) ?? path[path.length - 1] ?? null
}
