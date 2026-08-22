import { useState } from 'react'
import { Header } from './components/layout/Header.jsx'
import { NavBar } from './components/layout/NavBar.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { LevelMap } from './components/dashboard/LevelMap.jsx'
import { CantonalCalendar } from './components/calendar/CantonalCalendar.jsx'
import { CultureModule } from './components/culture/CultureModule.jsx'
import { LessonView } from './components/lesson/LessonView.jsx'
import { CertificateModal } from './components/certificate/CertificateModal.jsx'
import { getLessonById } from './data/lessons/index.js'
import { useUserProgress } from './context/UserProgressContext.jsx'

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
        {view === 'dashboard' && (
          <Dashboard
            onOpenLesson={openLesson}
            onOpenCalendar={() => setView('calendar')}
            onOpenRoadmap={() => setView('lessons')}
          />
        )}
        {view === 'lessons' && (
          <div className="max-w-xl mx-auto px-4 py-6">
            <h2 className="font-display font-bold text-2xl text-alp-900 mb-1">Tu ruta A1 → C2</h2>
            <p className="text-sm text-alp-500 mb-4">Toca un nivel para ver sus lecciones o su temario.</p>
            <LevelMap onOpenLesson={openLesson} />
          </div>
        )}
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
