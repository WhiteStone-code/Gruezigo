// Deriva "fortalezas" y "debilidades" a partir de exerciseStats (ya
// trackeado por lección en UserProgressContext.completeLesson). No hace
// falta guardar nada nuevo: todo sale de los datos que ya existen.

function lessonAccuracies(exerciseStats, lessons) {
  return Object.entries(exerciseStats)
    .filter(([, stats]) => stats.total > 0)
    .map(([lessonId, stats]) => {
      const lesson = lessons.find((l) => l.id === lessonId)
      if (!lesson) return null
      return { lesson, correct: stats.correct, total: stats.total, accuracy: stats.correct / stats.total }
    })
    .filter(Boolean)
}

export function getWeakestLesson(exerciseStats, lessons) {
  const accuracies = lessonAccuracies(exerciseStats, lessons)
  if (!accuracies.length) return null
  return accuracies.reduce((min, cur) => (cur.accuracy < min.accuracy ? cur : min))
}

export function getStrongestLesson(exerciseStats, lessons) {
  const accuracies = lessonAccuracies(exerciseStats, lessons)
  if (!accuracies.length) return null
  return accuracies.reduce((max, cur) => (cur.accuracy > max.accuracy ? cur : max))
}

export function getOverallAccuracy(exerciseStats) {
  const values = Object.values(exerciseStats).filter((s) => s.total > 0)
  if (!values.length) return null
  const correct = values.reduce((sum, s) => sum + s.correct, 0)
  const total = values.reduce((sum, s) => sum + s.total, 0)
  return Math.round((correct / total) * 100)
}

export function getAllLessonAccuracies(exerciseStats, lessons) {
  return lessonAccuracies(exerciseStats, lessons).sort((a, b) => a.accuracy - b.accuracy)
}
