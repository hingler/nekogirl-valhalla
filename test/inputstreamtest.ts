import { expect } from "chai";
import { ReadWriteBuffer } from "../ts/buffer/ReadWriteBuffer";
import { BufferInputStream } from "../ts/stream/buffer/BufferInputStream";

describe("BufferInputStream", function() {
  it("Instantiates correctly", function() {
    const buf = new ReadWriteBuffer();
    buf.setFloat32(0, 1.0);
    buf.setFloat32(4, 2.0);

    const stream = new BufferInputStream(buf);
    expect(stream.readFloat32()).to.equal(1.0);
    expect(stream.readFloat32()).to.equal(2.0);

    buf.setFloat32(8, 4.0);

    expect(stream.readFloat32()).to.equal(4.0);

    expect(stream.readFloat32()).to.throw;
  });

  it("Supports shorter integer types", function() {
    const buf = new ReadWriteBuffer();
    buf.setFloat32(0, 1.0);
    buf.setInt32(4, -2);
    buf.setUint32(8, 4);
    buf.setUint16(12, 8);
    buf.setInt16(14, -16);
    buf.setUint8(16, 32);
    buf.setInt8(17, -64);

    const stream = new BufferInputStream(buf);

    expect(stream.readFloat32()).to.equal(1.0);
    expect(stream.readInt32()).to.equal(-2);
    expect(stream.readUint32()).to.equal(4);
    expect(stream.readUint16()).to.equal(8);
    expect(stream.readInt16()).to.equal(-16);
    expect(stream.readUint8()).to.equal(32);
    expect(stream.readInt8()).to.equal(-64);
  })
})