# Copy para recordatorios de repaso

Mensajes para el banner del dashboard que sugiere repasar un tema en el que
el usuario anda flojo. El objetivo es animar, no regañar: el tono siempre
debe sonar a un compañero de estudio, nunca a una alarma o una nota de
profesor decepcionado.

## Mensajes de recordatorio de repaso

Usa siempre los placeholders `{topic}` (nombre del tema, ej. "Números") y
`{percent}` (porcentaje de aciertos, ej. "62"). Rota entre las 5 variantes
para que el mensaje no se sienta repetitivo.

1. 💡 Oye, hace tiempo que no repasas **{topic}** — ahí llevas un {percent}% de aciertos. ¿5 minutos para reforzarlo?

2. 👀 Vimos que **{topic}** anda un poco flojo ({percent}% de aciertos). Un repasito rápido y lo dominas del todo.

3. Llevas un {percent}% en **{topic}**. No es grave, pero un empujoncito ahora te ahorra dudas más adelante. ¿Le echamos un vistazo?

4. Recordatorio: tu progreso en **{topic}** está en {percent}%. Cuando tengas un ratito libre, dale un repaso — sin prisa.

5. 🌱 Todavía estás construyendo **{topic}** ({percent}% de aciertos) — así se aprende, poco a poco. ¿Seguimos practicando un poco hoy?

## Tono adaptado por edad

El mecanismo del recordatorio (aparece cuando un tema baja de cierto umbral
de aciertos) es el mismo para todas las edades, pero la copy debe adaptarse
a quién la lee. Para un público más joven (por ejemplo adolescentes o
adultos jóvenes), el texto puede ser más juguetón y directo: usar 1-2 emojis
por mensaje, frases cortas tipo "¡venga, dale caña!", signos de exclamación,
y un tono de reto amistoso ("¿te atreves con 5 minutos de {topic}?"); aquí
el humor y la sensación de logro inmediato funcionan bien, así que frases
como "¡está a un empujón de subir de nivel!" son apropiadas. Para un
público adulto mayor, la copy debe ser más calmada y respetuosa: eliminar
los emojis casi por completo (como mucho uno discreto, nunca varios
seguidos), evitar jerga de videojuegos o expresiones como "dale caña",
"sube de nivel" o "racha", y preferir un registro más formal y directo del
tipo "Cuando le venga bien, sería buen momento para repasar {topic} (ahora
mismo lleva un {percent}% de aciertos)." — frases completas, sin abreviar,
que transmitan que el repaso es una sugerencia útil y no una exigencia. En
la práctica esto se traduce en que el desarrollador debería mantener dos
variantes de cada mensaje: una versión "casual" (con emoji y tono de reto)
para el perfil joven, y una versión "formal" (sin emoji o con uno solo, sin
jerga, frases completas) para el perfil adulto mayor, seleccionadas según
la edad o preferencia declarada del usuario.
