import { NekoArray } from "./NekoArray";

class RingArrayIterator<T> implements Iterator<T> {
  private arr: RingArray<T>;
  private ind: number;
  constructor(arr: RingArray<T>) {
    this.arr = arr;
    this.ind = 0;
  }

  next() {
    if (this.ind >= this.arr.length) {
      return {
        value: null,
        done: true
      };
    } else {
      const res = this.arr.get(this.ind++);
      return {
        value: res,
        done: false
      };
    }
  }
}

export class RingArray<T> implements NekoArray<T> {
  private elements: Array<T>;
  private size: number;
  private offset: number;
  readonly capacity: number;

  constructor(len: number) {
    this.elements = new Array(len);
    this.capacity = len;
    this.size = 0;
    this.offset = 0;
  }

  get length() {
    return this.size;
  }

  [Symbol.iterator]() {
    return new RingArrayIterator(this);
  }

  /**
   * Pushes the passed item onto the end of the array.
   */
  push(item: T) {
    if (this.size >= this.elements.length) {
      throw Error("Exceeded ringbuffer capacity");
    }

    this.elements[(this.offset + this.size++) % this.elements.length] = item;
  }

  /**
   * Pops the last item off the array.
   */
  pop() : T {
    if (this.size <= 0) {
      return undefined;
    }

    return this.elements[(this.offset + --this.size) % this.elements.length];
  }

  /**
   *  Prepends the passed item.
   */
  enqueue(item: T) {
    if (this.size >= this.elements.length) {
      throw Error("Exceeded Ringbuffer Capacity!");
    }

    // scoot back 1
    this.offset = (this.offset + this.elements.length - 1) % this.elements.length;
    this.size++;
    this.elements[this.offset] = item;
  }

  /**
   * Removes and returns the first item in the array.
   */
  dequeue() : T {
    const res = this.elements[this.offset];
    this.offset = (this.offset + 1) % this.elements.length;
    this.size--;
    return res;
  }

  get(ind: number) {
    if (ind >= this.size || ind < 0) {
      return undefined;
    }

    return this.elements[(this.offset + ind) % this.elements.length];
  }

  set(ind: number, val: T) {
    if (ind >= this.size || ind < 0) {
      throw Error("Attempted to set value which is OOB");
    }

    this.elements[(this.offset + ind) % this.elements.length] = val;
  }

  remove(ind: number) : T {
    if (ind < 0 || ind >= this.size) {
      return null;
    }

    if (ind * 2 < this.size) {
      return this.removeSlideStart(ind);
    } else {
      return this.removeSlideEnd(ind);
    }
  }

  private removeSlideStart(ind: number) : T {
    const res = this.elements[ind];
    for (let i = ind; i > 0; i--) {
      this.elements[i] = this.elements[i - 1];
    }

    this.size--;
    this.offset++;

    return res;
  }

  private removeSlideEnd(ind: number) : T {
    const res = this.elements[ind];
    for (let i = ind + 1; i < this.size; i++) {
      this.elements[i - 1] = this.elements[i];
    }

    this.size--;
    return res;
  }

  clear() {
    this.offset = 0;
    this.size = 0;
  }
}