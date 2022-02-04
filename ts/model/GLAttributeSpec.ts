import { DataType } from "./DataType";

export interface ReadonlyGLAttributeSpec {
  readonly components: number,
  readonly type: DataType,
  readonly count: number,
  readonly offset: number,
  readonly stride: number
}

export interface GLAttributeSpec extends ReadonlyGLAttributeSpec {
  components: number,
  type: DataType,
  count: number,
  offset: number,
  stride: number
};