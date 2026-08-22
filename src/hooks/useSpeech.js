import { useCallback, useMemo, useRef, useState } from 'react'

/**
 * Envuelve Web Speech API (SpeechSynthesis + SpeechRecognition) para los
 * ejercicios de escucha y pronunciación. El suizo-alemán no tiene voz TTS
 * nativa fiable en la mayoría de navegadores, así que usamos de-DE como el
 * mejor sustituto disponible y confiamos en la comparación de texto para el
 * reconocimiento de voz (tolerante, no exacto).
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

  const speak = useCallback(
    (text, { lang = 'de-DE', rate = 0.9 } = {}) => {
      if (!supportsSynthesis) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = rate
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    },
    [supportsSynthesis]
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
