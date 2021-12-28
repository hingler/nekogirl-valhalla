import { Hashable } from "../Hashable";
import { Pair } from "./Pair";

const MAX_EPSILON = 2.5;

// todo: invent a funny name for my own mini "std" where i can place some of these tools

class HashMapIterator<T extends Hashable<T>, U> implements Iterator<Pair<T, U>> {
  private tableIterator: Iterator<Array<Pair<T, U>>>;
  private subtableIterator: Iterator<Pair<T, U>>;
  private table: Array<Array<Pair<T, U>>>;
  constructor(table: Array<Array<Pair<T, U>>>) {
    this.table = table;
    this.tableIterator = this.table[Symbol.iterator]();
    // would be neat if we had some global flag to track hash table modifications
    this.updateSubtableIterator();
  }

  private updateSubtableIterator() {
    let subtable : IteratorResult<Array<Pair<T, U>>, Array<Pair<T, U>>>;
    do {
      subtable = this.tableIterator.next();
    } while ((!subtable.value || subtable.value.length <= 0) && !subtable.done);

    if (subtable.done) {
      // indicate that iteration is done
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
      };
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

export class HashMap<T extends Hashable<T>, U> implements Iterable<Pair<T, U>> {
  private hashTable: Array<Array<Pair<T, U>>>;
  private size_: number;

  /**
   * Creates a new HashMap.
   * @param mod - index size of hash table. defaults to 16.
   */
  constructor(mod?: number) {
    const size = (mod ? mod : 15);
    this.hashTable = new Array(size);
    this.size_ = 0;
  }

  [Symbol.iterator]() : Iterator<Pair<T, U>> {
    return new HashMapIterator(this.hashTable);
  }


  /**
   * Inserts a new pair into this map.
   * @param key - hashable key
   * @param value - associated value
   * @returns - the previously stored value under this key, if one exists
   */
  put(key: T, value: U) : U {
    if (this.size_ / this.hashTable.length > MAX_EPSILON) {
      this.rehash();
    }

    const res : Pair<T, U> = {
      "key": key.copy(),
      "value": value
    };

    return this.put_nocopy(res);
  }

  private put_nocopy(pair: Pair<T, U>) {
    const hash = pair.key.hash();
    const index = hash % this.hashTable.length;

    if (!this.hashTable[index]) {
      this.hashTable[index] = [];
    }

    const dest = this.hashTable[index];

    for (let i = 0; i < dest.length; i++) {
      const test = dest[i];
      if (test.key.equals(pair.key)) {
        // duplicate encountered
        const oldVal = dest[i];
        dest[i] = pair;
        return oldVal.value;
      }
    }

    // no dupe, insert straight
    dest.push(pair);
    this.size_++;
    return null;
  }

  /**
   * Fetches the value associated with a stored key.
   * @param key - The key we wish to search on.
   * @returns the value associated with this key, if one exists -- otherwise, null.
   */
  get(key: T) : U | null {
    const index = key.hash() % this.hashTable.length;
    const dest = this.hashTable[index];
    if (!dest) {
      return null;
    }

    for (let pair of dest) {
      if (key.equals(pair.key)) {
        return pair.value;
      }
    }

    return null;
  }

  /**
   * 
   * @param key - search key
   * @returns true if the key is present in this map, false otherwise.
   */
  has(key: T) : boolean {
    const index = key.hash() % this.hashTable.length;
    const dest = this.hashTable[index];
    if (!dest) {
      return false;
    }

    for (let pair of dest) {
      if (key.equals(pair.key)) {
        return true;
      }
    }

    return false;
  }

  /**
   * @returns the number of elements stored in this map.
   */
  get size() {
    return this.size_;
  }

  private rehash() {
    const oldTable = this.hashTable;
    this.hashTable = new Array(Math.round(oldTable.length * MAX_EPSILON));
    this.size_ = 0;
    for (let chain of oldTable) {
      for (let pair of chain) {
        // don't do this? we don't have to worry about collisions so we could probably
        // save some performance
        this.put(pair.key, pair.value);
      }
    }
  }
}
