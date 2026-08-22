import { useCallback, useMemo, useRef, useState } from 'react'

/**
 * Envuelve Web Speech API (SpeechSynthesis + SpeechRecognition) para los
 * ejercicios de escucha y pronunciación. El suizo-alemán no tiene voz TTS
 * nativa fiable en la mayoría de navegadores. Cuando el sistema operativo sí
 * trae una voz "de-CH" (algunos Windows/macOS con paquetes de voz suizos
 * instalados la tienen), la preferimos automáticamente; si no, caemos a la
 * mejor voz de-DE disponible. El reconocimiento de voz sigue comparando de
 * forma tolerante (ver matchesExpected), nunca exacta letra por letra —
 * ninguna de las dos direcciones (hablar/escuchar) pretende ser perfecta,
 * solo la mejor aproximación real que permite el navegador hoy.
 */
export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)

  const supportsSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window
  const SpeechRecognitionImpl =
    typeof window !== 'undefined' ? window.SpeechRecognition || window.webkitSpeechRecognition : null
  const supportsRecognition = Boolean(SpeechRecognitionImpl)

  // Busca, entre las voces instaladas en el navegador/SO, la mejor opción
  // para `lang` (p. ej. "de-DE"): exacta > mismo idioma con región suiza
  // ("de-CH") > cualquier variante del mismo idioma base.
  const pickBestVoice = useCallback((lang) => {
    if (!supportsSynthesis) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices.length) return null
    const base = lang.split('-')[0]
    return (
      voices.find((v) => v.lang === lang) ??
      voices.find((v) => v.lang?.toLowerCase() === `${base}-ch`) ??
      voices.find((v) => v.lang?.startsWith(base)) ??
      null
    )
  }, [supportsSynthesis])

  const speak = useCallback(
    (text, { lang = 'de-DE', rate = 0.85 } = {}) => {
      if (!supportsSynthesis) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = rate
      const voice = pickBestVoice(lang)
      if (voice) utterance.voice = voice
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    },
    [supportsSynthesis, pickBestVoice]
  )

  const startListening = useCallback(
    ({ lang = 'de-DE', onResult } = {}) => {
      if (!supportsRecognition) return
      const recognition = new SpeechRecognitionImpl()
      recognition.lang = lang
      recognition.interimResults = false
      recognition.maxAlternatives = 3
      recognition.onstart = () => {
        setIsListening(true)
        setTranscript('')
      }
      recognition.onresult = (event) => {
        const heard = event.results[0][0].transcript
        setTranscript(heard)
        onResult?.(heard)
      }
      recognition.onend = () => setIsListening(false)
      recognition.onerror = () => setIsListening(false)
      recognitionRef.current = recognition
      recognition.start()
    },
    [SpeechRecognitionImpl, supportsRecognition]
  )

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  // Comparación tolerante: ignora mayúsculas, acentos, signos de puntuación.
  const matchesExpected = useCallback((heard, expected) => {
    const normalize = (s) =>
      s
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^\w\s]/g, '')
        .trim()
    return normalize(heard) === normalize(expected)
  }, [])

  return useMemo(
    () => ({
      speak,
      startListening,
      stopListening,
      matchesExpected,
      isSpeaking,
      isListening,
      transcript,
      supportsSynthesis,
      supportsRecognition,
    }),
    [speak, startListening, stopListening, matchesExpected, isSpeaking, isListening, transcript, supportsSynthesis, supportsRecognition]
  )
}
