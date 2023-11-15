import { RemoveLeadingZeros } from "./leading-zeros";

// Array.from({ length: 24}).map((_, index) => `'${index}'`).join(' | ')
type AllowedHourValues =
  | "0"
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
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23";

  export type Hours<Value> = RemoveLeadingZeros<Value> extends AllowedHourValues
  ? Value
  : never;

  type Toto = RemoveLeadingZeros<'0*'>