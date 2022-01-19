import { AnimationSampler } from "../AnimationSampler";
import { LerpVector } from "../interpolater/LerpVector";
import { LinearBaseSampler } from "./LinearBaseSampler";

// factor out into a base, which always accepts a linear sampler?
// from there: we could support pretty much everything!
export class LinearVectorSampler<T extends (Array<number> | Float32Array)> implements AnimationSampler<T> {
  private sampler: LinearBaseSampler<T>;
  constructor() {
    this.sampler = new LinearBaseSampler(LerpVector.interpolate, LerpVector.copy);
  }

  sample(time: number, out: T) {
    return this.sampler.sample(time, out);
  }

  insert(time: number, value: T) {
    return this.sampler.insert(time, value);
  }

  delete(index: number) {
    return this.sampler.delete(index);
  }

  getKeyframeList() {
    return this.sampler.getKeyframeList();
  }
}