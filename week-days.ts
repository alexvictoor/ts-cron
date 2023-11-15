import { RemoveLeadingZeros } from "./leading-zeros";

type AllowedWeekDayValues =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6";

export type WeekDays<Value> =
  RemoveLeadingZeros<Value> extends AllowedWeekDayValues ? Value : never;
