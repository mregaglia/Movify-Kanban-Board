import {
  getFilterStatusRequest,
  createColumnId,
  getColumnData,
  isFromSameBoard
} from "../kanban";

describe("getFilterStatusRequest function", () => {
  it("should createthe filter request", () => {
    expect(getFilterStatusRequest()).toEqual(
      'status:"ITV1" OR status:"ITV2" OR status:"To Send" OR status:"WF Response" OR status:"Intake" OR status:"WFF"'
    );
  });
});

describe("createColumnId function", () => {
  it("should create id", () => {
    expect(createColumnId("bm1", "cc1", "jo1", "status")).toEqual(
      "bm1.cc1.jo1.status"
    );
  });
});

describe("getColumnData function", () => {
  it("should retrieve data from id", () => {
    expect(getColumnData("bm1.cc1.jo1.status")).toEqual({
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1",
      status: "status"
    });
  });
});

describe("isFromSameBoard function", () => {
  it("should return true", () => {
    const src = {
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1",
      status: "ITV1"
    };
    const dest = {
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1",
      status: "ITV2"
    };
    expect(isFromSameBoard(src, dest)).toBeTruthy();
  });
  it("should return false on diff jobOrder", () => {
    const src = {
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo1",
      status: "ITV1"
    };
    const dest = {
      bmId: "bm1",
      clientCorporationId: "cc1",
      jobOrderId: "jo2",
      status: "ITV2"
    };
    expect(isFromSameBoard(src, dest)).toBeFalsy();
  });
});
