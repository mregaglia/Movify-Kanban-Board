import { isOverDiff } from "../date";

describe("isOverDiff function", () => {
  it("should return true", () => {
    const diff = 150;
    const date = new Date().getTime() - diff - 20;
    expect(isOverDiff(date, diff)).toBeTruthy();
  });
  it("should return false", () => {
    const diff = 150;
    const date = new Date().getTime() - diff + 20;
    expect(isOverDiff(date, diff)).toBeFalsy();
  });
});
