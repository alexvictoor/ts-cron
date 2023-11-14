import { describe, expectTypeOf, it } from "vitest";
import { RemoveEveryPart } from "./every";

describe("Every part", () => {
  it("should be ignored", () => {
    expectTypeOf<RemoveEveryPart<"*">>().toEqualTypeOf<'*'>();
    expectTypeOf<RemoveEveryPart<"12">>().toEqualTypeOf<'12'>();
  });
  it("should be removed", () => {
    expectTypeOf<RemoveEveryPart<"12/2">>().toEqualTypeOf<'12'>();
    expectTypeOf<RemoveEveryPart<"12/1">>().toEqualTypeOf<'12'>();
    expectTypeOf<RemoveEveryPart<"12/001">>().toEqualTypeOf<'12'>();
  });
  it("should be invalid", () => {
    expectTypeOf<RemoveEveryPart<"12/x">>().toBeNever();
    expectTypeOf<RemoveEveryPart<"12/0">>().toBeNever();
  });

});
