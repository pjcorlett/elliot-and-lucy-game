import { useState } from "react";
import { TitleScreen } from "./components/TitleScreen";
import { SceneRunner } from "./components/SceneRunner";
import { ep01 } from "./scenes/ep01";
import "./App.css";

type AppState = "title" | "playing";

function App() {
  const [state, setState] = useState<AppState>("title");
  const [runId, setRunId] = useState(0);

  return (
    <div className="app-shell">
      {state === "title" && <TitleScreen onStart={() => setState("playing")} />}
      {state === "playing" && (
        <SceneRunner
          key={runId}
          episode={ep01}
          onFinish={() => {
            setRunId((n) => n + 1);
            setState("title");
          }}
        />
      )}
    </div>
  );
}

export default App;
