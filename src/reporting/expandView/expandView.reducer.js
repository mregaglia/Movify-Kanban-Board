import { bindReducer } from "../../utils/reducer";

export const initialState = {
}

const expandView = {

}

export default (state, action) =>
  bindReducer(state, action, expandView, initialState);