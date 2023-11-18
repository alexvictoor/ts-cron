import { describe, expectTypeOf, it, expect } from "vitest";
import { CRON, verifyCron } from ".";

describe("cron", () => {

  it("should check a whole cron", () => {
    expectTypeOf<CRON<"*">>().toBeNever();
    expectTypeOf<CRON<"* * * * *">>().not.toBeNever();
    expectTypeOf<CRON<"* *  *   * *">>().not.toBeNever();
    expectTypeOf<CRON<"*/10 * * * 3">>().not.toBeNever();
    expectTypeOf<CRON<"5 0 * 8 *">>().not.toBeNever();
    expectTypeOf<CRON<"0 22 * * 1-5">>().not.toBeNever();

    verifyCron("*/10,1,02,01-2 * * 012 3-6");
  });
});