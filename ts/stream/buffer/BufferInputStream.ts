import { IReadOnlyBuffer } from "../../buffer";
import { IInputStream } from "../IInputStream";

export class BufferInputStream implements IInputStream {
  private buf: IReadOnlyBuffer;
  private off: number;
  constructor(buf: IReadOnlyBuffer) {
    this.buf = buf;
    this.off = 0;
  }

  readInt8() {
    return this.buf.getInt8(this.off++);
  }

  readUint8() {
    return this.buf.getUint8(this.off++);
  }

  readInt16() {
    const res = this.buf.getInt16(this.off);
    this.off += 2;
    return res;
  }

  readUint16() {
    const res = this.buf.getUint16(this.off);
    this.off += 2;
    return res;
  }

  readInt32() {
    const res = this.buf.getInt32(this.off);
    this.off += 4;
    return res;
  }

  readUint32() {
    const res = this.buf.getUint32(this.off);
    this.off += 4;
    return res;
  }

  readFloat32() {
    const res = this.buf.getFloat32(this.off);
    this.off += 4;
    return res;
  }

  seek(off: number) {
    if (off < 0) {
      this.off = 0;
    } else if (this.off >= this.buf.size()) {
      this.off = this.buf.size();
    } else {
      this.off = off;
    }
  }

  tell() {
    return this.off;
  }
}