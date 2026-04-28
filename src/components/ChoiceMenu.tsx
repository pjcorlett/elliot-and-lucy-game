import type { Choice } from "../engine/types";

type Props = {
  choices: Choice[];
  onChoose: (choice: Choice) => void;
};

const CHOICE_COLORS = ["#E89B4F", "#7BB661", "#D14B4B"];

export function ChoiceMenu({ choices, onChoose }: Props) {
  return (
    <div className="choice-menu">
      <div className="choice-prompt">What do YOU think Lucy should do?</div>
      <div className="choice-buttons">
        {choices.map((choice, idx) => (
          <button
            key={choice.id}
            className="choice-btn"
            style={{ backgroundColor: CHOICE_COLORS[idx % CHOICE_COLORS.length] }}
            onClick={() => onChoose(choice)}
          >
            <span className="choice-num">{idx + 1}</span>
            <span className="choice-label">{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
