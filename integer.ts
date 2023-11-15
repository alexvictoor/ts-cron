type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type IsInteger<Value> = Value extends `${Digit}`
  ? true
  : Value extends `${Digit}${infer Rest}`
  ? IsInteger<Rest>
  : false;
