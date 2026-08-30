import a1Greetings from './a1/a1-01-greetings.json'
import a1Supermarket from './a1/a1-02-supermarket.json'
import a1Restaurant from './a1/a1-03-restaurant.json'
import a12Transporte from './a1-2/a1-2-01-transporte.json'
import a12EnCasa from './a1-2/a1-2-02-en-casa.json'
import a12LaHora from './a1-2/a1-2-03-la-hora.json'
import a13Doctor from './a1-3/a1-3-01-doctor.json'
import a13Feelings from './a1-3/a1-3-02-feelings.json'
import a14Nationality from './a1-4/a1-4-01-nationality.json'
import a14Languages from './a1-4/a1-4-02-languages.json'
import a15Directions from './a1-5/a1-5-01-directions.json'
import a15Places from './a1-5/a1-5-02-places.json'
import a21Clima from './a2-1/a2-1-01-clima.json'
import a21Planes from './a2-1/a2-1-02-planes.json'
import a22Tren from './a2-2/a2-2-01-tren.json'
import a22Piso from './a2-2/a2-2-02-piso.json'
import a23Seguro from './a2-3/a2-3-01-seguro.json'
import a23Correo from './a2-3/a2-3-02-correo.json'
import a24Excursion from './a2-4/a2-4-01-excursion.json'
import a24Hobbies from './a2-4/a2-4-02-hobbies.json'

// Registro central de lecciones. Añadir aquí cada nuevo archivo JSON de nivel
// (b1-1-01-..., etc.) para que aparezca en el mapa de niveles.
export const LESSONS_A1_1 = [a1Greetings, a1Supermarket, a1Restaurant]
export const LESSONS_A1_2 = [a12Transporte, a12EnCasa, a12LaHora]
export const LESSONS_A1_3 = [a13Doctor, a13Feelings]
export const LESSONS_A1_4 = [a14Nationality, a14Languages]
export const LESSONS_A1_5 = [a15Directions, a15Places]
export const LESSONS_A2_1 = [a21Clima, a21Planes]
export const LESSONS_A2_2 = [a22Tren, a22Piso]
export const LESSONS_A2_3 = [a23Seguro, a23Correo]
export const LESSONS_A2_4 = [a24Excursion, a24Hobbies]

export const ALL_LESSONS = [
  ...LESSONS_A1_1,
  ...LESSONS_A1_2,
  ...LESSONS_A1_3,
  ...LESSONS_A1_4,
  ...LESSONS_A1_5,
  ...LESSONS_A2_1,
  ...LESSONS_A2_2,
  ...LESSONS_A2_3,
  ...LESSONS_A2_4,
]

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
