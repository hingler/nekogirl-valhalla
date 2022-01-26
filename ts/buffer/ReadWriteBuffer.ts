import { IReadWriteBuffer } from "./IReadWriteBuffer";

export class ReadWriteBuffer implements IReadWriteBuffer<ReadWriteBuffer> {
  private buf: ArrayBuffer;
  private view: DataView;
  constructor(buffer?: ArrayBuffer | number) {
    if (typeof buffer === "number") {
      this.buf = new ArrayBuffer(buffer);
    } else if (buffer) {
      // copy lole
      // TODO: copy lole
      this.buf = new ArrayBuffer(buffer.byteLength);
      new Uint8Array(this.buf).set(new Uint8Array(buffer), 0);
    } else {
      this.buf = new ArrayBuffer(16);
    }
    
    this.view = new DataView(this.buf);
  }

  private ensureInBounds(offset: number) {
    const SIZE_MAX = 1073741824;
    if (this.buf.byteLength <= offset) {
      let bufNew = new ArrayBuffer(Math.min(offset * 2, SIZE_MAX));
      if (offset > SIZE_MAX) {
        throw Error("Too much space reserved for array buffer :sade:");
      }

      new Uint8Array(bufNew).set(new Uint8Array(this.buf), 0);
      this.buf = bufNew;

      this.view = new DataView(this.buf);
    }
  }

  getInt8(offset: number) {
    return this.view.getInt8(offset);
  }

  getUint8(offset: number) {
    return this.view.getUint8(offset);
  }

  getInt16(offset: number, littleEndian?: boolean) {
    return this.view.getInt16(offset, littleEndian);
  }

  getUint16(offset: number, littleEndian?: boolean) {
    return this.view.getUint16(offset, littleEndian);
  }

  getInt32(offset: number, littleEndian?: boolean) {
    return this.view.getInt32(offset, littleEndian);
  }

  getUint32(offset: number, littleEndian?: boolean) {
    return this.view.getUint32(offset, littleEndian);
  }
  
  getFloat32(offset: number, littleEndian?: boolean) {
    return this.view.getFloat32(offset, littleEndian);
  }

  getFloat32Array(offset: number, num: number) {
    return new Float32Array(this.buf, offset, num);
  }

  setInt8(offset: number, value: number) {
    this.ensureInBounds(offset);
    this.view.setInt8(offset, value);
  }

  setUint8(offset: number, value: number) {
    this.ensureInBounds(offset);
    this.view.setUint8(offset, value);
  }

  setInt16(offset: number, value: number, littleEndian?: boolean) {
    this.ensureInBounds(offset + 1);
    this.view.setInt16(offset, value, littleEndian);
  }

  setUint16(offset: number, value: number, littleEndian?: boolean) {
    this.ensureInBounds(offset + 1);
    this.view.setUint16(offset, value, littleEndian);
  }

  setInt32(offset: number, value: number, littleEndian?: boolean) {
    this.ensureInBounds(offset + 3);
    this.view.setInt32(offset, value, littleEndian);
  }

  setUint32(offset: number, value: number, littleEndian?: boolean) {
    this.ensureInBounds(offset + 3);
    this.view.setUint32(offset, value, littleEndian);
  }

  setFloat32(offset: number, value: number, littleEndian?: boolean) {
    this.ensureInBounds(offset + 3);
    this.view.setFloat32(offset, value, littleEndian);
  }

  setFloatArray(offset: number, arr: ArrayLike<number>, littleEndian?: boolean) {
    this.ensureInBounds(offset + (4 * arr.length));
    let farr = new Float32Array(this.buf, offset, arr.length);
    farr.set(arr);
  }

  getRegionAsUint16Array(offset: number, length: number) {
    this.ensureInBounds(offset + (2 * length) - 1);
    return new Uint16Array(this.buf, offset, length);
  }

  getRegionAsFloat32Array(offset: number, length: number) {
    this.ensureInBounds(offset + 4 * length - 1);
    return new Float32Array(this.buf, offset, length);
  }

  size() {
    return this.buf.byteLength;
  }

  arrayBuffer() {
    return this.buf;
  }

  copy() {
    return new ReadWriteBuffer(this.buf);
  }
}