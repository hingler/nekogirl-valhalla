import { expect } from "chai";
import { ReadWriteBuffer } from "../ts/buffer/ReadWriteBuffer";

describe("ReadWriteBufferTest", function() {
  it("Should instantiate itself without crashing", function() {
    let buffer = new ReadWriteBuffer();
    expect(buffer.getUint8(0)).to.equal(0);
  });

  it("Should return buffer data accurately", function() {
    let buf = new ArrayBuffer(32);
    let view = new DataView(buf);
    view.setInt8(0, 64);
    view.setUint8(1, 128);

    view.setInt16(2, 256, true);
    view.setUint16(4, 512, true);

    view.setInt32(6, 1024, true);
    view.setUint32(10, 2048, true);

    view.setFloat32(14, 409.6, true);

    let buffer = new ReadWriteBuffer(buf);

    expect(buffer.getInt8(0)).to.equal(64);
    expect(buffer.getUint8(1)).to.equal(128);
    expect(buffer.getInt16(2, true)).to.equal(256);
    expect(buffer.getUint16(4, true)).to.equal(512);
    expect(buffer.getInt32(6, true)).to.equal(1024);
    expect(buffer.getUint32(10, true)).to.equal(2048);
    expect(buffer.getFloat32(14, true)).to.be.approximately(409.6, 0.001);
  });
})