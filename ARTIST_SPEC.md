# Artist Asset Spec — Elliot & Lucy game

This is everything an artist needs to know to deliver character + background assets that drop straight into the game with no engine changes. Hand this to whoever is preparing the cutouts.

---

## TL;DR

Every character lives at:

```
public/characters/<character_id>/<pose>.svg          # mouth closed
public/characters/<character_id>/<pose>_open.svg     # mouth open (for talking)
```

Every background lives at:

```
public/backgrounds/<scene_name>.svg
```

Files that match these names automatically replace the current rough stand-ins. **No code changes needed.**

---

## Characters

| character_id | Description |
|---|---|
| `lucy` | Lucy — the kid sister. Blonde long hair, yellow & orange striped sweater, black leggings, pink shoes |
| `elliot` | Elliot — the older brother. Dark spiky hair, green crewneck sweater, blue jeans, brown shoes |
| `lady` | The lady at the checkout who lost the $5. Tall adult, gray hair in a bun, purple belted dress, gold necklace, brown handbag |
| `cashier` | The cashier behind the register. Green apron, white headscarf, stays mostly stationary |
| `mom` | Lucy's mom — silent character, only seen at the end. Yellow jacket, brown belt, gray jeans |

### Required poses (Episode 1)

For Episode 1, only `idle` is required for every character. More expressive poses are **strongly recommended** but the game will fall back to `idle.svg` if a more specific pose is missing.

| character | poses needed | notes |
|---|---|---|
| `lucy` | `idle`, `holding_money`, `worried`, `excited`, `sad` | `holding_money` should show her holding a green $5 bill. `excited` = arms wide. |
| `elliot` | `idle`, `surprised`, `pointing` | `pointing` = arm extended out (used in the "blame Elliot" branch when he hands the bill to the lady) |
| `lady` | `idle`, `smiling` | `smiling` = the moment after Lucy returns the $5 |
| `cashier` | `idle` | Mostly silent, behind register |
| `mom` | `idle` | Only seen briefly |

### Mouth variants

For any pose where the character speaks dialogue, also provide a `_open.svg` variant with the mouth open. The engine alternates between the two files at ~140ms to create the mouth-flap "talking" animation.

**Required mouth variants for ep01:**

- `lucy/idle_open.svg`
- `lucy/holding_money_open.svg`
- `elliot/idle_open.svg`
- `elliot/surprised_open.svg`
- `lady/idle_open.svg`
- `lady/smiling_open.svg`
- `cashier/idle_open.svg`
- `mom/idle_open.svg`

If a `_open.svg` is missing, the engine falls back to the closed-mouth version (no mouth flap, but no broken images).

### File format

- **Format:** SVG preferred. Transparent PNG also accepted (1× and 2× variants).
- **Background:** transparent. No bounding box, no shadows baked in.
- **viewBox / canvas:** 200 wide × **the character's natural height** tall. Lucy/Elliot are kids ≈ 380 tall. The Lady & Mom are adults ≈ 480 tall. Cashier ≈ 460 tall (waist-up because she's behind a counter).
- **Anchor:** the character's **center horizontal** should be at x=100, and the character should fill from y=0 (top of head/hair) down to the bottom of the canvas (feet at the bottom). The engine positions characters by an x/y % that anchors at the center of the SVG, so the math is cleanest if the figure is centered horizontally.
- **Stroke width:** the show's outlines look ≈ 3px in a 200px-wide canvas. Match for visual consistency.
- **Colors:** match the show palette (see screenshots). Dark outline color throughout = `#2c2c2c`.

---

## Backgrounds

| scene_name | Description |
|---|---|
| `driveway.svg` | Suburban front yard. Lucy's introduction & outro setting. Sky, grass, gray driveway slabs with chalk drawings, a house behind, trees. |
| `store_aisle.svg` | Supermarket aisle with shelves of cans/cereal boxes. Lane number signs (1, 2, 3) on right. Refrigerated coolers. Tile floor. |
| `checkout.svg` | Checkout area: conveyor belt, cash register with `$4.83` display visible, produce bins behind, "RND" apple-logo grocery sign, magazine rack. |

### Format

- **Aspect ratio:** 16:9 (1920 × 1080 viewBox is what the stand-ins use).
- **Format:** SVG preferred. PNG accepted at minimum 1920×1080.
- **No characters baked in** — characters are layered separately.
- **`preserveAspectRatio="xMidYMid slice"`** on the SVG so it crops cleanly to whatever viewport aspect.

---

## Audio (related but separate)

Each line of dialogue in the script has a `lineId` (visible in `src/scenes/ep01.ts`). To replace the placeholder TTS for a line, drop a file at:

```
public/audio/<lineId>.mp3
```

The engine auto-detects and plays the file instead of the synthesized voice. No code change needed.

The full master audio extracted from the pilot is at `public/audio/_master.mp3` — the underscore prefix means the engine ignores it.

---

## When you have new files

Just replace them at the matching path and `git push`. Vercel auto-redeploys. If you want to verify visually first, run `npm run dev` from the project root and open `http://localhost:5173`.

If a path is wrong or the file is missing, the engine logs nothing — you'll just see a broken-image icon for the character (or no audio for that line). Fix the filename and reload.
