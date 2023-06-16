import { State } from "pigeon-mode-game-library";

interface Schema {
  isAtTitle: boolean;
}

const defaultState: Schema = {
  isAtTitle: true,
};

const state = new State(defaultState);

export default state;
