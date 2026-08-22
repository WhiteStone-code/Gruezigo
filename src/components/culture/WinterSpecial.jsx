import { motion } from 'framer-motion'
import { Snowflake } from 'lucide-react'
import { Card } from '../ui/Card.jsx'

const WINTER_PHRASES = [
  { schwiizerduetsch: "Es schneit!", hochdeutsch: 'Es schneit!', es: '¡Está nevando!' },
  { schwiizerduetsch: "Isch chalt hüt", hochdeutsch: 'Es ist kalt heute', es: 'Hace frío hoy' },
  { schwiizerduetsch: "Gömmer Schlitteln?", hochdeutsch: 'Gehen wir schlitteln?', es: '¿Vamos a hacer trineo?' },
  { schwiizerduetsch: "En Glühwein, bitte", hochdeutsch: 'Einen Glühwein, bitte', es: 'Un vino caliente, por favor' },
]

/**
 * Módulo cultural "Especial de invierno": vocabulario y contexto asociado a
 * Navidad, mercadillos ("Wiehnachtsmärt") y deportes de nieve.
 */
export function WinterSpecial() {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-alp-700 to-alp-900 text-white p-5">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-3 right-3 opacity-30"
        >
          <Snowflake size={64} />
        </motion.div>
        <h3 className="font-display font-bold text-xl mb-1">Especial de invierno ❄️</h3>
        <p className="text-sm opacity-90">
          De los "Wiehnachtsmärt" (mercadillos navideños) al esquí de fin de semana: el vocabulario que necesitas
          para sobrevivir — y disfrutar — el invierno suizo.
        </p>
      </div>

      <Card className="card-accent-sky">
        <h4 className="font-semibold text-alp-800 dark:text-alp-100 mb-3">Frases de temporada</h4>
        <div className="space-y-2">
          {WINTER_PHRASES.map((p) => (
            <div key={p.schwiizerduetsch} className="flex items-center justify-between text-sm border-b border-alp-100 dark:border-alp-700 last:border-0 pb-2 last:pb-0">
              <div>
                <p className="font-semibold text-swiss-red">{p.schwiizerduetsch}</p>
                <p className="text-alp-400 text-xs">{p.hochdeutsch}</p>
              </div>
              <p className="text-alp-600 dark:text-alp-300">{p.es}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
