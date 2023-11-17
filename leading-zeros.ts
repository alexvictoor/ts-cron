
export type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `0${infer R}`
  ? RemoveLeadingZeros<R>
  : S;