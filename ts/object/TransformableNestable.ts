import { ReadonlyMat4, vec3 } from "gl-matrix";
import { Nestable } from "./Nestable";
import { Transformable } from "./Transformable";
import { TransformableBase } from "./TransformableBase";

export interface TransformableNestable<T extends TransformableNestable<T>> extends Transformable, Nestable<T> {
  getGlobalPosition() : vec3;
  lookAt(x: number | vec3, y?: number, z?: number) : void;
  getTransformationMatrix() : ReadonlyMat4;
}