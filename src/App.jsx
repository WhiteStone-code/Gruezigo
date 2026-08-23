import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header.jsx'
import { NavBar } from './components/layout/NavBar.jsx'
import { Dashboard } from './components/dashboard/Dashboard.jsx'
import { MountainPathMap } from './components/dashboard/MountainPathMap.jsx'
import { CantonalCalendar } from './components/calendar/CantonalCalendar.jsx'
import { CultureModule } from './components/culture/CultureModule.jsx'
import { ReviewHub } from './components/review/ReviewHub.jsx'
import { SettingsScreen } from './components/settings/SettingsScreen.jsx'
import { LessonView } from './components/lesson/LessonView.jsx'
import { CertificateModal } from './components/certificate/CertificateModal.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { getLessonById } from './data/lessons/index.js'
import { useUserProgress } from './context/UserProgressContext.jsx'

export default function App() {
  const [view, setView] = useState('dashboard') // dashboard | lessons | review | calendar | culture | settings
  const [activeLessonId, setActiveLessonId] = useState(null)
  const [certificateOpen, setCertificateOpen] = useState(false)
  const { progress } = useUserProgress()

  // Sincroniza el tamaño de texto guardado (Ajustes) con el atributo que
  // usa el CSS global — hace falta también al cargar, no solo al cambiarlo.
  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', progress.settings.textSize)
  }, [progress.settings.textSize])

  const activeLesson = activeLessonId ? getLessonById(activeLessonId) : null

  function openLesson(id) {
    setActiveLessonId(id)
  }

  function closeLesson() {
    setActiveLessonId(null)
  }

  if (activeLesson) {
    return (
      <ErrorBoundary onReset={closeLesson}>
        <div className="min-h-screen bg-alp-50 dark:bg-alp-900 py-6">
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
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary onReset={() => setView('dashboard')}>
      <div className="min-h-screen bg-alp-50 dark:bg-alp-900 md:flex">
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
            <div className="max-w-xl mx-auto px-4 py-6 pb-24">
              <h2 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50 mb-1">Tu ruta A1 → C2</h2>
              <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">Toca un nodo del camino para ver sus lecciones o su temario.</p>
              <MountainPathMap onOpenLesson={openLesson} />
            </div>
          )}
          {view === 'review' && <ReviewHub onOpenLesson={openLesson} />}
          {view === 'calendar' && (
            <div className="max-w-xl mx-auto px-4 py-6 pb-24">
              <CantonalCalendar />
            </div>
          )}
          {view === 'culture' && <CultureModule />}
          {view === 'settings' && <SettingsScreen />}
        </div>
        <CertificateModal
          open={certificateOpen}
          level={progress.level.split('.')[0]}
          onClose={() => setCertificateOpen(false)}
        />
      </div>
    </ErrorBoundary>
  )
}
