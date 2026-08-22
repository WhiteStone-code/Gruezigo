import { Recycle, Train, Phone, Home } from 'lucide-react'
import { Card } from '../ui/Card.jsx'

const TOPICS = [
  {
    icon: Recycle,
    accent: 'meadow',
    title: 'Reciclaje ("Kehricht")',
    body: 'Solo se puede tirar basura general en bolsas oficiales tasadas ("Gebührensack/Zischtigssack") — de lo contrario, la multa puede ser considerable. Vidrio, PET, papel y aluminio se separan en contenedores del barrio ("Sammelstelle").',
  },
  {
    icon: Train,
    accent: 'sky',
    title: 'Transporte público',
    body: 'Compra el billete ANTES de subir (SBB app o máquina) — los controles son frecuentes y sin billete válido hay multa inmediata, sin excusas de "no encontré la máquina".',
  },
  {
    icon: Phone,
    accent: 'wood',
    title: 'Silencio y horarios ("Ruhezeiten")',
    body: 'Domingos y entre 22:00–7:00, evita ruido (nada de lavadoras, taladros o música alta) — es una norma social tomada muy en serio, incluso en pisos de alquiler.',
  },
  {
    icon: Home,
    accent: 'cheese',
    title: 'Anunciarte ("Anmeldung")',
    body: 'Al mudarte, tienes ~14 días para registrarte en el "Einwohneramt" de tu municipio. Es el trámite base para todo lo demás: seguro médico, banco, contrato de móvil.',
  },
]

export function SurvivalGuide() {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-lg text-alp-900 dark:text-alp-50">Guía de supervivencia diaria</h3>
      {TOPICS.map(({ icon: Icon, title, body, accent }) => (
        <Card key={title} className={`card-accent-${accent} flex gap-3`}>
          <div className="w-10 h-10 rounded-full bg-alp-100 dark:bg-alp-700 flex items-center justify-center shrink-0">
            <Icon size={20} className="text-alp-600 dark:text-alp-200" />
          </div>
          <div>
            <p className="font-semibold text-alp-800 dark:text-alp-100">{title}</p>
            <p className="text-sm text-alp-600 dark:text-alp-300 leading-relaxed">{body}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
