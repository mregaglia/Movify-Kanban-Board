import { bindReducer } from "../utils/reducer";
import {
  SET_PRIORITY_FILTER
} from "./priorityFilter.actions";

export const initialState = {
  filter: {
    Antwerp: true,
    Brussels: true,
    Luxembourg: true
  }
};

const priorityFilter = {
  [SET_PRIORITY_FILTER]: (state, payload) => ({
    ...state,
    filter: { ...state.filter, ...payload }
  })
};

export default (state, action) =>
  bindReducer(state, action, priorityFilter, initialState);
