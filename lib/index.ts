import {
  CheckDaysPart,
  CheckHoursPart,
  CheckMinutesPart,
  CheckMonthsPart,
  CheckStandardMonthsPart,
  CheckStandardWeekDaysPart,
  CheckWeekDaysPart,
  Space,
  Split,
} from "./core";

export type StandardCRON<Value extends string> = Split<Value, Space> extends [
  infer Minute extends string,
  infer Hour extends string,
  infer DayOfMonth extends string,
  infer Month extends string,
  infer DayOfWeek extends string
]
  ? `${CheckMinutesPart<Minute>}${Space}${CheckHoursPart<Hour>}${Space}${CheckDaysPart<DayOfMonth>}${Space}${CheckStandardMonthsPart<Month>}${Space}${CheckStandardWeekDaysPart<DayOfWeek>}`
  : never;

export type CRON<Value extends string> = StandardCRON<Value> extends never
  ? Split<Value, Space> extends [
      infer Seconde extends string,
      infer Minute extends string,
      infer Hour extends string,
      infer DayOfMonth extends string,
      infer Month extends string,
      infer DayOfWeek extends string
    ]
    ? `${CheckMinutesPart<Seconde>}${Space}${CheckMinutesPart<Minute>}${Space}${CheckHoursPart<Hour>}${Space}${CheckDaysPart<DayOfMonth>}${Space}${CheckMonthsPart<Month>}${Space}${CheckWeekDaysPart<DayOfWeek>}`
    : Split<Value, Space> extends [
      infer Minute extends string,
      infer Hour extends string,
      infer DayOfMonth extends string,
      infer Month extends string,
      infer DayOfWeek extends string
    ]
    ? `${CheckMinutesPart<Minute>}${Space}${CheckHoursPart<Hour>}${Space}${CheckDaysPart<DayOfMonth>}${Space}${CheckMonthsPart<Month>}${Space}${CheckWeekDaysPart<DayOfWeek>}`
    : never
  : StandardCRON<Value>;

export const validStandardCronExpression = <T extends string>(
  cron: StandardCRON<T> extends never ? never : T
): T => cron;

export const validCronExpression = <T extends string>(
  cron: CRON<T> extends never ? never : T
): T => cron;
