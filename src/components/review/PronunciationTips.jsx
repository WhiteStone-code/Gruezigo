import { useState } from 'react'
import { ChevronDown, Volume2 } from 'lucide-react'
import { useSpeech } from '../../hooks/useSpeech.js'
import { Card } from '../ui/Card.jsx'

const TIPS = [
  { letter: 'ä', sound: 'como la "e" abierta de "perro"', example: 'Zäme (juntos)' },
  { letter: 'ö', sound: 'como la "eu" francesa de "peur" — redondea los labios diciendo "e"', example: 'Chrömli (chuchería)' },
  { letter: 'ü', sound: 'como la "u" francesa de "tu" — labios en forma de "u" pero diciendo "i"', example: 'Grüezi (hola)' },
  { letter: 'ch', sound: 'sonido gutural desde la garganta, como en "loch" escocés o la jota suave', example: 'Chuchi (cocina)' },
]

/**
 * Guía rápida de pronunciación: las voces de síntesis disponibles en el
 * navegador (de-DE) no siempre marcan bien las umlaut suizas — esta chuleta
 * ayuda a que el usuario sepa cómo deberían sonar de verdad.
 */
export function PronunciationTips() {
  const [open, setOpen] = useState(false)
  const { speak, supportsSynthesis } = useSpeech()

  return (
    <Card className="card-accent-cheese !p-0 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="nav-item w-full flex items-center justify-between p-4 text-left">
        <div>
          <p className="font-display font-bold text-alp-900 dark:text-alp-50">🗣️ Consejos de pronunciación</p>
          <p className="text-xs text-alp-500 dark:text-alp-300">Las umlaut (ä/ö/ü) — la voz del navegador no siempre las clava</p>
        </div>
        <ChevronDown size={18} className={`text-alp-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          <p className="text-sm text-alp-600 dark:text-alp-300 mb-2">
            La voz sintética que usa la app (alemán estándar de-DE, la mejor disponible en los navegadores) no siempre
            distingue bien estos sonidos propios del suizo-alemán. Practícalos tú mismo/a con esta guía:
          </p>
          {TIPS.map((tip) => (
            <div key={tip.letter} className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-alp-50 dark:bg-alp-900">
              <div>
                <span className="font-display font-bold text-swiss-red text-lg">{tip.letter}</span>
                <p className="text-xs text-alp-600 dark:text-alp-300">{tip.sound}</p>
                <p className="text-xs text-alp-400 italic">{tip.example}</p>
              </div>
              {supportsSynthesis && (
                <button
                  onClick={() => speak(tip.example.split(' ')[0], { lang: 'de-DE', rate: 0.75 })}
                  className="nav-item text-alp-400 hover:text-swiss-red shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Escuchar ejemplo"
                >
                  <Volume2 size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
