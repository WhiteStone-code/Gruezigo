# Dark Mode Token Map — GrüeziGo

Prereq: set `darkMode: 'class'` in `tailwind.config.js` and toggle a `dark` class on `<html>` (persist choice in localStorage). Principle: dark mode is **alp-900/alp-800 as the "night alpine slate" base**, not neutral gray — `swiss-red`, `wood`, `cheese` stay saturated and pop against it rather than being dimmed.

| Region | Light classes | Dark classes | Notes |
|---|---|---|---|
| Page background (`body`, `App.jsx` root divs) | `bg-alp-50` | `dark:bg-alp-900` | Root wrapper in `App.jsx` (`min-h-screen bg-alp-50 md:flex` and the other `min-h-screen bg-alp-50 py-6`) needs `dark:bg-alp-900` added in both places. |
| Card background (`.card` in `index.css`) | `bg-white` | `dark:bg-alp-800` | Add `dark:border dark:border-alp-700/60` too — on a dark base, `shadow-card` alone won't separate the card from the page; a hairline border restores the edge. |
| Primary heading text | `text-alp-900` | `dark:text-alp-50` | e.g. `Dashboard.jsx`/`App.jsx` `text-2xl text-alp-900` headings → append `dark:text-alp-50`. |
| Secondary/muted text | `text-alp-600` / `text-alp-500` | `dark:text-alp-300` | See contrast pitfall below — do **not** use `dark:text-alp-400`. |
| Borders / dividers | `border-alp-100` / `border-alp-200` | `dark:border-alp-700` | `alp-100` is nearly invisible on `alp-900`; jump to `alp-700` for a visible-but-subtle line. |
| Sidebar nav (desktop) background | `bg-white border-r border-alp-100` (`NavBar.jsx` line 21) | `dark:bg-alp-800 dark:border-alp-700` | Keep it one step lighter than page bg so it still reads as a distinct panel. |
| Sidebar nav — active item | `bg-swiss-red/10 text-swiss-red` (`NavBar.jsx` line 28) | `dark:bg-swiss-red/20 dark:text-white` | Raw `swiss-red` text at 10-15% opacity bg is fine, but bumping the fill to `/20` and switching text to white keeps the active pill legible and vivid rather than washed-out red-on-dark-red. |
| Sidebar nav — inactive item | `text-alp-600 hover:bg-alp-50` | `dark:text-alp-300 dark:hover:bg-alp-700` | |
| Bottom nav (mobile) background | `bg-white border-t border-alp-100` (`NavBar.jsx` line 37) | `dark:bg-alp-800 dark:border-alp-700` | Same treatment as desktop sidebar. |
| Bottom nav — active item | same `bg-swiss-red/10 text-swiss-red` pattern | `dark:bg-swiss-red/20 dark:text-white` | Match desktop. |
| `.btn-secondary` (`index.css`) | `bg-white hover:bg-alp-50 text-alp-800 border-alp-200` | `dark:bg-alp-800 dark:hover:bg-alp-700 dark:text-alp-50 dark:border-alp-600` | Border needs to lighten one notch further than generic dividers (`alp-600` not `alp-700`) since this element is interactive and needs a visible outline against the card/page bg. |
| `.btn-primary` (`index.css`) | `bg-swiss-red hover:bg-swiss-red-dark text-white` | *(unchanged — no dark: needed)* | Swiss red already has enough contrast against alp-900; keep it identical in both themes as the one constant brand anchor. |
| Input / select fields | (currently likely `bg-white border-alp-200 text-alp-900`, add if missing) | `dark:bg-alp-800 dark:border-alp-600 dark:text-alp-50 dark:placeholder:text-alp-400` | Also add `dark:focus:border-swiss-red dark:focus:ring-swiss-red/40` so focus state stays visible on dark bg. |
| Dashboard "current lesson" gradient card (`Dashboard.jsx` line 29, `from-swiss-red to-swiss-red-dark`) | `bg-gradient-to-br from-swiss-red to-swiss-red-dark text-white` | *(unchanged, but add ring)* `dark:ring-1 dark:ring-swiss-red-dark/60 dark:shadow-lg dark:shadow-black/30` | Do not swap the gradient colors — this card should stay the single most saturated element on the dark screen. Add a subtle ring/shadow so its edge doesn't bleed into the alp-900 page bg (both are dark-ish red vs dark blue, but a hard edge sells "elevated card" better than the shadow alone). |
| Level-map gradient cards (`levels/index.js`: `from-cheese-400 to-swiss-red`, `from-swiss-red-dark to-alp-900`, `from-swiss-red to-wood-700`, `from-wood-600 to-swiss-red-dark`, `from-swiss-red via-wood-700 to-alp-900`) | as-is | *(unchanged)* | These are already deep/saturated combos designed to carry their own contrast; leave them untouched in dark mode — don't apply a blanket `dark:` override here. |

## Contrast pitfalls to watch for

- **`text-alp-400` on `bg-alp-800`/`bg-alp-900`** — this pairing is under ~3:1 contrast, fails WCAG AA even for large text. Anywhere secondary text is styled `text-alp-400` today (checks against a *light* card, fine there), do **not** reuse `alp-400` as the dark-mode muted color. Use `dark:text-alp-300` (or `dark:text-alp-200` for very small captions) instead.
- **`text-swiss-red` on `bg-alp-900`** — swiss-red (`#D52B1E`) on alp-900 (`#1e364a`) is a warm-on-cool combo that looks fine for short labels/links but is borderline for body-length text; keep red text usage in dark mode limited to short labels, badges, and active-nav text, not paragraphs.
- **`border-alp-100`/`border-alp-200` reused verbatim in dark mode** — these are near-invisible on alp-800/900; always bump at least two steps (`alp-100→alp-700`, `alp-200→alp-600`), never a flat 1:1 swap.
- **`.btn-secondary`'s white background inverted to pure black/alp-900** — avoid `dark:bg-alp-900` for buttons sitting on an `alp-900` page bg (button would disappear); always keep interactive surfaces (buttons, inputs, cards) one step lighter than the page background (`alp-800` vs `alp-900`).
- **cheese-300/400 text on light backgrounds carried into dark mode unchanged** — cheese yellows have low contrast on *both* white and alp-900 as a text color; only ever use cheese as a background chip/badge fill with dark text on top (e.g. `bg-cheese-300 text-alp-900`), never as foreground text in either theme.
