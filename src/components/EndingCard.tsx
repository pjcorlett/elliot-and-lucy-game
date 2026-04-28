type Props = {
  message: string;
  onRestart: () => void;
};

export function EndingCard({ message, onRestart }: Props) {
  return (
    <div className="ending-card">
      <div className="ending-inner">
        <div className="ending-star">★</div>
        <h2 className="ending-title">The End!</h2>
        <p className="ending-message">{message}</p>
        <button className="start-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}
