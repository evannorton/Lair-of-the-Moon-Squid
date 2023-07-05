import { State } from "pigeon-mode-game-library";

interface StateSchema {
  isAtTitle: boolean;
}
const defaultState: StateSchema = {
  isAtTitle: true,
};
const state: State<StateSchema> = new State(defaultState);

export default state;
