import { RemoveLeadingZeros } from "./leading-zeros";

type AllowedStandardMonthValues =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

  type AllowedMonthValues = AllowedStandardMonthValues
  | "jan"
  | "fev"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

export type StandardMonths<Value extends string> =
  RemoveLeadingZeros<Value> extends AllowedStandardMonthValues ? Value : never;

export type Months<Value extends string> =
  Lowercase<RemoveLeadingZeros<Value>> extends AllowedMonthValues ? Value : never;



type Toto = Lowercase<'Jan'>