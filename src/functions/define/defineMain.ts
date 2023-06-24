import { Level } from "pigeon-mode-game-library";
import state from "../../state";

const defineMain = (): void => {
  new Level({
    condition: (): boolean => !state.values.isAtTitle,
    file: "test-level",
  });
};

export default defineMain;
