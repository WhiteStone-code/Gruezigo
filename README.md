# GrüeziGo 🇨🇭

**Grüezi** es como se dice "hola" en Zúrich — y también el saludo con el que arranca esta app.

GrüeziGo nace para resolver un problema muy concreto: si te mudas a la Suiza alemana, el alemán que estudiaste (o el "Hochdeutsch" de los libros) no es el que se habla en la calle, en el súper o en el bar de tu barrio. Ahí se habla **Schwiizerdütsch**, el dialecto suizo-alemán, y cambia incluso de un cantón a otro. GrüeziGo te enseña justo eso: el idioma real, adaptado a dónde vives, para que dejes de sentirte extranjero en tu día a día.

## ¿De qué va?

No es un curso de gramática tradicional. Es una app pensada para aprender en sesiones cortas (5-10 minutos) y aplicar lo aprendido casi de inmediato:

- **Eliges tu cantón** (19 en total, de Zúrich a Appenzell) y la app se adapta: vocabulario, festivos y eventos culturales relevantes para donde realmente vives.
- **Cada lección compara tres cosas a la vez**: tu idioma, el alemán "de libro" y el suizo-alemán real — así entiendes de dónde viene la diferencia, no solo que existe.
- **Practicas de varias formas dentro de la misma lección**: un diálogo de ejemplo, emparejar vocabulario, escuchar audio, construir frases y — la parte más importante — hablar en voz alta y que la app te diga si se te entendería en una tienda de verdad.
- **Un mapa completo de niveles A1 → C2** al estilo de un curso de idiomas real, con los niveles ya disponibles jugables y el resto mostrando de antemano qué se aprenderá.
- **Un apartado de Repaso** para consultar gramática, verbos, vocabulario por temas (familia, animales, colegio, oficios...) y hacer sesiones de práctica libre cuando quieras, más tus estadísticas de en qué vas mejor y qué conviene reforzar.
- **Mantienes una racha diaria**, como en cualquier app de hábitos, y de vez en cuando un aviso amistoso te recuerda repasar tu punto más flojo.
- **Ves un calendario de tu cantón** con festivos y fiestas tradicionales (Sechseläuten, Fasnacht, Zibelemärit...) para que sepas qué se celebra y cómo hablar de ello.
- **Hay un módulo de cultura** con historia básica del país, un especial de invierno y una guía de supervivencia con cosas que nadie te explica al llegar (cómo funciona el reciclaje, los horarios de silencio, el papeleo del ayuntamiento...).
- **Al completar un nivel** (A1, A2... hasta C2) generas un certificado descargable como recuerdo o para tu currículum.
- **Ajustes a tu gusto**: modo oscuro, tamaño de texto, tu edad (para adaptar el tono de los avisos) y un modo de prueba para desbloquear todo y explorarlo sin esperar.

Todo tu progreso —racha, cantón, lecciones hechas, nivel, ajustes— se guarda en tu propio navegador. No hay cuentas ni servidores: cierras la pestaña y al volver todo sigue donde lo dejaste.

## Cómo probarlo

```bash
npm install
npm run dev
```

Y abre la URL que te muestre la terminal en el navegador (Chrome o Edge recomendados, porque son los que mejor soportan el reconocimiento de voz del ejercicio de hablar).

## Estado actual

Ya funciona de punta a punta el flujo de una lección completa, el mapa de niveles (A1.1 y A1.2 jugables, A2.1 → C2 con su temario listado como "próximamente"), el calendario de 19 cantones, el módulo cultural, el Repaso y el certificado. Quedan pendientes: contenido real para A2.1 en adelante, voces nativas de suizo-alemán (hoy se usa la mejor voz de-DE/de-CH disponible en el navegador, nunca perfecta con las umlaut ä/ö/ü — por eso hay una guía de pronunciación en Repaso), y convertirla en una app instalable (PWA).

---

*Construida con React, Vite y Tailwind — sin backend, todo corre en tu navegador.*
