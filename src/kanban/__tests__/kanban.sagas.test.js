import { path, prop, propOr } from "ramda";
import {
  getKanbanBoard,
  getBms,
  getClientCorporations,
  getJobOrders,
  getJobSubmissions,
  updateJobSubmission,
  updateJobSubmissionStatus,
  createTempId,
  createJobSubmission,
  addJobSubmission,
  removeTempJobSubmission,
  getStateJobSubmissions,
  getStateJobOrder,
  getStateJobOrders
} from "../kanban.sagas";
import { call, all, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  getBusinessManagers,
  getJobOrders as getJobOrdersService,
  getJobSubmissions as getJobSubmissionsService,
  updateJobSubmissionStatus as updateJobSubmissionStatusService,
  getJobSubmission,
  createJobSubmission as createJobSubmissionService
} from "../kanban.service";
import {
  updateBms,
  getJobOrders as getJobOrdersAction,
  updateClientCorporations,
  GET_JOB_ORDERS,
  updateJobOrders,
  getJobSubmissions as getJobSubmissionsAction,
  GET_JOB_SUBMISSIONS,
  updateJobSubmissions,
  UPDATE_JOB_SUBMISSION,
  setJobSubmissions,
  setJobOrders,
  CREATE_JOB_SUBMISSION
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

describe("getJobSubmissions saga", () => {
  describe("getJobSubmissions saga with success and load more", () => {
    const bmId = 1;
    const ccId = 1;
    const joId = 1;
    const action = {
      type: GET_JOB_SUBMISSIONS,
      payload: { bmId, clientCorporationId: ccId, jobOrderId: joId }
    };
    const jobSubmissionList = [
      { id: 1, status: "ITV1" },
      { id: 2, status: "ITV2" }
    ];
    const jobSubmissionsResponse = {
      start: 0,
      count: 2,
      total: 6,
      data: jobSubmissionList
    };
    const jobSubmissions = {
      1: {
        id: 1,
        status: "ITV1",
        bmId,
        clientCorporationId: ccId,
        jobOrderId: joId
      },
      2: {
        id: 2,
        status: "ITV2",
        bmId,
        clientCorporationId: ccId,
        jobOrderId: joId
      }
    };
    const jobOrders = { [joId]: { jobSubmissions: { ITV1: [1], ITV2: [2] } } };
    const generator = getJobSubmissions(action);

    it("should call getJobSubmissions", () => {
      expect(generator.next().value).toEqual(
        call(getJobSubmissionsService, joId, 0)
      );
    });
    it("should reduce jobSubmissions", () => {
      expect(generator.next(jobSubmissionsResponse).value).toEqual(
        all(jobSubmissions)
      );
    });
    it("should put updateJobSubmissions", () => {
      expect(generator.next(jobSubmissions).value).toEqual(
        put(updateJobSubmissions(jobSubmissions))
      );
    });
    it("should put updateJobOrders", () => {
      expect(generator.next().value).toEqual(put(updateJobOrders(jobOrders)));
    });
    it("should load more", () => {
      expect(generator.next().value).toEqual(
        call(getJobSubmissions, action, 2)
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("getJobSubmissions saga with success and no load more", () => {
    const bmId = 1;
    const ccId = 1;
    const joId = 1;
    const action = {
      type: GET_JOB_SUBMISSIONS,
      payload: { bmId, clientCorporationId: ccId, jobOrderId: joId }
    };
    const jobSubmissionList = [
      { id: 1, status: "ITV1" },
      { id: 2, status: "ITV2" }
    ];
    const jobSubmissionsResponse = {
      start: 4,
      count: 2,
      total: 6,
      data: jobSubmissionList
    };
    const jobSubmissions = {
      1: {
        id: 1,
        status: "ITV1",
        bmId,
        clientCorporationId: ccId,
        jobOrderId: joId
      },
      2: {
        id: 2,
        status: "ITV2",
        bmId,
        clientCorporationId: ccId,
        jobOrderId: joId
      }
    };
    const jobOrders = { [joId]: { jobSubmissions: { ITV1: [1], ITV2: [2] } } };
    const generator = getJobSubmissions(action, 4);

    it("should call getJobSubmissions", () => {
      expect(generator.next().value).toEqual(
        call(getJobSubmissionsService, joId, 4)
      );
    });
    it("should reduce jobSubmissions", () => {
      expect(generator.next(jobSubmissionsResponse).value).toEqual(
        all(jobSubmissions)
      );
    });
    it("should put updateJobSubmissions", () => {
      expect(generator.next(jobSubmissions).value).toEqual(
        put(updateJobSubmissions(jobSubmissions))
      );
    });
    it("should put updateJobOrders", () => {
      expect(generator.next().value).toEqual(put(updateJobOrders(jobOrders)));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("getJobSubmissions saga with error", () => {
    const bmId = 1;
    const ccId = 1;
    const joId = 1;
    const action = {
      type: GET_JOB_SUBMISSIONS,
      payload: { bmId, clientCorporationId: ccId, jobOrderId: joId }
    };
    const generator = getJobSubmissions(action);

    it("should call getJobSubmissions", () => {
      expect(generator.next().value).toEqual(
        call(getJobSubmissionsService, joId, 0)
      );
    });
    it("should be done", () => {
      expect(generator.throw()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("updateJobSubmission saga", () => {
  describe("updateJobSubmission saga with success", () => {
    const prevStatus = "ITV1";
    const joId = 1;
    const status = "ITV2";
    const action = {
      type: UPDATE_JOB_SUBMISSION,
      payload: { prevStatus, jobSubmissionId: joId, status }
    };
    const generator = updateJobSubmission(action);

    it("should call updateJobSubmissionStatus saga", () => {
      expect(generator.next().value).toEqual(
        call(updateJobSubmissionStatus, action)
      );
    });
    it("should call updateJobSubmissionStatus service", () => {
      expect(generator.next().value).toEqual(
        call(updateJobSubmissionStatusService, joId, status)
      );
    });
    it("should call toast success", () => {
      expect(generator.next().value).toEqual(
        call(toast.success, "The job submission status was correctly updated.")
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("updateJobSubmission saga with error", () => {
    const prevStatus = "ITV1";
    const joId = 1;
    const status = "ITV2";
    const action = {
      type: UPDATE_JOB_SUBMISSION,
      payload: { prevStatus, jobSubmissionId: joId, status }
    };
    const reverseAction = {
      type: UPDATE_JOB_SUBMISSION,
      payload: { prevStatus: status, jobSubmissionId: joId, status: prevStatus }
    };
    const generator = updateJobSubmission(action);

    it("should call updateJobSubmissionStatus saga", () => {
      expect(generator.next().value).toEqual(
        call(updateJobSubmissionStatus, action)
      );
    });
    it("should call updateJobSubmissionStatus service", () => {
      expect(generator.next().value).toEqual(
        call(updateJobSubmissionStatusService, joId, status)
      );
    });
    it("should call updateJobSubmissionStatus saga", () => {
      expect(generator.throw().value).toEqual(
        call(updateJobSubmissionStatus, reverseAction)
      );
    });
    it("should call toast error", () => {
      expect(generator.next().value).toEqual(
        call(
          toast.error,
          "There was an issue with the update. Please retry again later."
        )
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("updateJobSubmissionStatus saga", () => {
  const joId = 1;
  const jsId = 1;
  const prevStatus = "ITV1";
  const status = "ITV2";
  const action = {
    type: UPDATE_JOB_SUBMISSION,
    payload: { jobOrderId: joId, prevStatus, jobSubmissionId: jsId, status }
  };
  const stateJobSubmissions = {
    [jsId]: { id: jsId, status: "ITV1" },
    2: { id: 2, status: "INTAKE" }
  };
  const jobSubmissions = {
    1: { id: 1, status: "ITV2" },
    2: { id: 2, status: "INTAKE" }
  };
  const stateJobOrder = {
    id: joId,
    jobSubmissions: {
      ITV1: [jsId],
      INTAKE: [2]
    }
  };
  const jobOrder = {
    id: joId,
    jobSubmissions: {
      ITV1: [],
      ITV2: [jsId],
      INTAKE: [2]
    }
  };
  const stateJobOrders = {
    [joId]: stateJobOrder,
    2: { id: 2, jobSubmissions: {} }
  };
  const jobOrders = {
    ...stateJobOrders,
    [joId]: jobOrder
  };
  const generator = updateJobSubmissionStatus(action);

  it("should get state job submissions", () => {
    expect(generator.next().value).toEqual(select(getStateJobSubmissions));
  });
  it("should put setJobSubmissions", () => {
    expect(generator.next(stateJobSubmissions).value).toEqual(
      put(setJobSubmissions(jobSubmissions))
    );
  });
  it("should get state job order", () => {
    expect(generator.next().value).toEqual(select(getStateJobOrder, joId));
  });
  it("should get state job orders", () => {
    expect(generator.next(stateJobOrder).value).toEqual(
      select(getStateJobOrders)
    );
  });
  it("should put setJobOrders", () => {
    expect(generator.next(stateJobOrders).value).toEqual(
      put(setJobOrders(jobOrders))
    );
  });
  it("should be done", () => {
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});

describe("createTempId function", () => {
  it("should return tempId with given data", () => {
    const jo = {
      id: 1
    };
    const js = {
      id: 11,
      candidate: { id: 111 }
    };
    expect(createTempId(jo, js)).toEqual("temp1111");
  });
  it("should return tempId with no data", () => {
    expect(createTempId()).toEqual("tempundefinedundefined");
  });
});

describe("createJobSubmission saga", () => {
  describe("createJobSubmission saga with success", () => {
    const jobOrder = { id: "jo1", bmId: "bm1", clientCorporationId: "cc1" };
    const candidate = { id: "c1" };
    const jobSubmission = { id: "js1", candidate };
    const status = "ITV1";
    const action = {
      type: CREATE_JOB_SUBMISSION,
      payload: { jobOrder, jobSubmission, status }
    };
    const tempJs = {
      id: "tempjo1c1",
      candidate,
      jobOrder,
      sendingUser: { id: "bm1" },
      status,
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1"
    };
    const js = {
      candidate: { id: "c1" },
      jobOrder: { id: "jo1" },
      sendingUser: { id: "bm1" },
      status
    };
    const createdId = "js2";
    const creationResponse = { changedEntityId: createdId };
    const jsResponse = { data: { id: createdId } };
    const newJs = {
      id: createdId,
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1"
    };
    const generator = createJobSubmission(action);

    it("should call addJobSubmission saga", () => {
      expect(generator.next().value).toEqual(call(addJobSubmission, tempJs));
    });
    it("should call createJobSubmission service", () => {
      expect(generator.next().value).toEqual(
        call(createJobSubmissionService, js)
      );
    });
    it("should call getJobSubmission service", () => {
      expect(generator.next(creationResponse).value).toEqual(
        call(getJobSubmission, createdId)
      );
    });
    it("should call addJobSubmission saga", () => {
      expect(generator.next(jsResponse).value).toEqual(
        call(addJobSubmission, newJs)
      );
    });
    it("should call toast success", () => {
      expect(generator.next().value).toEqual(
        call(toast.success, "The job submission was correctly created.")
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("createJobSubmission saga with error", () => {
    const jobOrder = { id: "jo1", bmId: "bm1", clientCorporationId: "cc1" };
    const candidate = { id: "c1" };
    const jobSubmission = { id: "js1", candidate };
    const status = "ITV1";
    const action = {
      type: CREATE_JOB_SUBMISSION,
      payload: { jobOrder, jobSubmission, status }
    };
    const tempJs = {
      id: "tempjo1c1",
      candidate,
      jobOrder,
      sendingUser: { id: "bm1" },
      status,
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1"
    };
    const js = {
      candidate: { id: "c1" },
      jobOrder: { id: "jo1" },
      sendingUser: { id: "bm1" },
      status
    };
    const generator = createJobSubmission(action);

    it("should call addJobSubmission saga", () => {
      expect(generator.next().value).toEqual(call(addJobSubmission, tempJs));
    });
    it("should call createJobSubmission service", () => {
      expect(generator.next().value).toEqual(
        call(createJobSubmissionService, js)
      );
    });
    it("should call removeTempJobSubmission saga", () => {
      expect(generator.throw().value).toEqual(
        call(removeTempJobSubmission, tempJs.id)
      );
    });
    it("should call toast error", () => {
      expect(generator.next().value).toEqual(
        call(
          toast.error,
          "There was an issue with the creation. Please retry again later."
        )
      );
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("addJobSubmission saga", () => {
  describe("addJobSubmission saga with temp", () => {
    const js = {
      id: 1,
      candidate: { id: "c1" },
      jobOrder: { id: 1 },
      status: "ITV1"
    };
    const stateJs = {
      temp1c1: { id: "temp1c1", status: "ITV1" },
      2: { id: 2, status: "ITV1" }
    };
    const jss = {
      1: js,
      2: { id: 2, status: "ITV1" }
    };
    const stateJo = { id: 1, jobSubmissions: { ITV1: ["temp1c1", 2] } };
    const stateJos = {
      1: stateJo
    };
    const jos = {
      1: { id: 1, jobSubmissions: { ITV1: [2, 1] } }
    };
    const generator = addJobSubmission(js);

    it("should get state job submissions", () => {
      expect(generator.next().value).toEqual(select(getStateJobSubmissions));
    });
    it("should put setJobSubmissions", () => {
      expect(generator.next(stateJs).value).toEqual(
        put(setJobSubmissions(jss))
      );
    });
    it("should get state job order", () => {
      expect(generator.next().value).toEqual(select(getStateJobOrder, 1));
    });
    it("should get state job orders", () => {
      expect(generator.next(stateJo).value).toEqual(select(getStateJobOrders));
    });
    it("should put setJobOrders", () => {
      expect(generator.next(stateJos).value).toEqual(put(setJobOrders(jos)));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
  describe("addJobSubmission saga without temp", () => {
    const js = {
      id: "temp1c1",
      candidate: { id: "c1" },
      jobOrder: { id: 1 },
      status: "ITV1"
    };
    const stateJs = {
      2: { id: 2, status: "ITV1" }
    };
    const jss = {
      temp1c1: js,
      2: { id: 2, status: "ITV1" }
    };
    const stateJo = { id: 1, jobSubmissions: { ITV1: [2] } };
    const stateJos = {
      1: stateJo
    };
    const jos = {
      1: { id: 1, jobSubmissions: { ITV1: [2, "temp1c1"] } }
    };
    const generator = addJobSubmission(js);

    it("should get state job submissions", () => {
      expect(generator.next().value).toEqual(select(getStateJobSubmissions));
    });
    it("should put setJobSubmissions", () => {
      expect(generator.next(stateJs).value).toEqual(
        put(setJobSubmissions(jss))
      );
    });
    it("should get state job order", () => {
      expect(generator.next().value).toEqual(select(getStateJobOrder, 1));
    });
    it("should get state job orders", () => {
      expect(generator.next(stateJo).value).toEqual(select(getStateJobOrders));
    });
    it("should put setJobOrders", () => {
      expect(generator.next(stateJos).value).toEqual(put(setJobOrders(jos)));
    });
    it("should be done", () => {
      expect(generator.next()).toEqual({ done: true, value: undefined });
    });
  });
});

describe("removeTempJobSubmission saga", () => {
  const js = {
    id: "temp1c1",
    candidate: { id: "c1" },
    jobOrder: { id: 1 },
    status: "ITV1"
  };
  const stateJss = {
    temp1c1: js,
    2: { id: 2, status: "ITV1" }
  };
  const jss = {
    2: { id: 2, status: "ITV1" }
  };
  const stateJo = { id: 1, jobSubmissions: { ITV1: ["temp1c1", 2] } };
  const stateJos = {
    1: stateJo
  };
  const jos = {
    1: { id: 1, jobSubmissions: { ITV1: [2] } }
  };
  const generator = removeTempJobSubmission(js);

  it("should get state job submissions", () => {
    expect(generator.next().value).toEqual(select(getStateJobSubmissions));
  });
  it("should put getJobSubmissions", () => {
    expect(generator.next(stateJss).value).toEqual(put(setJobSubmissions(jss)));
  });
  it("should get state job order", () => {
    expect(generator.next().value).toEqual(select(getStateJobOrder, 1));
  });
  it("should get state job orders", () => {
    expect(generator.next(stateJo).value).toEqual(select(getStateJobOrders));
  });
  it("should put setJobOrders", () => {
    expect(generator.next(stateJos).value).toEqual(put(setJobOrders(jos)));
  });
  it("should be done", () => {
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});
