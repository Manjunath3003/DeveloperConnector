import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];

//reducer function(state,action)
export default function (state = initialState, action) {
  //action has values type and data for each action state is updated
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); //filter(returns all alerts except the alert = payload)
    default:
      return state;
  }
}
