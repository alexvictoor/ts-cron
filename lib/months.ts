import { RemoveLeadingZeros } from "./leading-zeros";

type AllowedMonthValues =
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

export type Months<Value extends string> =
  RemoveLeadingZeros<Value> extends AllowedMonthValues ? Value : never;
