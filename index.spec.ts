import { describe, expectTypeOf, it } from "vitest";
import { CRON } from ".";

describe("cron", () => {
  
  it("should check a whole cron", () => {
    expectTypeOf<CRON<"*">>().toBeNever();
    expectTypeOf<CRON<"* * * * *">>().not.toBeNever();
    expectTypeOf<CRON<"* *  *   * *">>().not.toBeNever();
    expectTypeOf<CRON<"*/10 * * * 3">>().not.toBeNever();
    expectTypeOf<CRON<"5 0 * 8 *">>().not.toBeNever();
    expectTypeOf<CRON<"0 22 * * 1-5">>().not.toBeNever();
  });
});


const verifyCron = <T>(cron: T): CRON<T> => cron as any;

const toto = verifyCron("* * * * *");
