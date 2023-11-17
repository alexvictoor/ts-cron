import {
  CheckDaysPart,
  CheckHoursPart,
  CheckMinutesPart,
  CheckMonthsPart,
  CheckWeekDaysPart,
  Space,
  Split,
} from "./core";

export type CRON<Value> = Split<Value, Space> extends [
  infer Minute extends string,
  infer Hour extends string,
  infer DayOfMonth extends string,
  infer Month extends string,
  infer DayOfWeek extends string
]
  ? `${CheckMinutesPart<Minute>}${Space}${CheckHoursPart<Hour>}${Space}${CheckDaysPart<DayOfMonth>}${Space}${CheckMonthsPart<Month>}${Space}${CheckWeekDaysPart<DayOfWeek>}`
  : never;

export const verifyCron = <T extends string>(cron: T & CRON<T>): T => cron;
