export interface Hashable<T> {
  /**
   * @returns a unique hashcode which disambiguates this element.
   */ 
  hash() : number;
  
  /**
   *  Performs an equality check on another hashable object, returning true if the other is equal.
   *  @param other - other object concerned
   *  @returns true if the objects are equal - false otherwise.
   */ 
  equals<O extends Hashable<O>>(other: O) : boolean;

  /**
   * @returns a copy of the object.
   */
  copy() : T;
}
