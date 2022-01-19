import { AnimationKeyframe, ReadonlyAnimationKeyframe } from "./AnimationKeyframe";
// samplers will contain keyframelists
// will probably use curves to store t values, then interpolate based on them
export class KeyframeList<T> {
  private keyframeList: Array<AnimationKeyframe<T>>;

  constructor() {
    this.keyframeList = [];
  }

  /**
   * Inserts a new keyframe into this sampler.
   * @param time - the time at which to place the keyframe.
   * @param data - the data to insert.
   * @returns an instance of T if an old keyframe overlapped with the insertion time, and was thus removed.
   *          otherwise, undefined.
   */
  insert(time: number, data: T) {
    for (let i = 0; i < this.keyframeList.length; i++) {
      // close enough to overlap
      if (Math.abs(this.keyframeList[i].time - time) < 0.0001) {
        const oldValue = this.keyframeList[i].value;
        this.keyframeList[i].value = data;
        return oldValue;
      }
    }

    this.keyframeList.push({ "time": time, value: data });
    this.keyframeList.sort((a, b) => a.time - b.time);
  }

  /**
   * @returns a list of all keyframes currently managed by this keyframe list.
   */
  getKeyframes() : ReadonlyArray<ReadonlyAnimationKeyframe<T>> {
    return this.keyframeList;
  }

  getKeyframe(index: number) : ReadonlyAnimationKeyframe<T> {
    if (this.keyframeList.length <= index || index < 0) {
      return null;
    }

    return this.keyframeList[index];
  }

  deleteKeyframe(index: number) {
    if (index >= 0 && index < this.keyframeList.length) {
      const res = this.keyframeList[index];
      this.keyframeList = this.keyframeList.splice(index, 1);
      return res.value;
    }

    return null;
  }

  get length() {
    return this.keyframeList.length;
  }
}

// samplers will wrap this
// and use their own curve algo to fit it

// actually would make sense to have a simple "interpolator" class
// then we could just plug in that interpolator to a generic thing and be good