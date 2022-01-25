import { quat } from "gl-matrix";
import { AnimationSampler } from "../AnimationSampler";
import { LinearBaseSampler } from "./LinearBaseSampler";
import { LinearVectorSampler } from "./LinearVectorSampler";

export class LinearQuatSampler implements AnimationSampler<quat> {
  private engine: LinearBaseSampler<quat>;

  constructor() {
    this.engine = new LinearBaseSampler<quat>(quat.slerp, quat.copy);
  }

  sample(time: number, out: quat) {
    return this.engine.sample(time, out);
  }

  insert(time: number, value: quat) {
    return this.engine.insert(time, value);
  }

  delete(index: number) {
    return this.engine.delete(index);
  }

  getKeyframeList() {
    return this.engine.getKeyframeList();
  }
}