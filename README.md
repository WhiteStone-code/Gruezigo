# GrüeziGo 🇨🇭

**Grüezi** es como se dice "hola" en Zúrich — y también el saludo con el que arranca esta app.

GrüeziGo nace para resolver un problema muy concreto: si te mudas a la Suiza alemana, el alemán que estudiaste (o el "Hochdeutsch" de los libros) no es el que se habla en la calle, en el súper o en el bar de tu barrio. Ahí se habla **Schwiizerdütsch**, el dialecto suizo-alemán, y cambia incluso de un cantón a otro. GrüeziGo te enseña justo eso: el idioma real, adaptado a dónde vives, para que dejes de sentirte extranjero en tu día a día.

## ¿De qué va?

No es un curso de gramática tradicional. Es una app pensada para aprender en sesiones cortas (5-10 minutos) y aplicar lo aprendido casi de inmediato:

- **Eliges tu cantón** (Zúrich, Berna, Lucerna, Basilea o San Galo) y la app se adapta: vocabulario, festivos y eventos culturales relevantes para donde realmente vives.
- **Cada lección compara tres cosas a la vez**: tu idioma, el alemán "de libro" y el suizo-alemán real — así entiendes de dónde viene la diferencia, no solo que existe.
- **Practicas de varias formas dentro de la misma lección**: emparejar vocabulario, escuchar audio, construir frases y — la parte más importante — hablar en voz alta y que la app te diga si se te entendería en una tienda de verdad.
- **Mantienes una racha diaria**, como en cualquier app de hábitos, para que practicar 5 minutos se vuelva costumbre.
- **Ves un calendario de tu cantón** con festivos y fiestas tradicionales (Sechseläuten, Fasnacht, Zibelemärit...) para que sepas qué se celebra y cómo hablar de ello.
- **Hay un módulo de cultura** con historia básica del país, un especial de invierno y una guía de supervivencia con cosas que nadie te explica al llegar (cómo funciona el reciclaje, los horarios de silencio, el papeleo del ayuntamiento...).
- **Al completar un nivel** (A1, A2... hasta C2) generas un certificado descargable como recuerdo o para tu currículum.

Todo tu progreso —racha, cantón, lecciones hechas, nivel— se guarda en tu propio navegador. No hay cuentas ni servidores: cierras la pestaña y al volver todo sigue donde lo dejaste.

## Cómo probarlo

```bash
npm install
npm run dev
```

Y abre la URL que te muestre la terminal en el navegador (Chrome o Edge recomendados, porque son los que mejor soportan el reconocimiento de voz del ejercicio de hablar).

## Estado actual

Ya funciona de punta a punta el flujo de una lección completa (A1.1: Saludos, Supermercado y Restaurante), el calendario cantonal, el módulo cultural y el certificado. Quedan pendientes más niveles, voces nativas de suizo-alemán (hoy usa alemán estándar como aproximación) y convertirla en una app instalable (PWA).

---

*Construida con React, Vite y Tailwind — sin backend, todo corre en tu navegador.*
