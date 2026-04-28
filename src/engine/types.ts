export type Speaker =
  | "lucy"
  | "elliot"
  | "lady"
  | "cashier"
  | "mom"
  | "narrator";

export type DialogueLine = {
  id: string;
  speaker: Speaker;
  text: string;
};

export type Choice = {
  id: string;
  label: string;
  next: string;
  isCorrect?: boolean;
};

/**
 * A character placed on a scene. The `id` references a character set under
 * `public/characters/<id>/`. The `pose` references a file `<pose>.svg`
 * (mouth-closed) and optionally `<pose>_open.svg` (mouth-open) inside that
 * folder. When the line being spoken has `speaker === id`, the engine
 * alternates between the two mouth states for a flap-animation.
 */
export type CharacterRef = {
  id: Exclude<Speaker, "narrator">;
  pose: string;
  /** % from left, 0..100 (anchors at character horizontal center) */
  x: number;
  /** % from top, 0..100 (anchors at character vertical center) */
  y: number;
  /** uniform scale, default 1 */
  scale?: number;
  /** mirror horizontally */
  flip?: boolean;
  /** depth ordering — higher renders in front. default 0 */
  z?: number;
};

export type Scene = {
  id: string;
  /** path under public/, e.g. "/backgrounds/driveway.svg" */
  background: string;
  characters: CharacterRef[];
  lines: DialogueLine[];
  next?: string;
  choices?: Choice[];
  isEnding?: boolean;
  endingMessage?: string;
};

export type Episode = {
  id: string;
  title: string;
  startScene: string;
  scenes: Record<string, Scene>;
};
