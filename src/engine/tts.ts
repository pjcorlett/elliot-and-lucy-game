import type { DialogueLine, Speaker } from "./types";

const VOICE_PITCH: Record<Speaker, number> = {
  lucy: 1.6,
  elliot: 1.3,
  lady: 0.95,
  cashier: 1.0,
  mom: 1.1,
  narrator: 1.0,
};

const VOICE_RATE: Record<Speaker, number> = {
  lucy: 1.05,
  elliot: 1.0,
  lady: 0.95,
  cashier: 1.0,
  mom: 1.0,
  narrator: 1.0,
};

async function audioFileExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

function speakViaTTS(line: DialogueLine): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(line.text);
    utter.pitch = VOICE_PITCH[line.speaker] ?? 1;
    utter.rate = VOICE_RATE[line.speaker] ?? 1;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    window.speechSynthesis.speak(utter);
  });
}

function playAudioFile(url: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
    audio.play().catch(() => resolve());
  });
}

let currentAudio: HTMLAudioElement | null = null;

export async function speak(line: DialogueLine): Promise<void> {
  stopAll();
  const fileUrl = `${import.meta.env.BASE_URL}audio/${line.id}.mp3`;
  if (await audioFileExists(fileUrl)) {
    currentAudio = new Audio(fileUrl);
    return new Promise((resolve) => {
      currentAudio!.onended = () => {
        currentAudio = null;
        resolve();
      };
      currentAudio!.onerror = () => {
        currentAudio = null;
        resolve();
      };
      currentAudio!.play().catch(() => resolve());
    });
  }
  return speakViaTTS(line);
}

export function stopAll() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

void playAudioFile;
