/**
 * Equivalent interface for output streams.
 */
export interface IOutputStream {
  writeInt8(val: number) : void;
  writeUint8(val: number) : void;
  writeInt16(val: number) : void;
  writeUint16(val: number) : void;
  writeInt32(val: number) : void;
  writeUint32(val: number) : void;
  writeFloat32(val: number) : void;
};