import { mat4, ReadonlyVec3, vec3 } from "gl-matrix";
import { TransformableNestable } from "./TransformableNestable";

export class TransformableNestableComponent<T extends TransformableNestable<T>> {
  private dirty : boolean;
  private transformCache : mat4;
  private self : T;
  // no way to fetch invalidation methods -- who cares!?
  constructor(self: T) {
    this.dirty = true;
    this.transformCache = mat4.create();
    this.self = self;
  }

  getGlobalPosition() {
    let posLocal = vec3.zero(vec3.create());
    vec3.transformMat4(posLocal, posLocal, this.getTransformationMatrix());
    return posLocal;
  }

  lookAt(x: number | ReadonlyVec3, y?: number, z?: number) {
    let dirVector : vec3 = (typeof x === "number" ? vec3.fromValues(x, y, z) : vec3.copy(vec3.create(), x));
    let pos = this.getGlobalPosition();
    // account for own offset: vector from camera to dest
    vec3.sub(dirVector, dirVector, pos);
    let dir = vec3.create();
    vec3.normalize(dir, dirVector);
    let theta = Math.PI + Math.atan2(dir[0], dir[2]);
    let phi : number;
    let phi_denom = Math.sqrt(dir[0] * dir[0] + dir[2] * dir[2]);
    if (phi_denom === 0 || phi_denom === NaN) {
      phi = 0;
    } else {
      phi = Math.atan(dir[1] / phi_denom);
    }

    this.self.setRotationEuler(phi * (180 / Math.PI), theta * (180 / Math.PI), 0);
  }

  invalidateTransformCache() {
    this.dirty = true;
  }

  getTransformationMatrix()  {
    if (this.dirty) {
      const res = this.transformCache;
      const that = this.self;
      mat4.fromRotationTranslationScale(res, that.getRotation(), that.getPosition(), that.getScale());

      if (that.getParent() !== null) {
        mat4.mul(res, that.getParent().getTransformationMatrix(), res);
      }

      this.dirty = false;
    }

    return this.transformCache;
  }
}