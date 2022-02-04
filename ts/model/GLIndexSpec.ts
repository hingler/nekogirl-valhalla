import { ReadWriteBuffer } from "ts/buffer/ReadWriteBuffer";
import { DataType } from "./DataType";

export interface ReadonlyGLIndexSpec {
  readonly buffer: ReadWriteBuffer;
  readonly type: DataType;
  readonly count: number;
  readonly offset: number;
}

export interface GLIndexSpec extends ReadonlyGLIndexSpec {
  type: DataType;
  count: number;
  offset: number;
}