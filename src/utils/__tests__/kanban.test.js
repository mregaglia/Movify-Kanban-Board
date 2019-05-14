import {
  getFilterStatusRequest,
  createColumnId,
  getColumnData,
  isFromSameBoard,
  getCandidateBorderColor,
  createItemFilter,
  getCandidateNameQuery,
  getCandidateName,
  formatBmName
} from "../kanban";
import { DIFF_DAY } from "../date";

describe("getFilterStatusRequest function", () => {
  it("should createthe filter request", () => {
    expect(getFilterStatusRequest()).toEqual(
      'status:"ITV1" OR status:"ITV2" OR status:"To Send" OR status:"WF Response" OR status:"Intake" OR status:"WFF" OR status:"NO GO"'
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

describe("getCandidateBorderColor function", () => {
  describe("getCandidateBorderColor function with no date", () => {
    it("should return undefined", () => {
      expect(getCandidateBorderColor()).toBeUndefined();
    });
  });
  describe("getCandidateBorderColor function with over 10 days date", () => {
    it("should return red", () => {
      const date = new Date().getTime() - 11 * DIFF_DAY;
      expect(getCandidateBorderColor(date)).toEqual("red");
    });
  });
  describe("getCandidateBorderColor function with over 5 days date", () => {
    it("should return orange", () => {
      const date = new Date().getTime() - 6 * DIFF_DAY;
      expect(getCandidateBorderColor(date)).toEqual("orange");
    });
  });
  describe("getCandidateBorderColor function with date under 5 days", () => {
    it("should return undefined", () => {
      expect(getCandidateBorderColor(new Date().getTime())).toBeUndefined();
    });
  });
});

describe("formatBmName function", () => {
  describe("formatBmName function with 1 lastName", () => {
    it("should return initials", () => {
      const bm = { firstName: "Candi", lastName: "Date" };
      const expectedResult = "CDA";
      expect(formatBmName(bm)).toEqual(expectedResult);
    });
  });
  describe("formatBmName function with 2 lastNames", () => {
    it("should return initials", () => {
      const bm = { firstName: "Candi", lastName: "Da Te" };
      const expectedResult = "CDT";
      expect(formatBmName(bm)).toEqual(expectedResult);
    });
  });
});

describe("getCandidateName function", () => {
  it("should return candidate full name", () => {
    const candidate = { firstName: "Candi", lastName: "Date" };
    const expectedResult = "Candi Date";
    expect(getCandidateName(candidate)).toEqual(expectedResult);
  });
});

describe("getCandidateNameQuery function", () => {
  describe("getCandidateNameQuery function with no query", () => {
    it("should return undefined", () => {
      expect(getCandidateNameQuery()).toBeUndefined();
    });
  });
  describe("getCandidateNameQuery function with query", () => {
    it("should return query", () => {
      const query = "Candi Date";
      const expectedResult =
        "name:Candi* OR firstName:Candi* OR lastName:Candi* OR name:Date* OR firstName:Date* OR lastName:Date* OR name:Candi Date*";
      expect(getCandidateNameQuery(query)).toEqual(expectedResult);
    });
  });
});

describe("createItemFilter function", () => {
  it("should create filter", () => {
    expect(createItemFilter("item")).toEqual([
      "name:item*",
      "firstName:item*",
      "lastName:item*"
    ]);
  });
});
