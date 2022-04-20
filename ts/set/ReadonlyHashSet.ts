export interface ReadonlyHashSet<T> {
  // number of elements stored in this hash set
  readonly size : number;

  // true if the key is in this hash set, false otherwise
  has(key: T) : boolean;
}