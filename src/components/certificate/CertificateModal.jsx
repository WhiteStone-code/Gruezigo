import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import { X, Download, FileText, Award } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { useUserProgress } from '../../context/UserProgressContext.jsx'
import { CANTONS } from '../../data/cantons/holidays.js'
import { Button } from '../ui/Button.jsx'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

/**
 * Modal "Generador de Certificados": se muestra al completar un nivel
 * (A1-C2). Renderiza el diploma en un <canvas> y permite exportarlo como
 * imagen PNG para compartir en redes o guardar como recuerdo/CV.
 */
export function CertificateModal({ open, level = 'A1', userName = 'GrüeziGo Learner', onClose }) {
  const { interfaceLang } = useLanguage()
  const { progress } = useUserProgress()
  const canvasRef = useRef(null)
  const canton = CANTONS.find((c) => c.id === progress.canton)

  function drawCertificate() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    // Fondo
    ctx.fillStyle = '#fbf6ee'
    ctx.fillRect(0, 0, width, height)

    // Borde estilo "cruz suiza"
    ctx.strokeStyle = '#D52B1E'
    ctx.lineWidth = 14
    ctx.strokeRect(20, 20, width - 40, height - 40)
    ctx.strokeStyle = '#f9a109'
    ctx.lineWidth = 4
    ctx.strokeRect(40, 40, width - 80, height - 80)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#1e364a'
    ctx.font = 'bold 28px "Poppins", sans-serif'
    ctx.fillText('GRÜEZIGO', width / 2, 110)

    ctx.font = '18px "Inter", sans-serif'
    ctx.fillStyle = '#3a789e'
    ctx.fillText('Certificado de logro lingüístico', width / 2, 145)

    ctx.font = 'bold 42px "Poppins", sans-serif'
    ctx.fillStyle = '#D52B1E'
    ctx.fillText(`Nivel ${level}`, width / 2, 230)

    ctx.font = '20px "Inter", sans-serif'
    ctx.fillStyle = '#1e364a'
    ctx.fillText('Se certifica que', width / 2, 290)

    ctx.font = 'bold 30px "Poppins", sans-serif'
    ctx.fillText(userName, width / 2, 330)

    ctx.font = '18px "Inter", sans-serif'
    ctx.fillStyle = '#654129'
    ctx.fillText(
      `ha completado con éxito el nivel ${level} de Schwiizerdütsch`,
      width / 2,
      370
    )
    ctx.fillText(`con enfoque en el cantón de ${canton?.name ?? 'Zürich'}`, width / 2, 398)

    ctx.font = '14px "Inter", sans-serif'
    ctx.fillStyle = '#93bcd4'
    ctx.fillText(new Date().toLocaleDateString('es-CH', { year: 'numeric', month: 'long', day: 'numeric' }), width / 2, 450)

    ctx.font = '48px sans-serif'
    ctx.fillText('🇨🇭', width / 2, height - 70)
  }

  function handleDownloadImage() {
    drawCertificate()
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `gruezigo-certificado-${level}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // El diploma "de verdad" — mismo dibujo, pero embebido en un PDF a tamaño
  // de página exacto para imprimir o adjuntar a un CV, no solo compartir
  // como imagen.
  function handleDownloadPdf() {
    drawCertificate()
    const canvas = canvasRef.current
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [canvas.width, canvas.height] })
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`gruezigo-certificado-${level}.pdf`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-alp-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onAnimationStart={drawCertificate}
            className="bg-white dark:bg-alp-800 rounded-xl2 shadow-card p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-xl text-alp-900 dark:text-alp-50 flex items-center gap-2">
                <Award className="text-cheese-500" /> Tu certificado
              </h3>
              <button onClick={onClose} className="nav-item text-alp-400 hover:text-alp-700 dark:hover:text-alp-200 min-h-[44px] min-w-[44px]">
                <X size={22} />
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={560}
              height={500}
              className="w-full h-auto rounded-lg border border-alp-100"
            />

            <div className="flex gap-2 mt-4">
              <div className="grid grid-cols-6 gap-1 flex-1">
                {LEVELS.map((lvl) => (
                  <span
                    key={lvl}
                    className={`text-xs text-center py-1 rounded ${
                      lvl === level ? 'bg-swiss-red text-white font-bold' : 'bg-alp-100 dark:bg-alp-700 text-alp-400'
                    }`}
                  >
                    {lvl}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button onClick={handleDownloadPdf} className="flex-1 flex items-center justify-center gap-2">
                <FileText size={18} /> Descargar PDF
              </Button>
              <Button variant="secondary" onClick={handleDownloadImage} className="flex-1 flex items-center justify-center gap-2">
                <Download size={18} /> Imagen
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
