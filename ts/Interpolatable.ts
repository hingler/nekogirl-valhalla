/**
 * Basic interface for components which can be interpolated.
 */
export interface Interpolatable<T> {
  // the data stored in this interpolatable.
  readonly data: any;

  /**
   * Performs an interpolation from this Interpolatable's current value towards `b`,
   * at `time` bounded from 0 - 1.
   * 
   * @param b - the value we interpolate towards.
   * @param time - the time [0 - 1] for our interpolation.
   * 
   * @returns the result of the operation.
   */
  interpolate(b: Interpolatable<T>, time: number) : T;
}