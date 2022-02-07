// iterable
// update entries if pulled

import { NekoArray } from "../array/NekoArray";
import { RingArray } from "../array/RingArray";

export class LRUMap<K, V> {
  private keyList : NekoArray<K>;
  private capacity: number;
  private entries: Map<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.keyList = new RingArray(capacity);
    this.entries = new Map();
  }

  get size() {
    return this.keyList.length;
  }

  /**
   * Inserts a new entry into the LRUCache.
   * @param key - the key being inserted.
   * @param val - the value associated with that key.
   * @returns the last evicted value, if one was evicted.
   */
  insert(key: K, val: V) {
    // check if k is already in the keylist
    // if so, just update our value
    let index = 0;
    for (let k of this.keyList) {
      if (key === k) {
        this.entries.set(key, val);
        this.keyList.remove(index);
        // front is newest, back is oldest
        // move index back to front
        this.keyList.enqueue(key);
        return;
      }

      index++;
    }

    // not already present
    let ret : V = null;

    if (this.keyList.length >= this.capacity) {
      ret = this.evict();
    }

    this.keyList.enqueue(key);
    this.entries.set(key, val);

    return ret;
  }

  get(key: K) {
    if (this.entries.has(key)) {
      return this.entries.get(key);
    }

    return null;
  }

  has(key: K) {
    return this.entries.has(key);
  }

  /**
   * Evicts the oldest entry currently stored, and returns its value.
   */
  evict() {
    const outKey = this.keyList.pop();
    const res = this.entries.get(outKey);
    this.entries.delete(outKey);
    return res;
  }
};