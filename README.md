# Elliot & Lucy — A Choose-Your-Own-Adventure

A web-based point-and-click choice game adapted from the *Elliot & Lucy* animated pilot, based on Ian James Corlett's *E Is for Ethics* and *E Is for Environment* books.

## Episode 1 — *The Five Dollars*

Lucy finds a $5 bill at the store. The lady ahead of them at checkout realizes she's lost a $5. What does Lucy do?

Three branches:
1. **Keep the money** — bad outcome → loops back to the choice
2. **Give the money to the lady** — the canon ending (Honesty)
3. **Blame Elliot** — chaos → loops back to the choice

## Tech

- Vite + React + TypeScript
- Web Speech API for placeholder TTS (drop `public/audio/<lineId>.mp3` files to override per line)
- Hosted on Vercel (auto-deploy on push)

## Run locally

```sh
npm install
npm run dev
# open http://localhost:5173
```

## Add real voice lines

Each dialogue line in `src/scenes/ep01.ts` has an `id`. To replace TTS for a line, drop a file at `public/audio/<id>.mp3` — it will play instead of the synthesized voice automatically.

## Adding more episodes

Episodes live in `src/scenes/`. Each is an `Episode` object (see `src/engine/types.ts`) — a `Record<sceneId, Scene>` describing dialogue lines and either an auto-advance `next` or branching `choices[]`.
