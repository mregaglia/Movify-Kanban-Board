import { bindReducer } from "../utils/reducer";
import { GET_KANBAN, UPDATE_KANBAN } from "./kanban.actions";

export const initialState = {
  loading: false,
  kanban: []
};

const kanban = {
  [GET_KANBAN]: () => ({
    ...initialState,
    loading: true
  }),
  [UPDATE_KANBAN]: (state, payload) => ({
    ...state,
    loading: false,
    kanban: payload
  })
};

export default (state, action) =>
  bindReducer(state, action, kanban, initialState);
