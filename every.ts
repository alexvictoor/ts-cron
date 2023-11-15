import { IsInteger } from "./integer";

export type RemoveEveryPart<Value> =
  Value extends `${infer MainPart}/${infer EveryPart}`
    ? IsInteger<EveryPart> extends false
      ? never
      : EveryPart extends "0"
      ? never
      : MainPart
    : Value;
