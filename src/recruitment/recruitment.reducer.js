import { bindReducer } from "../utils/reducer";
import { GET_RECRUITMENT } from "./recruitment.actions";

export const initialState = {
  loading: false,
  tams: {},
  clientList: [],
  clientCorporations: {},
  jobOrders: {},
  jobSubmissions: {}
};

const recruitment = {
  [GET_RECRUITMENT]: () => ({
    ...initialState,
    loading: true
  })
};

export default (state, action) =>
  bindReducer(state, action, recruitment, initialState);
