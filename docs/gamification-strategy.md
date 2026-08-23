# GrüeziGo — Gamification and Retention Strategy

> Goal: learning Schwiizerdütsch should feel like progressing in a game, except the "high score" is a real, integrated life in Switzerland. Every game mechanic is anchored to a concrete cultural outcome — never empty gamification.

## 1. The core loop

```
Open app → See streak + upcoming cantonal holiday → Complete 1 lesson (5-8 min)
   → Earn XP + possible badge → Share mini-achievement (optional) → Notification
     tomorrow reminding about the streak → repeat
```

Each element of the loop is designed to answer a different emotional question:
- **Streak** → "Am I going to break my streak?" (loss aversion)
- **XP/Level** → "How far am I from the next milestone?" (visible progress)
- **Cultural badge** → "What have I actually managed to understand about this country?" (identity/pride)
- **Shareable** → "Can I show this off?" (social validation)

## 2. Daily streak

- **Base rule**: completing at least 1 lesson or 1 review round per day keeps the streak alive (already implemented in `UserProgressContext.registerActivityToday`).
- **Streak Freeze** 🧊: the user earns 1 free "streak freeze" every 7 days of active streak. It can be used to forgive a missed day — reduces the "all or nothing" frustration that drives churn (the main cause of drop-off in language apps after day 3).
- **Streak Society**: from 30 days of streak onward, the user enters a distinct visual tier (gold frame on their avatar/profile) — reinforces identity, not just a number.
- **Smart reminder**: push notification between 6-8 PM local time, *only* if the user hasn't completed their daily activity yet (never notify if they already did — avoids notification fatigue).
- **Grace window**: a day counts as "active" until 3 AM the following day (users who study late at night shouldn't unfairly lose their streak).

## 3. XP and levels

- Every lesson: **20 XP** base + **15 XP** bonus for passing the module's final exam (≥60% correct) — rewards depth, not just completion.
- Language levels (A1.1 → C2) are the "serious" progression; in parallel there's a cosmetic **player level** (Bronze/Silver/Gold/Edelweiss) based on accumulated XP, to give a sense of advancement even within a single, long language level.
- **Weekly leagues** (phase 2): groups of ~30 users with similar weekly XP compete to climb leagues (Bronze League → Edelweiss League). No public losers: only the person in last place sees a demotion notice, never a humiliating negative ranking.

## 4. Cultural integration badges

Unlike a generic "10 lessons completed" badge, every GrüeziGo badge certifies a **real or near-real integration action**:

| Badge | How it unlocks | Why it matters |
|---|---|---|
| 🥐 **Grüezi Local** | Complete the Greetings lesson | First contact — immediate early reinforcement (day 1) |
| 🧀 **Order-Ready** | Complete Supermarket + Restaurant | Real daily survival |
| 🔥 **7-Day Streak** | 7 consecutive days of activity | Habit-formation milestone |
| 🏔️ **30-Day Streak** | 30 consecutive days | Serious-commitment milestone |
| 🎉 **Sechseläuten Ready** | Complete the Zürich culture module before the 3rd Monday of April | Ties learning to a real event happening that week |
| 🧅 **Zibelemärit Local** | Complete the Bern culture module in November | Same idea, Bern canton |
| 🎭 **Survived Fasnacht** | Complete carnival vocabulary before February/March | Real seasonal relevance |
| 🗣️ **First Spoken Sentence** | Pass the first speech-recognition exercise | Breaks through the fear of speaking |
| 📜 **A1 Certificate** | Pass the final exam of every A1 lesson | Level milestone — unlocks the exportable certificate |
| 🇨🇭 **Fully Integrated** | Complete C2 + every culture module | The "capstone" badge — rarest, most coveted |

**Design rule**: no badge is ever awarded just for "using the app for X days" without an associated learning or cultural action — this keeps badges a credible status signal, not noise.

## 5. Shareable mini-achievements

Every badge and every lesson completion generates a **shareable card** (1080×1080 image, generated via `<canvas>`, same mechanism as `CertificateModal`):

- Designed with the GrüeziGo palette (red/white/wood), the badge emoji large, the user's name, and one concrete fact ("Ricardo has been learning Züritüütsch for 30 days 🔥" / "Ricardo already knows how to order coffee in Swiss dialect ☕🇨🇭").
- "Share" button using the Web Share API (fallback: image download) — no social login required, no friction.
- Cards always include a discreet micro-CTA ("gruezigo.app") — every share is free organic marketing (the same year-in-review/achievement-card mechanism several popular apps use).
- **Controlled cadence**: at most 1 share prompt per session, always optional and never blocking — the app never forces a share to continue.

## 6. Notifications and reactivation

- **Day 1 without returning**: warm, non-guilt-tripping notification — "Your Böögg (the Sechseläuten snowman) is waiting for you 🔥 5 minutes today?"
- **Day 3-7 without returning**: reminder with seasonal cultural context (an upcoming cantonal holiday) instead of a generic one — connects to the real reason the app was installed.
- **Day 14+ without returning**: a "soft restart" offer — resume from the last lesson instead of feeling like starting from scratch (avoids the "I'd have to relearn everything, better not go back" effect).

## 7. Anti-manipulation principles (important for *healthy* retention)

- Never use fake urgency timers ("offer ends in 10 min!") in an educational product — breaks trust over the medium term.
- The streak freeze is free and earned, not only purchasable — avoids the streak feeling "pay to win".
- Notifications automatically stop if the user ignores them 3 times in a row (frequency reduces, tone never becomes aggressive).

## 8. Metrics to watch

- **D1/D7/D30 retention** by selected-canton cohort (hypothesis: users who see their cantonal holiday on the dashboard on day 1 retain better).
- **% of streaks saved with freeze** vs. **% of streaks lost** — indicates whether the freeze is well-calibrated (target: ~15-20% usage).
- **First-attempt exam pass rate** — if it's very high, the exam is too easy (doesn't validate real learning); if very low, it's frustrating and difficulty should be reviewed.
- **Shares per weekly active user** — proxy for organic growth (K-factor).
