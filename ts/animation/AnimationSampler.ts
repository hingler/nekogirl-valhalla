import { ReadonlyAnimationKeyframe } from "./AnimationKeyframe";

export interface AnimationSampler<T> {
  /**
   * Samples this AnimationSampler at time `time`.
   * @param time - the time, in seconds, which we want to sample at.
   * @param out - output variable for this sampler -- populated if relevant (ex not for numbers)
   * @returns out, or the value at the sampled time.
   */
  sample(time: number, out: T) : T;

  /**
   * Inserts a keyframe into this sampler.
   * @param time - the time, in seconds, where we wish to insert our keyframe.
   * @param value - the value associated with this keyframe.
   * @returns an instance of T representing the old keyframe value, if a keyframe was already
   *          present at this time.
   *          Otherwise, returns an undefined.
   */
  insert(time: number, value: T) : T | undefined;

  /**
   * Deletes a keyframe at a given index.
   * @param index - the index which we wish to delete.
   */
  delete(index: number) : T | null;

  /**
   * @returns a readonly list of all stored keyframes.
   */
  getKeyframeList() : ReadonlyArray<ReadonlyAnimationKeyframe<T>>;
}