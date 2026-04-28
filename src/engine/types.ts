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

export type Scene = {
  id: string;
  background: string;
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
