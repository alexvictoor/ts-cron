// Code by Mieszko Sabo
// from https://softwaremill.com/implementing-advanced-type-level-arithmetic-in-typescript-part-2/

type isShorter<
  A extends string,
  B extends String
> = A extends `${infer Head}${infer Rest}`
  ? B extends `${infer Head2}${infer Rest2}`
    ? isShorter<Rest, Rest2>
    : false
  : B extends `${infer Head2}${infer Rest2}`
  ? true
  : false;

type GTTable = [
  ["=", "<", "<", "<", "<", "<", "<", "<", "<", "<"],
  [">", "=", "<", "<", "<", "<", "<", "<", "<", "<"],
  [">", ">", "=", "<", "<", "<", "<", "<", "<", "<"],
  [">", ">", ">", "=", "<", "<", "<", "<", "<", "<"],
  [">", ">", ">", ">", "=", "<", "<", "<", "<", "<"],
  [">", ">", ">", ">", ">", "=", "<", "<", "<", "<"],
  [">", ">", ">", ">", ">", ">", "=", "<", "<", "<"],
  [">", ">", ">", ">", ">", ">", ">", "=", "<", "<"],
  [">", ">", ">", ">", ">", ">", ">", ">", "=", "<"],
  [">", ">", ">", ">", ">", ">", ">", ">", ">", "="]
];

type GTSameLength<
  A extends string,
  B extends string
> = A extends `${infer DigitA extends number}${infer RestA}`
  ? B extends `${infer DigitB extends number}${infer RestB}`
    ? GTTable[DigitA][DigitB] extends ">"
      ? true
      : GTTable[DigitA][DigitB] extends "<"
      ? false
      : GTSameLength<RestA, RestB>
    : false
  : false;

type InternalGT<A extends string, B extends string> = isShorter<
  A,
  B
> extends true
  ? false
  : isShorter<B, A> extends true
  ? true
  : GTSameLength<A, B>;

export type Greater<A extends number, B extends number> = InternalGT<
  `${A}`,
  `${B}`
>;