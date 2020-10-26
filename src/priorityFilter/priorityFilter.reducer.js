import { bindReducer } from "../utils/reducer";
import {
  SET_PRIORITY_FILTER,
  SET_FILTERED_BMS,
  SET_FILTERED_CCS
} from "./priorityFilter.actions";

export const initialState = {
  filter: {
    Antwerp: true,
    Brussels: true,
    Luxembourg: true
  },
  kanbanBms: [],
  recruitmentCcs: []
};

const priorityFilter = {
  [SET_PRIORITY_FILTER]: (state, payload) => ({
    ...state,
    filter: { ...state.filter, ...payload }
  }),
  [SET_FILTERED_BMS]: (state, payload) => ({
    ...state,
    kanbanBms: payload
  }),
  [SET_FILTERED_CCS]: (state, payload) => ({
    ...state,
    recruitmentCcs: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, priorityFilter, initialState);
