import Cell from "../data/cell";
import Grid from "../data/grid";

class MazeData implements Grid {
  [n: number]: import("../data/cell").default[];
  length: number;
  toString(): string {
    throw new Error("Method not implemented.");
  }
  toLocaleString(locales?: unknown, options?: unknown): string {
    throw new Error("Method not implemented.");
  }
  pop(): Cell[] | undefined {
    throw new Error("Method not implemented.");
  }
  push(...items: Cell[][]): number {
    throw new Error("Method not implemented.");
  }
  concat(...items: unknown[]): import("../data/cell").default[][] {
    throw new Error("Method not implemented.");
  }
  join(separator?: string): string {
    throw new Error("Method not implemented.");
  }
  reverse(): Cell[][] {
    throw new Error("Method not implemented.");
  }
  shift(): Cell[] | undefined {
    throw new Error("Method not implemented.");
  }
  slice(start?: number, end?: number): Cell[][] {
    throw new Error("Method not implemented.");
  }
  sort(compareFn?: ((a: Cell[], b: Cell[]) => number) | undefined): this {
    throw new Error("Method not implemented.");
  }
  splice(
    start: unknown,
    deleteCount?: unknown,
    ...rest: unknown[]
  ): import("../data/cell").default[][] {
    throw new Error("Method not implemented.");
  }
  unshift(...items: Cell[][]): number {
    throw new Error("Method not implemented.");
  }
  indexOf(searchElement: Cell[], fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  lastIndexOf(searchElement: Cell[], fromIndex?: number): number {
    throw new Error("Method not implemented.");
  }
  every(predicate: unknown, thisArg?: unknown): boolean {
    throw new Error("Method not implemented.");
  }
  some(
    predicate: (value: Cell[], index: number, array: Cell[][]) => unknown,
    thisArg?: any,
  ): boolean {
    throw new Error("Method not implemented.");
  }
  forEach(
    callbackfn: (value: Cell[], index: number, array: Cell[][]) => void,
    thisArg?: any,
  ): void {
    throw new Error("Method not implemented.");
  }
  map<U>(
    callbackfn: (value: Cell[], index: number, array: Cell[][]) => U,
    thisArg?: any,
  ): U[] {
    throw new Error("Method not implemented.");
  }
  filter(
    predicate: unknown,
    thisArg?: unknown,
  ): import("../data/cell").default[][] | S[] {
    throw new Error("Method not implemented.");
  }
  reduce(
    callbackfn: unknown,
    initialValue?: unknown,
  ): import("../data/cell").default[] | U {
    throw new Error("Method not implemented.");
  }
  reduceRight(
    callbackfn: unknown,
    initialValue?: unknown,
  ): import("../data/cell").default[] | U {
    throw new Error("Method not implemented.");
  }
  find(
    predicate: unknown,
    thisArg?: unknown,
  ): import("../data/cell").default[] | S | undefined {
    throw new Error("Method not implemented.");
  }
  findIndex(
    predicate: (value: Cell[], index: number, obj: Cell[][]) => unknown,
    thisArg?: any,
  ): number {
    throw new Error("Method not implemented.");
  }
  fill(value: Cell[], start?: number, end?: number): this {
    throw new Error("Method not implemented.");
  }
  copyWithin(target: number, start: number, end?: number): this {
    throw new Error("Method not implemented.");
  }
  entries(): ArrayIterator<[number, Cell[]]> {
    throw new Error("Method not implemented.");
  }
  keys(): ArrayIterator<number> {
    throw new Error("Method not implemented.");
  }
  values(): ArrayIterator<Cell[]> {
    throw new Error("Method not implemented.");
  }
  includes(searchElement: Cell[], fromIndex?: number): boolean {
    throw new Error("Method not implemented.");
  }
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: Cell[],
      index: number,
      array: Cell[][],
    ) => U | readonly U[],
    thisArg?: This | undefined,
  ): U[] {
    throw new Error("Method not implemented.");
  }
  flat<A, D extends number = 1>(
    this: A,
    depth?: D | undefined,
  ): FlatArray<A, D>[] {
    throw new Error("Method not implemented.");
  }
  [Symbol.iterator](): ArrayIterator<Cell[]> {
    throw new Error("Method not implemented.");
  }
  [Symbol.unscopables]: {
    [x: number]: boolean | undefined;
    length?: boolean | undefined;
    toString?: boolean | undefined;
    toLocaleString?: boolean | undefined;
    pop?: boolean | undefined;
    push?: boolean | undefined;
    concat?: boolean | undefined;
    join?: boolean | undefined;
    reverse?: boolean | undefined;
    shift?: boolean | undefined;
    slice?: boolean | undefined;
    sort?: boolean | undefined;
    splice?: boolean | undefined;
    unshift?: boolean | undefined;
    indexOf?: boolean | undefined;
    lastIndexOf?: boolean | undefined;
    every?: boolean | undefined;
    some?: boolean | undefined;
    forEach?: boolean | undefined;
    map?: boolean | undefined;
    filter?: boolean | undefined;
    reduce?: boolean | undefined;
    reduceRight?: boolean | undefined;
    find?: boolean | undefined;
    findIndex?: boolean | undefined;
    fill?: boolean | undefined;
    copyWithin?: boolean | undefined;
    entries?: boolean | undefined;
    keys?: boolean | undefined;
    values?: boolean | undefined;
    includes?: boolean | undefined;
    flatMap?: boolean | undefined;
    flat?: boolean | undefined;
    [Symbol.iterator]?: boolean | undefined;
    readonly [Symbol.unscopables]?: boolean | undefined;
  };
}
