import { describe, expectTypeOf, it } from "vitest";
import { CheckDaysPart, CheckHoursPart, CheckMinutesPart, CheckStandardMonthsPart, CheckStandardWeekDaysPart, CheckWeekDaysPart } from "./core";


describe("cron", () => {
  it("should check minutes part", () => {
    expectTypeOf<CheckMinutesPart<"059">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"123">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"0,059">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"59,123">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"  0 , 59">>().toBeNever();
    expectTypeOf<CheckMinutesPart<" 059 ">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"0-10 ">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"2-1">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"0-10/2">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"0-10/002">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"0-10/0">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"10/*">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"0-10/002,11,0-3">>().not.toBeNever();
    expectTypeOf<CheckMinutesPart<"0*">>().toBeNever();
    expectTypeOf<CheckMinutesPart<"60,1">>().toBeNever();
  });

  it("should check hours part", () => {
    expectTypeOf<CheckHoursPart<"*">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"0*">>().toBeNever();
    expectTypeOf<CheckHoursPart<"023">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"24">>().toBeNever();
    expectTypeOf<CheckHoursPart<"0,023">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"23,24">>().toBeNever();
    expectTypeOf<CheckHoursPart<"  0 , 23">>().toBeNever();
    expectTypeOf<CheckHoursPart<" 023 ">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"0-23 ">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"23-22">>().toBeNever();
    expectTypeOf<CheckHoursPart<"*/2">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"0-023/2">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"0-23/002">>().not.toBeNever();
    expectTypeOf<CheckHoursPart<"0-23/0">>().toBeNever();
    expectTypeOf<CheckHoursPart<"10/*">>().toBeNever();
    expectTypeOf<CheckHoursPart<"0-23/002,11,0-3">>().not.toBeNever();
  });

  it("should check days part", () => {
    expectTypeOf<CheckDaysPart<"*">>().not.toBeNever();
    expectTypeOf<CheckDaysPart<"0*">>().toBeNever();
    expectTypeOf<CheckDaysPart<"0">>().toBeNever();
    expectTypeOf<CheckDaysPart<"01">>().not.toBeNever();
    expectTypeOf<CheckDaysPart<"31">>().not.toBeNever();
    expectTypeOf<CheckDaysPart<"32">>().toBeNever();
    expectTypeOf<CheckDaysPart<"1,023">>().not.toBeNever();
    expectTypeOf<CheckDaysPart<"0,23">>().toBeNever();
    expectTypeOf<CheckDaysPart<"31,32">>().toBeNever();
  });

  it("should check months part", () => {
    expectTypeOf<CheckStandardMonthsPart<"*">>().not.toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"0*">>().toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"0">>().toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"01">>().not.toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"12">>().not.toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"13">>().toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"1,012">>().not.toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"0,12">>().toBeNever();
    expectTypeOf<CheckStandardMonthsPart<"12,13">>().toBeNever();
  });

  it("should check week days part", () => {
    expectTypeOf<CheckWeekDaysPart<"*">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0*">>().toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"00">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"6">>().not.toBeNever();
    expectTypeOf<CheckStandardWeekDaysPart<"7">>().toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0,06">>().not.toBeNever();
    expectTypeOf<CheckStandardWeekDaysPart<"0,7">>().toBeNever();
  });

});