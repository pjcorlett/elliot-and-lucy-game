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

The master audio extracted from the pilot lives at `public/audio/_master.mp3` (the underscore prefix means the engine ignores it). To slice it into per-line clips:

1. Open `tools/audio-timestamps.json` and adjust the `start` / `end` seconds for each line so they match the master audio (the current values are rough estimates).
2. Run `node tools/split-audio.mjs` from the project root. It writes one `.mp3` per line into `public/audio/`.
3. Reload the game — the engine now uses the real voice lines.

For waveform-precise editing, open `_master.mp3` in Audacity (or any DAW) to find exact boundaries.

## Replacing the rough character/background art

See [`ARTIST_SPEC.md`](./ARTIST_SPEC.md) for the file layout the artist needs to follow. New SVGs at the matching paths automatically replace the stand-ins — no code changes needed.

## Adding more episodes

Episodes live in `src/scenes/`. Each is an `Episode` object (see `src/engine/types.ts`) — a `Record<sceneId, Scene>` describing dialogue lines, characters present + their poses/positions, and either an auto-advance `next` or branching `choices[]`.
