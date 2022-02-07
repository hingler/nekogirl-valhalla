// swagout
export interface NekoArray<T> {
  /**
   * The number of elements stored in the array.
   */
  readonly length : number;

  /**
   * @returns an iterator on this.
   */
  [Symbol.iterator]() : Iterator<T>;

  /**
   * Pushes a new item onto the end of an array.
   * @param item - new item.
   */
  push(item: T) : void;
  
  /**
   * Pops the last item off the array, and ...
   * @returns the popped item.
   */
  pop() : T; 

  /**
   * Queues a new item onto the front of the array.
   * @param item - the new item.
   */
  enqueue(item: T) : void;

  /**
   * Removes the first item from the array, and ...
   * @returns the removed item.
   */
  dequeue() : T;

  /**
   * @param ind - the index desired. 
   * @returns the value at that index.
   */
  get(ind: number) : T;

  /**
   *  @param ind - the index being modified.
   *  @param val - the value to insert at that index.
   */
  set(ind: number, val: T) : void;

  /**
   * Removes an element at a given index and returns the value removed.
   * @param ind - ind to remove.
   * 
   * behavior is undefined when ind is out of bounds -- some impls may return null
   * while others may throw an error.
   */
  remove(ind: number) : T;
}