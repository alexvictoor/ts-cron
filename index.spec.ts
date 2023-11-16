import { describe, expectTypeOf, it } from "vitest";
import { Greater } from "./comparison";
import { Days } from "./days";
import { RemoveEveryPart } from "./every";
import { Hours } from "./hours";
import { Minutes } from "./minutes";
import { Months } from "./months";
import { WeekDays } from "./week-days";

type Space = " ";

type Trim<Input> = Input extends `${Space}${infer LeftTrimmed}`
  ? Trim<LeftTrimmed>
  : Input extends `${infer RightTrimmed}${Space}`
  ? Trim<RightTrimmed>
  : Input;


type Split<Input> = Input extends `${infer Left}${Space}${infer Right}`
  ? [...Split<Trim<Left>>, ...Split<Trim<Right>>]
  : [Trim<Input>]

type UnitArray<Value> = [Minutes<Value>, Hours<Value>, Days<Value>, Months<Value>, WeekDays<Value>];
type UnitType<Value, UnitIndex extends number> = UnitArray<Value>[UnitIndex];
type Range<
  Value,
  UnitIndex extends number
> = Value extends `${infer Start extends number}-${infer End extends number}`
  ? Greater<Start, End> extends true
    ? never
    : CheckArray<Value,
        [UnitType<`${Start}`, UnitIndex>, UnitType<`${End}`, UnitIndex>]
      >
  : UnitType<Value, UnitIndex>;
//type ComponentType<Value, UnitIndex extends number> = Value extends '*' ? '*' : Range<RemoveEveryPart<Value>, UnitIndex>;

type ComponentTypeWithoutEvery<Value, UnitIndex extends number> = Value extends '*' ? '*' : Range<Value, UnitIndex>;
type ComponentType<Value, UnitIndex extends number> = ComponentTypeWithoutEvery<RemoveEveryPart<Value>, UnitIndex>;


type CommaSeparated<
  Index extends number,
  Values
> = Values extends `${infer Value},${infer Rest}`
  ? [ComponentType<Value, Index>, ...CommaSeparated<Index, Rest>]
  : [ComponentType<Values, Index>];

type CheckArray<RawValues extends string, Values extends Array<any>> = Values extends [
  infer First,
  ...infer Rest
]
  ? First extends never
    ? never
    : CheckArray<RawValues, Rest>
  : RawValues;

type CheckMinutesPart<Part extends string> = CheckArray<Part,
  CommaSeparated<0, Trim<Part>>
>;

type CheckHoursPart<Part extends string> = CheckArray<Part,
  CommaSeparated<1, Trim<Part>>
>;

type CheckDaysPart<Part extends string> = CheckArray<Part,
  CommaSeparated<2, Trim<Part>>
>;

type CheckMonthsPart<Part extends string> = CheckArray<Part,
  CommaSeparated<3, Trim<Part>>
>
;
type CheckWeekDaysPart<Part extends string> = CheckArray<Part,
  CommaSeparated<4, Trim<Part>>
>;

type CRON<Value> =
  Split<Value> extends [infer Minute extends string, infer Hour extends string, infer DayOfMonth  extends string, infer Month extends string, infer DayOfWeek extends string] 
    ? `${CheckMinutesPart<Minute>}${Space}${CheckHoursPart<Hour>}${Space}${CheckDaysPart<DayOfMonth>}${Space}${CheckMonthsPart<Month>}${Space}${CheckWeekDaysPart<DayOfWeek>}`
    : never;

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
    expectTypeOf<CheckHoursPart<"0-23/2">>().not.toBeNever();
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
    expectTypeOf<CheckMonthsPart<"*">>().not.toBeNever();
    expectTypeOf<CheckMonthsPart<"0*">>().toBeNever();
    expectTypeOf<CheckMonthsPart<"0">>().toBeNever();
    expectTypeOf<CheckMonthsPart<"01">>().not.toBeNever();
    expectTypeOf<CheckMonthsPart<"12">>().not.toBeNever();
    expectTypeOf<CheckMonthsPart<"13">>().toBeNever();
    expectTypeOf<CheckMonthsPart<"1,012">>().not.toBeNever();
    expectTypeOf<CheckMonthsPart<"0,12">>().toBeNever();
    expectTypeOf<CheckMonthsPart<"12,13">>().toBeNever();
  });

  it("should check week days part", () => {
    expectTypeOf<CheckWeekDaysPart<"*">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0*">>().toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"00">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"6">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"7">>().toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0,06">>().not.toBeNever();
    expectTypeOf<CheckWeekDaysPart<"0,7">>().toBeNever();
  });

  it("should check a whole cron", () => {
    expectTypeOf<CRON<"*">>().toBeNever();
    expectTypeOf<CRON<"* * * * *">>().not.toBeNever();
    expectTypeOf<CRON<"* *  *   * *">>().not.toBeNever();
    expectTypeOf<CRON<"*/10 * * * 3">>().not.toBeNever();
    expectTypeOf<CRON<"5 0 * 8 *">>().not.toBeNever();
    expectTypeOf<CRON<"0 22 * * 1-5">>().not.toBeNever();
  });
});

type Tete = CRON<"0 22 * * 1-5">

const verifyCron = <T>(cron: T): CRON<T> => cron as any;

const toto = verifyCron("* * * * *");

const validCron = <T>(cron: T): CRON<T> => {
  const toto = verifyCron(cron);
  return toto;
}
const toto2 = validCron("* * * * * 12");
