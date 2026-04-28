import { useEffect, useState } from "react";
import type { Choice, Episode, Scene, Speaker } from "../engine/types";
import { speak, stopAll } from "../engine/tts";
import { DialogueBox } from "./DialogueBox";
import { ChoiceMenu } from "./ChoiceMenu";
import { EndingCard } from "./EndingCard";
import { Character } from "./Character";

type Props = {
  episode: Episode;
  onFinish: () => void;
};

export function SceneRunner({ episode, onFinish }: Props) {
  const [sceneId, setSceneId] = useState(episode.startScene);
  const scene = episode.scenes[sceneId];

  if (!scene) {
    return <div className="error">Missing scene: {sceneId}</div>;
  }

  return (
    <ScenePlayer
      scene={scene}
      onNavigate={setSceneId}
      onFinish={onFinish}
    />
  );
}

type PlayerProps = {
  scene: Scene;
  onNavigate: (sceneId: string) => void;
  onFinish: () => void;
};

function ScenePlayer({ scene, onNavigate, onFinish }: PlayerProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    setLineIndex(0);
    setShowChoices(false);
  }, [scene.id]);

  useEffect(() => {
    if (lineIndex < scene.lines.length) {
      void speak(scene.lines[lineIndex]);
    }
    return () => stopAll();
  }, [scene.id, lineIndex, scene.lines]);

  useEffect(() => {
    if (scene.lines.length === 0 && !scene.isEnding) {
      const delay = scene.id === "title" ? 2200 : 800;
      const t = setTimeout(() => {
        if (scene.next) onNavigate(scene.next);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [scene.id, scene.lines.length, scene.isEnding, scene.next, onNavigate]);

  function advance() {
    if (lineIndex < scene.lines.length - 1) {
      setLineIndex(lineIndex + 1);
      return;
    }
    if (scene.choices && scene.choices.length > 0) {
      setLineIndex(scene.lines.length);
      setShowChoices(true);
      return;
    }
    if (scene.next) {
      onNavigate(scene.next);
    }
  }

  function handleChoice(choice: Choice) {
    setShowChoices(false);
    onNavigate(choice.next);
  }

  const allLinesDone = lineIndex >= scene.lines.length;
  const isEnding = scene.isEnding && allLinesDone;
  const currentLine =
    lineIndex < scene.lines.length ? scene.lines[lineIndex] : null;
  const currentSpeaker: Speaker | null = currentLine?.speaker ?? null;

  return (
    <div className="scene-runner">
      <div className="scene-stage">
        <div
          className="scene-bg"
          style={{ backgroundImage: `url("${scene.background}")` }}
          key={scene.background}
        />
        <div className="scene-characters">
          {scene.characters.map((char, i) => (
            <Character
              key={`${char.id}_${i}`}
              character={char}
              isSpeaking={currentSpeaker === char.id}
            />
          ))}
        </div>
      </div>

      {!isEnding && !showChoices && currentLine && (
        <DialogueBox line={currentLine} onAdvance={advance} />
      )}

      {showChoices && scene.choices && (
        <ChoiceMenu choices={scene.choices} onChoose={handleChoice} />
      )}

      {isEnding && (
        <EndingCard
          message={scene.endingMessage ?? "Thanks for playing!"}
          onRestart={onFinish}
        />
      )}
    </div>
  );
}
