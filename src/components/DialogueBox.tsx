import { useEffect, useState } from "react";
import type { DialogueLine } from "../engine/types";

const SPEAKER_LABELS: Record<string, string> = {
  lucy: "Lucy",
  elliot: "Elliot",
  lady: "The Lady",
  cashier: "Cashier",
  mom: "Mom",
  narrator: "",
};

const SPEAKER_COLORS: Record<string, string> = {
  lucy: "#E89B4F",
  elliot: "#7BB661",
  lady: "#9B6FB0",
  cashier: "#5DAA68",
  mom: "#D17A4A",
  narrator: "#666666",
};

type Props = {
  line: DialogueLine;
  onAdvance: () => void;
};

export function DialogueBox({ line, onAdvance }: Props) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setShown(line.text.slice(0, i));
      if (i >= line.text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [line.id, line.text]);

  const isComplete = shown.length >= line.text.length;
  const speakerName = SPEAKER_LABELS[line.speaker] ?? "";
  const color = SPEAKER_COLORS[line.speaker] ?? "#666";
  const isNarrator = line.speaker === "narrator";

  const handleClick = () => {
    if (!isComplete) {
      setShown(line.text);
    } else {
      onAdvance();
    }
  };

  return (
    <div
      className={`dialogue-box ${isNarrator ? "narrator" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") handleClick();
      }}
    >
      {speakerName && (
        <div className="speaker-name" style={{ color }}>
          {speakerName}
        </div>
      )}
      <div className="dialogue-text">
        {shown}
        {!isComplete && <span className="caret">▌</span>}
      </div>
      {isComplete && (
        <div className="advance-hint" aria-hidden>
          ▶
        </div>
      )}
    </div>
  );
}
