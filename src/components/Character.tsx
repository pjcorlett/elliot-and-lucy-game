import { useEffect, useState } from "react";
import type { CharacterRef } from "../engine/types";

type Props = {
  character: CharacterRef;
  isSpeaking: boolean;
};

export function Character({ character, isSpeaking }: Props) {
  const [mouthOpen, setMouthOpen] = useState(false);

  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen((o) => !o);
    }, 140);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  const base = `${import.meta.env.BASE_URL}characters/${character.id}/${character.pose}`;
  const src = isSpeaking && mouthOpen ? `${base}_open.svg` : `${base}.svg`;
  const fallback = `${base}.svg`;

  const flipScale = character.flip ? -1 : 1;
  const scale = character.scale ?? 1;

  return (
    <div
      className={`character-slot ${isSpeaking ? "speaking" : "idle"}`}
      style={{
        position: "absolute",
        left: `${character.x}%`,
        top: `${character.y}%`,
        zIndex: character.z ?? 0,
      }}
    >
      <img
        className="character"
        data-character={character.id}
        src={src}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== window.location.origin + fallback) img.src = fallback;
        }}
        style={{
          transform: `scale(${scale * flipScale}, ${scale})`,
        }}
        alt=""
        draggable={false}
      />
    </div>
  );
}
