import { IOutputStream } from "../IOutputStream";
import { IReadWriteBuffer } from "../../buffer";

export class BufferOutputStream implements IOutputStream {
  private buf: IReadWriteBuffer;
  private off: number;

  constructor(buf: IReadWriteBuffer) {
    this.buf = buf;
    this.off = 0;
  }

  writeInt8(val: number) {
    this.buf.setInt8(this.off++, val);
  }

  writeUint8(val: number) {
    this.buf.setUint8(this.off++, val);
  }

  writeInt16(val: number) {
    this.buf.setInt16(this.off, val);
    this.off += 2;
  }

  writeUint16(val: number) {
    this.buf.setUint16(this.off, val);
    this.off += 2;
  }

  writeInt32(val: number) {
    this.buf.setInt32(this.off, val);
    this.off += 4;
  }

  writeUint32(val: number) {
    this.buf.setUint32(this.off, val);
    this.off += 4;
  }

  writeFloat32(val: number) {
    this.buf.setFloat32(this.off, val);
    this.off += 4;
  }
}