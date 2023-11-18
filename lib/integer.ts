import { RemoveLeadingZeros } from "./leading-zeros";

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type IsInteger<Value extends string> = Value extends `${Digit}`
  ? true
  : Value extends `${Digit}${infer Rest}`
  ? IsInteger<Rest>
  : false;

export type ToNumber<Value extends string> = IsInteger<Value> extends true
  ? RemoveLeadingZeros<Value> extends `${infer Result extends number}`
    ? Result
    : never
  : never;
