import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Compass, Users, Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { GrueziGoLogo } from '../brand/GrueziGoLogo.jsx'
import { CantonSelector } from '../calendar/CantonSelector.jsx'
import { Button } from '../ui/Button.jsx'

const AGE_GROUPS = [
  { id: 'teen', labelKey: 'ageTeen' },
  { id: 'young-adult', labelKey: 'ageYoungAdult' },
  { id: 'adult', labelKey: 'ageAdult' },
  { id: 'senior', labelKey: 'ageSenior' },
]

const STEP_COUNT = 3

/**
 * Bienvenida de primer uso: se muestra una única vez (hasta que se reinicia
 * el progreso), antes que cualquier otra pantalla. No bloquea con datos
 * obligatorios — el cantón ya viene con un valor por defecto y la franja de
 * edad se puede saltar — solo orienta y dejar elegir cuando aporta valor.
 */
export function Onboarding() {
  const { t } = useLanguage()
  const { progress, completeOnboarding } = useUserProgress()
  const [step, setStep] = useState(0)
  const [canton, setCanton] = useState(progress.canton)
  const [ageGroup, setAgeGroup] = useState(progress.settings.ageGroup)

  function finish() {
    completeOnboarding({ canton, ageGroup })
  }

  return (
    <div className="min-h-screen bg-alp-50 dark:bg-alp-900 bg-topo flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-swiss-red' : i < step ? 'w-4 bg-swiss-red/50' : 'w-4 bg-alp-200 dark:bg-alp-700'
              }`}
            />
          ))}
        </div>

        <div className="card-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-swiss-red via-cheese-400 to-meadow-400" />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="text-center pt-2"
              >
                <motion.div
                  initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                  className="mx-auto mb-5 w-20 h-20"
                >
                  <GrueziGoLogo size={80} />
                </motion.div>
                <h1 className="font-display font-bold text-2xl text-alp-900 dark:text-alp-50 mb-3">
                  {t('onboardingWelcomeTitle')}
                </h1>
                <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed mb-6">
                  {t('onboardingWelcomeBody')}
                </p>
                <Button onClick={() => setStep(1)} className="w-full">
                  {t('onboardingStart')}
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="canton"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-11 h-11 rounded-full bg-wood-100 dark:bg-wood-900/40 flex items-center justify-center mb-4">
                  <Compass size={22} className="text-wood-600 dark:text-wood-300" />
                </div>
                <h2 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-1">
                  {t('onboardingCantonTitle')}
                </h2>
                <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">{t('onboardingCantonBody')}</p>
                <CantonSelector value={canton} onChange={setCanton} />
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => setStep(0)}
                    className="nav-item px-4 py-3 rounded-xl2 text-alp-500 dark:text-alp-300 hover:bg-alp-50 dark:hover:bg-alp-700 flex items-center gap-1 min-h-[44px]"
                  >
                    <ChevronLeft size={18} /> {t('onboardingBack')}
                  </button>
                  <Button onClick={() => setStep(2)} className="flex-1">
                    {t('continue')}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="age"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-11 h-11 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-4">
                  <Users size={22} className="text-sky-600 dark:text-sky-300" />
                </div>
                <h2 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 mb-1">
                  {t('onboardingAgeTitle')}
                </h2>
                <p className="text-sm text-alp-500 dark:text-alp-300 mb-4">{t('onboardingAgeBody')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {AGE_GROUPS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setAgeGroup(opt.id)}
                      className={`nav-item px-3 py-3 rounded-xl2 text-sm font-semibold border transition-colors min-h-[44px]
                        ${ageGroup === opt.id
                          ? 'bg-swiss-red text-white border-swiss-red'
                          : 'bg-white dark:bg-alp-900 text-alp-700 dark:text-alp-200 border-alp-300 dark:border-alp-600 hover:border-swiss-red/50'}`}
                    >
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <div className="rounded-xl2 bg-gradient-to-br from-meadow-50 to-cheese-50 dark:from-alp-900 dark:to-alp-900 border border-meadow-200/60 dark:border-alp-700 p-4 flex items-start gap-2.5">
                    <Sparkles size={16} className="text-meadow-600 dark:text-meadow-300 shrink-0 mt-0.5" />
                    <p className="text-sm text-alp-700 dark:text-alp-200">{t('onboardingReadyBody')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="nav-item px-4 py-3 rounded-xl2 text-alp-500 dark:text-alp-300 hover:bg-alp-50 dark:hover:bg-alp-700 flex items-center gap-1 min-h-[44px]"
                    >
                      <ChevronLeft size={18} /> {t('onboardingBack')}
                    </button>
                    <Button onClick={finish} className="flex-1">
                      {t('onboardingBegin')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
