# GrüeziGo — Estrategia de Gamificación y Retención

> Objetivo: que aprender Schwiizerdütsch se sienta como progresar en un juego, pero cuyo "high score" es una vida real e integrada en Suiza. Cada mecanismo de juego está anclado a un resultado cultural concreto — nunca es gamificación vacía.

## 1. El bucle central (core loop)

```
Abrir app → Ver racha + próximo festivo cantonal → Completar 1 lección (5-8 min)
   → Ganar XP + posible medalla → Compartir mini-logro (opcional) → Notificación
     mañana recordando la racha → repetir
```

Cada elemento del bucle está diseñado para responder a una pregunta emocional distinta:
- **Racha** → "¿voy a romper mi racha?" (pérdida aversión)
- **XP/Nivel** → "¿cuánto me falta para el siguiente hito?" (progreso visible)
- **Medalla cultural** → "¿qué he conseguido entender de este país?" (identidad/orgullo)
- **Compartible** → "¿puedo presumir de esto?" (validación social)

## 2. Racha diaria ("Streak")

- **Regla base**: completar al menos 1 lección o 1 ronda de repaso al día mantiene la racha (ya implementado en `UserProgressContext.registerActivityToday`).
- **Streak Freeze** 🧊: el usuario acumula 1 "congelador de racha" gratis cada 7 días de racha activa. Se puede usar para perdonar un día perdido — reduce la frustración del "todo o nada" que provoca abandono (principal causa de churn en apps de idiomas tras el día 3).
- **Streak Society**: a partir de 30 días de racha, el usuario entra en un segmento visual distinto (marco dorado en su avatar/perfil) — refuerzo de identidad, no solo número.
- **Recordatorio inteligente**: notificación push entre las 18:00–20:00 hora local *solo* si el usuario aún no ha completado su actividad diaria (nunca notificar si ya cumplió — evita fatiga de notificaciones).
- **Ventana de gracia**: el día se considera "activo" hasta las 03:00 del día siguiente (usuarios que estudian de madrugada no deberían perder la racha injustamente).

## 3. XP y niveles

- Cada lección: **20 XP** base + **15 XP** extra si se aprueba el examen final del módulo (≥60% aciertos) — recompensa la profundidad, no solo la finalización.
- Los niveles de idioma (A1.1 → C2) son la progresión "seria"; en paralelo existe un **nivel de jugador** cosmético (Bronce/Plata/Oro/Edelweiss) basado en XP acumulado, para dar sensación de avance incluso dentro de un mismo nivel de idioma largo.
- **Ligas semanales** (fase 2): grupos de ~30 usuarios con XP semanal similar compiten por ascender de liga (Liga Bronce → Liga Edelweiss). Sin perdedores públicos: solo se muestra el descenso a quien está en el último puesto, nunca ranking negativo humillante.

## 4. Medallas de integración cultural

A diferencia de una medalla genérica de "10 lecciones completadas", cada medalla de GrüeziGo certifica una **acción de integración real o casi-real**:

| Medalla | Cómo se desbloquea | Por qué importa |
|---|---|---|
| 🥐 **Grüezi Local** | Completar la lección de Saludos | Primer contacto — refuerzo inmediato temprano (día 1) |
| 🧀 **Sabe Pedir** | Completar Supermercado + Restaurante | Supervivencia diaria real |
| 🔥 **Racha de 7** | 7 días seguidos de actividad | Hito de formación de hábito |
| 🏔️ **Racha de 30** | 30 días seguidos | Hito de compromiso serio |
| 🎉 **Sechseläuten Ready** | Completar el módulo cultural de Zúrich antes del 3er lunes de abril | Vincula aprendizaje a un evento real que puede vivir esa semana |
| 🧅 **Zibelemärit Local** | Completar el módulo cultural de Berna en noviembre | Igual, pero cantón Berna |
| 🎭 **Sobrevivió la Fasnacht** | Completar vocabulario de carnaval antes de febrero/marzo | Relevancia estacional real |
| 🗣️ **Primera Frase Hablada** | Aprobar el primer ejercicio de reconocimiento de voz | Supera la barrera del miedo a hablar |
| 📜 **Certificado A1** | Aprobar el examen final de todas las lecciones A1 | Hito de nivel — desbloquea el certificado exportable |
| 🇨🇭 **Integrado/a** | Completar C2 + todos los módulos culturales | Medalla "capstone" — la más rara, la más deseada |

**Regla de diseño**: ninguna medalla se otorga solo por "usar la app X días" sin una acción de aprendizaje o cultural asociada — así las medallas siguen siendo señal de estatus creíble, no ruido.

## 5. Mini-logros compartibles en redes

Cada medalla y cada final de lección genera una **tarjeta compartible** (imagen 1080×1080, generada en `<canvas>`, mismo mecanismo que `CertificateModal`):

- Diseño con la paleta GrüeziGo (rojo/blanco/madera), el emoji de la medalla en grande, el nombre del usuario y un dato concreto ("Ricardo lleva 30 días aprendiendo Züritüütsch 🔥" / "Ricardo ya sabe pedir café en dialecto suizo ☕🇨🇭").
- Botón "Compartir" con Web Share API (fallback: descarga de imagen) — sin login social requerido, sin fricción.
- Las tarjetas incluyen siempre un micro-CTA discreto ("gruezigo.app") — cada compartir es marketing orgánico gratuito (mecanismo tipo otra app de idiomas/Wrapped de Spotify).
- **Cadencia controlada**: máximo 1 sugerencia de compartir por sesión, siempre opcional y nunca bloqueante — la app nunca obliga a compartir para continuar.

## 6. Notificaciones y reactivación

- **Día 1 sin volver**: notificación cálida, no culpabilizadora — "Tu Böögg (muñeco del Sechseläuten) te espera 🔥 ¿5 minutos hoy?"
- **Día 3-7 sin volver**: recordatorio con contexto cultural de temporada (festivo cantonal próximo) en vez de genérico — conecta con el motivo real por el que se instaló la app.
- **Día 14+ sin volver**: oferta de "reinicio suave" — reanudar desde la última lección en vez de sentir que hay que empezar de cero (evita el efecto "tengo que reaprender todo, mejor no vuelvo").

## 7. Principios anti-manipulación (importante para retención *sana*)

- Nunca usar temporizadores de urgencia falsos ("¡oferta termina en 10 min!") en un producto educativo — rompe confianza a medio plazo.
- El streak freeze es gratuito y ganado, no solo comprable — evita que la racha se sienta "pay to win".
- Las notificaciones se detienen automáticamente si el usuario las ignora 3 veces seguidas (se reducen en frecuencia, nunca en tono agresivo).

## 8. Métricas a vigilar

- **D1/D7/D30 retention** por cohorte de cantón seleccionado (hipótesis: usuarios que ven su festivo cantonal en el dashboard el día 1 retienen mejor).
- **% de rachas salvadas con freeze** vs. **% de rachas perdidas** — indica si el freeze está bien calibrado (objetivo: ~15-20% de uso).
- **Tasa de examen aprobado al primer intento** — si es muy alta, el examen es demasiado fácil (no valida aprendizaje real); si es muy baja, frustra y hay que revisar dificultad.
- **Compartidos por usuario activo semanal** — proxy de crecimiento orgánico (K-factor).
