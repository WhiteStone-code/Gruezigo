# GrüeziGo 🇨🇭

**Grüezi** is how you say "hello" in Zürich — and also the greeting this app starts with.

GrüeziGo exists to solve one very specific problem: if you move to German-speaking Switzerland, the German you studied (or the textbook "Hochdeutsch") isn't what's spoken on the street, at the supermarket, or at your local bar. People speak **Schwiizerdütsch**, the Swiss German dialect, and it even changes from one canton to the next. GrüeziGo teaches exactly that: the real language, adapted to where you actually live, so you stop feeling like a foreigner in your own daily life.

## What is it about?

It's not a traditional grammar course. It's an app built for short sessions (5-10 minutes) that you can put to use almost immediately:

- **Pick your canton** (19 in total, from Zürich to Appenzell) and the app adapts: vocabulary, holidays, and cultural events relevant to where you actually live.
- **Every lesson compares three things at once**: your language, textbook "Hochdeutsch", and real Swiss German — so you understand where the difference comes from, not just that it exists.
- **You practice in several ways within the same lesson**: an example dialogue, matching vocabulary, listening to audio, building sentences, and — the most important part — speaking out loud, with the app telling you whether you'd actually be understood in a real shop.
- **A complete A1 → C2 level map**, styled like a real language course, with available levels playable today and the rest showing upfront what you'll learn.
- **A Review section** to look up grammar, verbs, themed vocabulary (family, animals, school, professions...), and run free practice sessions whenever you want, plus your stats on what you're good at and what needs work.
- **You keep a daily streak**, like any habit app, and every now and then a friendly nudge reminds you to review your weakest spot.
- **A calendar for your canton** with holidays and traditional festivals (Sechseläuten, Fasnacht, Zibelemärit...) so you know what's being celebrated and how to talk about it.
- **A culture module** with basic history of the country, a winter special, and a survival guide covering things nobody explains when you arrive (how recycling works, quiet hours, town-hall paperwork...).
- **Finishing a level** (A1, A2... up to C2) generates a downloadable certificate, as a keepsake or for your résumé.
- **Settings tailored to you**: dark mode, text size, your age (to adapt the tone of reminders), and a test mode to unlock everything and explore it without waiting.

All your progress — streak, canton, completed lessons, level, settings — is saved in your own browser. No accounts, no servers: close the tab and everything is right where you left it when you come back.

## Try it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (Chrome or Edge recommended, since they have the best support for the speech recognition used in the speaking exercise).

## Current status

The full flow of a lesson already works end to end, along with the level map (A1.1 and A1.2 playable, A2.1 → C2 shown with their real topic list as "coming soon"), the 19-canton calendar, the culture module, Review, and the certificate. Still pending: real content for A2.1 onward, native Swiss German voices (currently using the best available de-DE/de-CH browser voice, never perfect with the ä/ö/ü umlauts — hence the pronunciation guide in Review), and turning it into an installable app (PWA).

---

*Built with React, Vite, and Tailwind — no backend, everything runs in your browser.*
