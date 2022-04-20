import { Hashable } from "../Hashable";
import { ReadonlyHashSet } from "./ReadonlyHashSet";

const MAX_EPSILON_SET = 2.0;

class HashSetIterator<T extends Hashable<T>> implements Iterator<T> {
  private tableIterator: Iterator<Array<T>>;
  private subtableIterator: Iterator<T>;
  private table: Array<Array<T>>;

  constructor(table: Array<Array<T>>) {
    this.table = table;
    this.tableIterator = this.table[Symbol.iterator]();
    this.updateSubtableIterator();
  }

  private updateSubtableIterator() {
    let subtable : IteratorResult<Array<T>, Array<T>>;
    do {
      subtable = this.tableIterator.next();
    } while ((!subtable.value || subtable.value.length <= 0) && !subtable.done);

    if (subtable.done) {
      this.subtableIterator = null;
    } else {
      this.subtableIterator = subtable.value[Symbol.iterator]();
    }
  }

  next() {
    if (this.subtableIterator === null) {
      return {
        done: true,
        value: null
      }
    }

    let res = this.subtableIterator.next();
    while (res.done && this.subtableIterator !== null) {
      this.updateSubtableIterator();
      if (this.subtableIterator !== null) {
        res = this.subtableIterator.next();
      }
    }

    return res;
  }
}

export class HashSet<T extends Hashable<T>> implements Iterable<T>, ReadonlyHashSet<T> {
  private hashTable: Array<Array<T>>;
  private size_: number;

  constructor(mod?: number) {
    const size = (mod ? mod : 15);
    this.hashTable = new Array(size);
    this.size_ = 0;
  }

  [Symbol.iterator]() {
    return new HashSetIterator(this.hashTable);
  }

  /**
   * Inserts a new element into this set.
   * @param key - hashable key.
   * @returns true if this value was already inside the set, false otherwise.
   */
  put(key: T) : boolean {
    if (this.size_ / this.hashTable.length > MAX_EPSILON_SET) {
      this.rehash();
    }

    const res = key.copy();
    return this.put_nocopy(res);
  }

  private put_nocopy(res: T) : boolean {
    const hash = res.hash();
    const index = hash % this.hashTable.length;

    if (!this.hashTable[index]) {
      this.hashTable[index] = [];
    }

    const dest = this.hashTable[index];
    
    for (let i = 0; i < dest.length; i++) {
      const test = dest[i];
      if (test.equals(res)) {
        dest[i] = res;
        return true;
      }
    }

    dest.push(res);
    this.size_++;
    return false;
  }

  has(key: T) {
    const index = key.hash() % this.hashTable.length;
    const dest = this.hashTable[index];
    if (!dest) {
      return false;
    }

    for (let ent of dest) {
      if (key.equals(ent)) {
        return true;
      }
    }

    return false;
  }

  get size() {
    return this.size_;
  }

  private rehash() {
    const oldTable = this.hashTable;
    this.hashTable = new Array(Math.round(oldTable.length * 4.0 + 1));
    this.size_ = 0;
    for (let chain of oldTable) {
      for (let key of chain) {
        // stored internally -- already a copy!
        this.put_nocopy(key);
      }
    }
  }
}