import { Greater } from "./comparison";
import { Days } from "./days";
import { RemoveEveryPart } from "./every";
import { Hours } from "./hours";
import { Minutes } from "./minutes";
import { Months } from "./months";
import { WeekDays } from "./week-days";

export type Space = " ";

type Trim<Input> = Input extends `${Space}${infer LeftTrimmed}`
  ? Trim<LeftTrimmed>
  : Input extends `${infer RightTrimmed}${Space}`
  ? Trim<RightTrimmed>
  : Input;


export type Split<Input, Separator extends string> = Input extends `${infer Left}${Separator}${infer Right}`
  ? [...Split<Trim<Left>, Separator>, ...Split<Trim<Right>, Separator>]
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

export type CheckMinutesPart<Part extends string> = CheckArray<Part,
  CommaSeparated<0, Trim<Part>>
>;

export type CheckHoursPart<Part extends string> = CheckArray<Part,
  CommaSeparated<1, Trim<Part>>
>;

export type CheckDaysPart<Part extends string> = CheckArray<Part,
  CommaSeparated<2, Trim<Part>>
>;

export type CheckMonthsPart<Part extends string> = CheckArray<Part,
  CommaSeparated<3, Trim<Part>>
>
;
export type CheckWeekDaysPart<Part extends string> = CheckArray<Part,
  CommaSeparated<4, Trim<Part>>
>;
