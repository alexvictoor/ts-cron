import { RemoveLeadingZeros } from "./leading-zeros";

type AllowedStandardWeekDayValues = "0" | "1" | "2" | "3" | "4" | "5" | "6";

type AllowedWeekDayValues = AllowedStandardWeekDayValues | "7";

export type StandardWeekDays<Value extends string> =
  RemoveLeadingZeros<Value> extends AllowedStandardWeekDayValues
    ? Value
    : never;

export type WeekDays<Value extends string> =
  RemoveLeadingZeros<Value> extends AllowedWeekDayValues
    ? Value
    : never;
