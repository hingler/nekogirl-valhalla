import { AnimationSampler } from "../AnimationSampler";
import { KeyframeList } from "../KeyframeList";

// factor out into a base, which always accepts a linear sampler?
// from there: we could support pretty much everything!
export class LinearBaseSampler<T> implements AnimationSampler<T> {
  private keyframeList: KeyframeList<T>;
  private interpMethod: <U extends T>(out: T, a: U, b: U, time: number) => T;
  private copyMethod: <U extends T>(out: T, input: U) => T;
  constructor(customInterpolationMethod: (out: T, a: T, b: T, time: number) => T, copyMethod: (out: T, input: T) => T) {
    this.keyframeList = new KeyframeList();
    this.interpMethod = customInterpolationMethod;
    this.copyMethod = copyMethod;
  }

  sample(time: number, out: T) {
    if (this.keyframeList.length <= 0) {
      return null;
    } else if (this.keyframeList.length === 1) {
      const val = this.keyframeList.getKeyframe(0);
      out = this.copyMethod(out, val.value);
    } else {
      let i : number;
      let res : T;
      for (i = 0; i < this.keyframeList.length; i++) {
        if (this.keyframeList.getKeyframe(i).time > time) {
          break;
        }
      }

      if (i === 0 || i === this.keyframeList.length) {
        res = this.keyframeList.getKeyframe(Math.max(i - 1, 0)).value;
        out = this.copyMethod(out, res);
      } else {
        // interpolate
        const keyFloor = this.keyframeList.getKeyframe(i - 1);
        const keyCeil = this.keyframeList.getKeyframe(i);
        const localTime = (time - keyFloor.time) / (keyCeil.time - keyFloor.time);
        out = this.interpMethod(out, keyFloor.value, keyCeil.value, localTime);
      }
    }

    return out;
  }

  insert(time: number, value: T) {
    return this.keyframeList.insert(time, value);
  }

  delete(index: number) {
    return this.keyframeList.deleteKeyframe(index);
  }

  getKeyframeList() {
    return this.keyframeList.getKeyframes();
  }
}