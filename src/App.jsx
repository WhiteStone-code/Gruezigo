import { useState } from 'react'
import { Header } from './components/layout/Header.jsx'
import { NavBar } from './components/layout/NavBar.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { CantonalCalendar } from './components/calendar/CantonalCalendar.jsx'
import { CultureModule } from './components/culture/CultureModule.jsx'
import { LessonView } from './components/lesson/LessonView.jsx'
import { CertificateModal } from './components/certificate/CertificateModal.jsx'
import { getLessonById, getLessonsByLevel } from './data/lessons/index.js'
import { useUserProgress } from './context/UserProgressContext.jsx'
import { useLanguage } from './context/LanguageContext.jsx'

function LessonsMap({ onOpenLesson }) {
  const { interfaceLang } = useLanguage()
  const { progress } = useUserProgress()
  const lessons = getLessonsByLevel(progress.level)

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-3">
      <h2 className="font-display font-bold text-2xl text-alp-900 mb-2">Lecciones · {progress.level}</h2>
      {lessons.map((lesson) => {
        const done = progress.completedLessons.includes(lesson.id)
        return (
          <button
            key={lesson.id}
            onClick={() => onOpenLesson(lesson.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl2 text-left shadow-card transition-transform hover:-translate-y-0.5
              ${done ? 'bg-green-50' : 'bg-white'}`}
          >
            <span
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
              ${done ? 'bg-green-500 text-white' : 'bg-swiss-red/10 text-swiss-red'}`}
            >
              {done ? '✓' : lesson.order}
            </span>
            <div>
              <p className="font-semibold text-alp-900">{lesson.title[interfaceLang] ?? lesson.title.es}</p>
              <p className="text-xs text-alp-500">{lesson.grammarConcept[interfaceLang] ?? lesson.grammarConcept.es}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('dashboard') // dashboard | lessons | calendar | culture
  const [activeLessonId, setActiveLessonId] = useState(null)
  const [certificateOpen, setCertificateOpen] = useState(false)
  const { progress } = useUserProgress()

  const activeLesson = activeLessonId ? getLessonById(activeLessonId) : null

  function openLesson(id) {
    setActiveLessonId(id)
  }

  function closeLesson() {
    setActiveLessonId(null)
  }

  if (activeLesson) {
    return (
      <div className="min-h-screen bg-alp-50 py-6">
        <LessonView
          lesson={activeLesson}
          onExit={closeLesson}
          onRequestCertificate={() => {
            closeLesson()
            setCertificateOpen(true)
          }}
        />
        <CertificateModal
          open={certificateOpen}
          level={progress.level.split('.')[0]}
          onClose={() => setCertificateOpen(false)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-alp-50 md:flex">
      <NavBar active={view} onNavigate={setView} />
      <div className="flex-1 pb-16 md:pb-0">
        <Header />
        {view === 'dashboard' && <Dashboard onOpenLesson={openLesson} onOpenCalendar={() => setView('calendar')} />}
        {view === 'lessons' && <LessonsMap onOpenLesson={openLesson} />}
        {view === 'calendar' && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <CantonalCalendar />
          </div>
        )}
        {view === 'culture' && <CultureModule />}
      </div>
      <CertificateModal
        open={certificateOpen}
        level={progress.level.split('.')[0]}
        onClose={() => setCertificateOpen(false)}
      />
    </div>
  )
}
