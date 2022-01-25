export interface IReadOnlyBuffer {
  // dataview wrappers
  getInt8(offset: number) : number;
  getUint8(offset: number) : number;
  getInt16(offset: number, littleEndian?: boolean) : number;
  getUint16(offset: number, littleEndian?: boolean) : number;
  getInt32(offset: number, littleEndian?: boolean) : number;
  getUint32(offset: number, littleEndian?: boolean) : number;
  getFloat32(offset: number, littleEndian?: boolean) : number;
  getFloat32Array(offset: number, num: number) : Float32Array;

  /**
   * @returns the size, in bytes, of the underlying buffer.
   */
   size() : number;
}