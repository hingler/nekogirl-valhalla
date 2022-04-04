/**
 * A stream-like interface which reads bytes.
 */
export interface IInputStream {
  readInt8() : number;
  readUint8() : number;
  readInt16() : number;
  readUint16() : number;
  readInt32() : number;
  readUint32() : number;
  readFloat32() : number;

  // seeking

  /**
   * Seeks to a position in this buffer relative to its start.
   * @param off - the offset we wish to seek to.
   */
  seek(off: number) : void;

  /**
   * Returns the number of bytes offset from the start of the buffer.
   */
  tell() : number;
}