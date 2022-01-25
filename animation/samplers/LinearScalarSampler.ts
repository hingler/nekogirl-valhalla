import { ReadonlyAnimationKeyframe } from "../AnimationKeyframe";
import { AnimationSampler } from "../AnimationSampler";
import { LerpScalar } from "../interpolater/LerpScalar";
import { LinearBaseSampler } from "./LinearBaseSampler";

export class LinearScalarSampler implements AnimationSampler<number> {
  private engine: LinearBaseSampler<number>;

  constructor() {
    this.engine = new LinearBaseSampler<number>(LerpScalar.interpolate, LerpScalar.copy);
  }

  sample(time: number) {
    return this.engine.sample(time, -1);
  }

  insert(time: number, value: number) {
    return this.engine.insert(time, value);
  }

  delete(index: number) {
    return this.engine.delete(index);
  }

  getKeyframeList() {
    return this.engine.getKeyframeList();
  }
}