import a1Greetings from './a1/a1-01-greetings.json'
import a1Supermarket from './a1/a1-02-supermarket.json'
import a1Restaurant from './a1/a1-03-restaurant.json'

// Registro central de lecciones. Añadir aquí cada nuevo archivo JSON de nivel
// (a1-04-..., a2-01-..., etc.) para que aparezca en el mapa de lecciones.
export const LESSONS_A1 = [a1Greetings, a1Supermarket, a1Restaurant]

export const ALL_LESSONS = [...LESSONS_A1]

export function getLessonById(id) {
  return ALL_LESSONS.find((lesson) => lesson.id === id) ?? null
}

export function getLessonsByLevel(level) {
  return ALL_LESSONS.filter((lesson) => lesson.level === level).sort((a, b) => a.order - b.order)
}
