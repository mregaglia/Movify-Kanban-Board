import {
  GET_KANBAN,
  SET_BMS,
  UPDATE_BMS,
  UPDATE_CLIENT_CORPORATIONS,
  SET_JOB_ORDERS,
  UPDATE_JOB_ORDERS,
  SET_JOB_SUBMISSIONS,
  UPDATE_JOB_SUBMISSIONS
} from "../kanban.actions";
import kanbanReducer, { initialState } from "../kanban.reducer";

describe("kanban reducer", () => {
  it("should return initialState", () => {
    expect(kanbanReducer()).toEqual(initialState);
  });
  it("should apply GET_KANBAN", () => {
    const action = { type: GET_KANBAN };
    expect(kanbanReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });
  it("should apply SET_BMS", () => {
    const bms = [1, 2, 3];
    const action = { type: SET_BMS, payload: bms };
    expect(kanbanReducer(initialState, action)).toEqual({
      ...initialState,
      bmList: bms
    });
  });
  it("should apply UPDATE_BMS", () => {
    const bms = {
      2: { clientCorporations: [23] },
      3: { clientCorporations: [31] }
    };
    const state = {
      bms: {
        1: { clientCorporations: [] },
        2: { clientCorporations: [21, 22] }
      }
    };
    const expectedState = {
      bms: {
        1: { clientCorporations: [] },
        2: { clientCorporations: [21, 22, 23] },
        3: { clientCorporations: [31] }
      }
    };
    const action = { type: UPDATE_BMS, payload: bms };
    expect(kanbanReducer(state, action)).toEqual(expectedState);
  });
  it("should apply UPDATE_CLIENT_CORPORATIONS", () => {
    const clientCorporations = {
      2: { bmIds: { 2: [23] } },
      3: { bmIds: { 3: [31] } }
    };
    const state = {
      clientCorporations: {
        1: { bmIds: { 1: [] } },
        2: { bmIds: { 2: [21, 22], 3: [31] } }
      }
    };
    const expectedState = {
      clientCorporations: {
        1: { bmIds: { 1: [] } },
        2: { bmIds: { 2: [21, 22, 23], 3: [31] } },
        3: { bmIds: { 3: [31] } }
      }
    };
    const action = {
      type: UPDATE_CLIENT_CORPORATIONS,
      payload: clientCorporations
    };
    expect(kanbanReducer(state, action)).toEqual(expectedState);
  });
  it("should apply SET_JOB_ORDERS", () => {
    const jos = { 1: { id: "1" }, 2: { id: "2" } };
    const action = { type: SET_JOB_ORDERS, payload: jos };
    expect(kanbanReducer(initialState, action)).toEqual({
      ...initialState,
      jobOrders: jos
    });
  });
  it("should apply UPDATE_JOB_ORDERS", () => {
    const jobOrders = {
      2: { jobSubmissions: { ITV1: [23] } },
      3: { jobSubmissions: { ITV2: [31], INTAKE: [41] } }
    };
    const state = {
      jobOrders: {
        1: { jobSubmissions: { ITV1: [] } },
        2: { jobSubmissions: { ITV1: [21, 22] } }
      }
    };
    const expectedState = {
      jobOrders: {
        1: { jobSubmissions: { ITV1: [] } },
        2: { jobSubmissions: { ITV1: [21, 22, 23] } },
        3: { jobSubmissions: { ITV2: [31], INTAKE: [41] } }
      }
    };
    const action = {
      type: UPDATE_JOB_ORDERS,
      payload: jobOrders
    };
    expect(kanbanReducer(state, action)).toEqual(expectedState);
  });
  it("should apply SET_JOB_SUBMISSIONS", () => {
    const jss = { 1: { id: "1" }, 2: { id: "2" } };
    const action = { type: SET_JOB_SUBMISSIONS, payload: jss };
    expect(kanbanReducer(initialState, action)).toEqual({
      ...initialState,
      jobSubmissions: jss,
      loading: false
    });
  });
  it("should apply UPDATE_JOB_SUBMISSIONS", () => {
    const state = {
      ...initialState,
      loading: true,
      jobSubmissions: { 1: { id: "1" } }
    };
    const expectedState = {
      ...initialState,
      loading: false,
      jobSubmissions: { 1: { id: "1" }, 2: { id: "2" } }
    };
    const jss = { 1: { id: "1" }, 2: { id: "2" } };
    const action = { type: UPDATE_JOB_SUBMISSIONS, payload: jss };
    expect(kanbanReducer(state, action)).toEqual(expectedState);
  });
});
