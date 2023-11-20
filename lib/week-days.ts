import { RemoveLeadingZeros } from "./leading-zeros";

type AllowedStandardWeekDayValues = "0" | "1" | "2" | "3" | "4" | "5" | "6";

type AllowedWeekDayValues = AllowedStandardWeekDayValues | "7" | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type StandardWeekDays<Value extends string> =
  RemoveLeadingZeros<Value> extends AllowedStandardWeekDayValues
    ? Value
    : never;

export type WeekDays<Value extends string> =
  Lowercase<RemoveLeadingZeros<Value>> extends AllowedWeekDayValues
    ? Value
    : never;
