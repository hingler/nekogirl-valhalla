/**
 * Simple keyframe interface.
 */
export interface AnimationKeyframe<T> {
  // time at which the keyframe is placed, in seconds.
  time: number;

  // value associated with this keyframe.
  value: T;
}

export interface ReadonlyAnimationKeyframe<T> {
  readonly time: number;
  readonly value: T;
}