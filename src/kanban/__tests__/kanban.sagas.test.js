import { path, prop, propOr } from "ramda";
import {
  getKanbanBoard,
  getBms,
  getClientCorporations,
  getJobOrders
} from "../kanban.sagas";
import { call, all, put } from "redux-saga/effects";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService
} from "../kanban.service";
import {
  updateBms,
  getJobOrders as getJobOrdersAction,
  updateClientCorporations,
  GET_JOB_ORDERS,
  updateJobOrders,
  getJobSubmissions as getJobSubmissionsAction
} from "../kanban.actions";

describe("kanban board saga", () => {
  const generator = getKanbanBoard();
  it("should call getBms saga", () => {
    expect(generator.next().value).toEqual(call(getBms));
  });
  it("should be done", () => {
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});

describe("getBms saga", () => {
  describe("getBms saga with success and load more", () => {
    const bmList = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const bms = {
      1: { id: 1, clientCorporations: [] },
      2: { id: 2, clientCorporations: [] },
      3: { id: 3, clientCorporations: [] }
    };
    const bmsResponse = { start: 0, count: 3, data: bmList };
    const generator = getBms();

    it("should call getBusinessManagers service", () => {
      expect(generator.next().value).toEqual(call(getBusinessManagers, 0));
    });
    it("should get bms list from response", () => {
      expect(generator.next(bmsResponse).value).toEqual(
        call(propOr, [], "data", bmsResponse)
      );
    });
    it("should reduce bms list", () => {
      expect(generator.next(bmList).value).toEqual(all(bms));
    });
    it("should put updateBms", () => {
      expect(generator.next(bms).value).toEqual(put(updateBms(bms)));
    });
    it("should getJobOrders for all bms", () => {
      expect(generator.next().value).toEqual(
        all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))))
      );
    });
    it("should get next bms", () => {
      expect(generator.next().value).toEqual(call(getBms, 3));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("getBms saga with success and no load more", () => {
    const bmList = [];
    const bms = {};
    const bmsResponse = { start: 0, count: 0, data: bmList };
    const generator = getBms();

    it("should call getBusinessManagers service", () => {
      expect(generator.next().value).toEqual(call(getBusinessManagers, 0));
    });
    it("should get bms list from response", () => {
      expect(generator.next(bmsResponse).value).toEqual(
        call(propOr, [], "data", bmsResponse)
      );
    });
    it("should reduce bms list", () => {
      expect(generator.next(bmList).value).toEqual(all(bms));
    });
    it("should put updateBms", () => {
      expect(generator.next(bms).value).toEqual(put(updateBms(bms)));
    });
    it("should getJobOrders for all bms", () => {
      expect(generator.next().value).toEqual(
        all(bmList.map(bm => put(getJobOrdersAction(prop("id", bm)))))
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });

  describe("getBms saga with error", () => {
    const generator = getBms();

    it("should call getBusinessManagers service", () => {
      expect(generator.next().value).toEqual(call(getBusinessManagers, 0));
    });
    it("should be done", () => {
      expect(generator.throw()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("getClientCorporations saga", () => {
  const bmId = 1;
  const jobOrders = [
    { id: 1, clientCorporation: { id: 1 } },
    { id: 2, clientCorporation: { id: 2 } }
  ];
  const joClientCorporations = [{ id: 1 }, { id: 2 }];
  const ccs = {
    1: { id: 1, bmIds: { [bmId]: [] } },
    2: { id: 2, bmIds: { [bmId]: [] } }
  };
  const bms = {
    [bmId]: { clientCorporations: [1, 2] }
  };
  const generator = getClientCorporations(bmId, jobOrders);

  it("should get all clientCorporations from jobOrders", () => {
    expect(generator.next().value).toEqual(all(joClientCorporations));
  });
  it("should reduce clientCorporations", () => {
    expect(generator.next(joClientCorporations).value).toEqual(all(ccs));
  });
  it("should put updateClientCorporations", () => {
    expect(generator.next(ccs).value).toEqual(
      put(updateClientCorporations(ccs))
    );
  });
  it("should put updateBms", () => {
    expect(generator.next().value).toEqual(put(updateBms(bms)));
  });
  it("should be done", () => {
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});

describe("getJobOrders saga", () => {
  describe("getJobOrders saga with success and load more", () => {
    const bmId = 1;
    const action = { type: GET_JOB_ORDERS, payload: bmId };
    const jobOrderList = [
      { id: 1, clientCorporation: { id: 11 } },
      { id: 2, clientCorporation: { id: 21 } }
    ];
    const jobOrdersResponse = {
      start: 0,
      count: 3,
      total: 10,
      data: jobOrderList
    };
    const jos = {
      1: {
        ...jobOrderList[0],
        bmId,
        clientCorporationId: 11,
        jobSubmissions: {}
      },
      2: {
        ...jobOrderList[1],
        bmId,
        clientCorporationId: 21,
        jobSubmissions: {}
      }
    };
    const ccs = {
      11: { bmIds: { [bmId]: [1] } },
      21: { bmIds: { [bmId]: [2] } }
    };
    const generator = getJobOrders(action);

    it("should call getJobOrders service", () => {
      expect(generator.next().value).toEqual(
        call(getJobOrdersService, bmId, 0)
      );
    });
    it("should get jobOrders list from response", () => {
      expect(generator.next(jobOrdersResponse).value).toEqual(
        call(propOr, [], "data", jobOrdersResponse)
      );
    });
    it("should call getClientCorporations saga", () => {
      expect(generator.next(jobOrderList).value).toEqual(
        call(getClientCorporations, bmId, jobOrderList)
      );
    });
    it("should reduce jobOrders", () => {
      expect(generator.next().value).toEqual(all(jos));
    });
    it("should put updateJobOrders", () => {
      expect(generator.next(jos).value).toEqual(put(updateJobOrders(jos)));
    });
    it("should put updateClientCorporations", () => {
      expect(generator.next().value).toEqual(
        put(updateClientCorporations(ccs))
      );
    });
    it("should put getJobSubmissions action on each jobOrder", () => {
      expect(generator.next().value).toEqual(
        all(
          jobOrderList.map(jobOrder =>
            put(
              getJobSubmissionsAction(
                bmId,
                path(["clientCorporation", "id"], jobOrder),
                prop("id", jobOrder)
              )
            )
          )
        )
      );
    });
    it("should load more jobOrders", () => {
      expect(generator.next().value).toEqual(call(getJobOrders, action, 3));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("getJobOrders saga with success and no load more", () => {
    const bmId = 1;
    const action = { type: GET_JOB_ORDERS, payload: bmId };
    const jobOrderList = [
      { id: 1, clientCorporation: { id: 11 } },
      { id: 2, clientCorporation: { id: 21 } }
    ];
    const jobOrdersResponse = {
      start: 0,
      count: 3,
      total: 3,
      data: jobOrderList
    };
    const jos = {
      1: {
        ...jobOrderList[0],
        bmId,
        clientCorporationId: 11,
        jobSubmissions: {}
      },
      2: {
        ...jobOrderList[1],
        bmId,
        clientCorporationId: 21,
        jobSubmissions: {}
      }
    };
    const ccs = {
      11: { bmIds: { [bmId]: [1] } },
      21: { bmIds: { [bmId]: [2] } }
    };
    const generator = getJobOrders(action);

    it("should call getJobOrders service", () => {
      expect(generator.next().value).toEqual(
        call(getJobOrdersService, bmId, 0)
      );
    });
    it("should get jobOrders list from response", () => {
      expect(generator.next(jobOrdersResponse).value).toEqual(
        call(propOr, [], "data", jobOrdersResponse)
      );
    });
    it("should call getClientCorporations saga", () => {
      expect(generator.next(jobOrderList).value).toEqual(
        call(getClientCorporations, bmId, jobOrderList)
      );
    });
    it("should reduce jobOrders", () => {
      expect(generator.next().value).toEqual(all(jos));
    });
    it("should put updateJobOrders", () => {
      expect(generator.next(jos).value).toEqual(put(updateJobOrders(jos)));
    });
    it("should put updateClientCorporations", () => {
      expect(generator.next().value).toEqual(
        put(updateClientCorporations(ccs))
      );
    });
    it("should put getJobSubmissions action on each jobOrder", () => {
      expect(generator.next().value).toEqual(
        all(
          jobOrderList.map(jobOrder =>
            put(
              getJobSubmissionsAction(
                bmId,
                path(["clientCorporation", "id"], jobOrder),
                prop("id", jobOrder)
              )
            )
          )
        )
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("getJobOrders saga with error", () => {
    const bmId = 1;
    const action = { type: GET_JOB_ORDERS, payload: bmId };
    const generator = getJobOrders(action);

    it("should call getJobOrders service", () => {
      expect(generator.next().value).toEqual(
        call(getJobOrdersService, bmId, 0)
      );
    });
    it("should be done", () => {
      expect(generator.throw()).toEqual({ done: true, value: undefined });
    });
  });
});
