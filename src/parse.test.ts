import { describe, expect, it } from "vitest";
import { parse } from "./parse";

describe("parse", () => {
  it("should parse string value", () => {
    let result = parse(`"string"`);
    expect(result).toEqual("string");

    result = parse(`""`);
    expect(result).toEqual("");
  });
});
