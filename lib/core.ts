import { Greater } from "./comparison";
import { Days } from "./days";
import { RemoveEveryPart } from "./every";
import { Hours } from "./hours";
import { ToNumber } from "./integer";
import { Minutes } from "./minutes";
import { Months } from "./months";
import { StandardWeekDays, WeekDays } from "./week-days";

export type Space = " ";

type Trim<Input> = Input extends `${Space}${infer LeftTrimmed}`
  ? Trim<LeftTrimmed>
  : Input extends `${infer RightTrimmed}${Space}`
  ? Trim<RightTrimmed>
  : Input;

export type Split<
  Input,
  Separator extends string
> = Input extends `${infer Left}${Separator}${infer Right}`
  ? [...Split<Trim<Left>, Separator>, ...Split<Trim<Right>, Separator>]
  : [Trim<Input>];


const SECONDS = 0;  
const MINUTES = 0;  
const HOURS = 1;  
const DAYS = 2;  
const STANDARD_MONTHS = 3;  
const STANDARD_WEEKDAYS = 4;  
const WEEKDAYS = 5;  

type UnitArray<Value extends string> = [
  Minutes<Value>,
  Hours<Value>,
  Days<Value>,
  Months<Value>,
  StandardWeekDays<Value>,
  WeekDays<Value>
];
type UnitType<Value extends string, UnitIndex extends number> = UnitArray<Value>[UnitIndex];

type ValidTupple<Value> = Value extends [number, number] ? Value : never;
type ParseTupple<Value extends string> = Value extends `${number}-${number}`
  ? Value extends `${infer Start}-${infer End}`
    ? ValidTupple<[ToNumber<Start>, ToNumber<End>]>
    : never
  : Value;

type Range<
  Value extends string,
  UnitIndex extends number
> = ParseTupple<Value> extends [
  infer Start extends number,
  infer End extends number
]
  ? Greater<Start, End> extends true
    ? never
    : CheckArray<
        Value,
        [UnitType<`${Start}`, UnitIndex>, UnitType<`${End}`, UnitIndex>]
      >
  : UnitType<Value, UnitIndex>;

type ComponentTypeWithoutEvery<
  Value extends string,
  UnitIndex extends number
> = Value extends "*" ? "*" : Range<Value, UnitIndex>;
type ComponentType<
  Value extends string,
  UnitIndex extends number
> = ComponentTypeWithoutEvery<RemoveEveryPart<Value>, UnitIndex>;

type CommaSeparated<
  Index extends number,
  Values extends string
> = Values extends `${infer Value},${infer Rest}`
  ? [ComponentType<Value, Index>, ...CommaSeparated<Index, Rest>]
  : [ComponentType<Values, Index>];

type CheckArray<
  RawValues extends string,
  Values extends Array<any>
> = Values extends [infer First, ...infer Rest]
  ? First extends never
    ? never
    : CheckArray<RawValues, Rest>
  : RawValues;

export type CheckSecondsPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof SECONDS, Trim<Part>>
>;
export type CheckMinutesPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof MINUTES, Trim<Part>>
>;

export type CheckHoursPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof HOURS, Trim<Part>>
>;

export type CheckDaysPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof DAYS, Trim<Part>>
>;

export type CheckStandardMonthsPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof STANDARD_MONTHS, Trim<Part>>
>;

export type CheckStandardWeekDaysPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof STANDARD_WEEKDAYS, Trim<Part>>
>;

export type CheckWeekDaysPart<Part extends string> = CheckArray<
  Part,
  CommaSeparated<typeof WEEKDAYS, Trim<Part>>
>;
