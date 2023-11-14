import { describe, expectTypeOf, it } from "vitest";
import { IsInteger } from "./integer";

describe("Integer", () => {
  it("should be true for one digit numbers", () => {
    expectTypeOf<IsInteger<"0">>().toEqualTypeOf<true>();
    expectTypeOf<IsInteger<"9">>().toEqualTypeOf<true>();
  });
  it("should be true for numbers with leading 0", () => {
    expectTypeOf<IsInteger<"012">>().toEqualTypeOf<true>();
  });
  it("should be never for non number strings", () => {
    expectTypeOf<IsInteger<"0 12">>().toBeNever();
  });
});
