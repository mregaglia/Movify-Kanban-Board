import { isRequired } from "../validate";

describe("isRequired validator", () => {
  it("should return required", () => {
    expect(isRequired()).toEqual("Required");
  });
  it("should return required", () => {
    expect(isRequired(undefined)).toEqual("Required");
  });
  it("should return required", () => {
    expect(isRequired(null)).toEqual("Required");
  });
  it("should return required", () => {
    expect(isRequired({})).toEqual("Required");
  });
  it("should return required", () => {
    expect(isRequired([])).toEqual("Required");
  });
  it("should return required", () => {
    expect(isRequired("")).toEqual("Required");
  });
  it("should be undefined", () => {
    expect(isRequired("hello")).toBeUndefined();
  });
  it("should be undefined", () => {
    expect(isRequired({ name: "hello" })).toBeUndefined();
  });
  it("should be undefined", () => {
    expect(isRequired(["hello"])).toBeUndefined();
  });
  it("should be undefined", () => {
    expect(isRequired(5)).toBeUndefined();
  });
});
