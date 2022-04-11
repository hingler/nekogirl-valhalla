import { IReadOnlyBuffer } from "./IReadOnlyBuffer";

export interface IReadWriteBuffer extends IReadOnlyBuffer {
  // DATAVIEW WRAPPERS
  setInt8(offset: number, value: number) : void;
  setUint8(offset: number, value: number) : void;
  setInt16(offset: number, value: number, littleEndian?: boolean) : void;
  setUint16(offset: number, value: number, littleEndian?: boolean) : void;
  setInt32(offset: number, value: number, littleEndian?: boolean) : void;
  setUint32(offset: number, value: number, littleEndian?: boolean) : void;
  setFloat32(offset: number, value: number, littleEndian?: boolean) : void;
  setFloatArray(offset: number, arr: ArrayLike<number>, littleEndian?: boolean) : void;

  // MEM REGION FETCH
  getRegionAsUint16Array(offset: number, length: number) : Uint16Array;
  getRegionAsFloat32Array(offset: number, length: number) : Float32Array;

  arrayBuffer() : ArrayBuffer;
  copy() : IReadWriteBuffer;
}