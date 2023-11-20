import { describe, expectTypeOf, it } from "vitest";
import { CRON, validStandardCronExpression, validCronExpression } from ".";

describe("cron", () => {

  it("should check a whole cron", () => {
    expectTypeOf<CRON<"*">>().toBeNever();
    expectTypeOf<CRON<"* * * * *">>().not.toBeNever();
    expectTypeOf<CRON<"* *  *   * *">>().not.toBeNever();
    expectTypeOf<CRON<"*/10 * * * 3">>().not.toBeNever();
    expectTypeOf<CRON<"5 0 * 8 *">>().not.toBeNever();
    expectTypeOf<CRON<"0 22 * * 1-5">>().not.toBeNever();

    validCronExpression("*/10,1,02,01-2 * * 012 3-6");
    validStandardCronExpression("* * * * *  ");
    validStandardCronExpression("* * * * 6");
    validCronExpression("* * * * * 7");
    validCronExpression("* * * * * *  ");
  });
}); 