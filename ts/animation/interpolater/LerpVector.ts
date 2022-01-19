import { vec3, vec4 } from "gl-matrix";
import { Interpolatable } from "../../Interpolatable";

export class LerpVector {
  static interpolate<T extends Array<number> | Float32Array,
                     U extends Array<number> | Float32Array>
  (out: T, a: U, b: U, time: number) {
    const aTime = 1.0 - time;
    for (let i = 0; i < a.length; i++) {
      out[i] = a[i] * aTime + b[i] * time;
    }

    return out;
  }

  static copy<T extends Array<number> | Float32Array,
              U extends Array<number> | Float32Array>
  (out: T, input: U) {
    for (let i = 0; i < out.length; i++) {
      out[i] = input[i];
    }

    return out;
  }
}