import { ScoreActionTypes } from "../../constants/ReduxTypes";

export const addScore = (data) => ({
  type: ScoreActionTypes.ADD_SCORE,
  payload: data,
});
export const incorrect = (data) => ({
  type: ScoreActionTypes.INCORRECT,
  data: data,
});
export const correct = (data) => ({
  type: ScoreActionTypes.CORRECT,
  data: data,
});
export const timeUp = (data) => ({
  type: ScoreActionTypes.TIMEUP,
  data: data,
});
