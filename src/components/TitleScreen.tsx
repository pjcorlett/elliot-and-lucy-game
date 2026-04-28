type Props = {
  onStart: () => void;
};

export function TitleScreen({ onStart }: Props) {
  return (
    <div className="title-screen">
      <div className="title-card">
        <h1 className="title-text">
          <span style={{ color: "#7BB661" }}>E</span>
          <span style={{ color: "#A4C957" }}>L</span>
          <span style={{ color: "#E0D26A" }}>L</span>
          <span style={{ color: "#E89B4F" }}>I</span>
          <span style={{ color: "#7BB661" }}>O</span>
          <span style={{ color: "#A4C957" }}>T</span>
          <span style={{ color: "#E0D26A" }}>T</span>
          <br />
          <span style={{ color: "#E89B4F" }}>&amp;</span>{" "}
          <span style={{ color: "#7BB661" }}>L</span>
          <span style={{ color: "#A4C957" }}>U</span>
          <span style={{ color: "#E89B4F" }}>C</span>
          <span style={{ color: "#E0D26A" }}>Y</span>
        </h1>
        <p className="subtitle">A Choose-Your-Own-Adventure</p>
        <button className="start-btn" onClick={onStart}>
          ▶ Tap to Play
        </button>
        <p className="episode-pill">Episode 1 — The Five Dollars</p>
      </div>
    </div>
  );
}
