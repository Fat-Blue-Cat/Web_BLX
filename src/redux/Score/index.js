import { ScoreActionTypes } from "../../constants/ReduxTypes";

const initialState = {
  score: 0,
  incorrect: 0,
  correct: 0,
  timeUp: false,
};
const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ScoreActionTypes.ADD_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case ScoreActionTypes.CORRECT:
      return {
        ...state,
        correct: action.data,
      };

    case ScoreActionTypes.INCORRECT:
      return {
        ...state,
        incorrect: action.data,
      };
    case ScoreActionTypes.TIMEUP:
      return {
        ...state,
        timeUp: action.data,
      };
    default:
      return state;
  }
};
export default scoreReducer;
