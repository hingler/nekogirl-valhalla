import { expect } from "chai";
import { RingArray } from "../ts/array/RingArray";

describe("RingArrayTest", function() {
  it("Should instantiate properly", function() {
    const buf = new RingArray<number>(1024);
    expect(buf.length).equals(0);
    expect(buf.pop()).to.be.undefined;
    expect(buf.get(0)).to.be.undefined;
  });

  it("Should hold a single item", function() {
    const buf = new RingArray<number>(1024);
    buf.push(16);
    expect(buf.length).equals(1);
    expect(buf.pop()).to.equal(16);
    expect(buf.length).equals(0);
  });

  it("Should throw a fit when you max out", function() {
    const buf = new RingArray<number>(1024);
    for (let i = 0; i < 1024; i++) {
      buf.push(i);
      expect(buf.length).equals(i + 1);
    }

    expect(buf.push.bind(buf, -1)).to.throw;
    expect(buf.length).equals(1024);

    for (let i = 1023; i >= 0; i--) {
      expect(buf.pop()).to.equal(i);
      expect(buf.length).to.equal(i);
    }
  });

  it("Should loop!", function() {
    const buf = new RingArray<number>(344);
    for (let i = 0; i < 64; i++) {
      for (let j = 0; j < 256; j++) {
        buf.push(j);
      }

      for (let j = 0; j < 256; j++) {
        expect(buf.dequeue()).to.equal(j);
      }
    }
  })

  it("Should allow removal of items", function() {
    const buf = new RingArray<number>(16);
    buf.push(0);
    buf.push(1);
    buf.push(2);

    buf.remove(1);

    expect(buf.get(0)).to.be.equal(0);
    expect(buf.get(1)).to.be.equal(2);

    buf.push(3);
    buf.push(4);
    buf.push(5);
    buf.push(6);
    buf.push(7);

    buf.push(8);

    expect(buf.length).to.equal(8);

    expect(buf.remove(7)).to.equal(8);
    expect(buf.remove(0)).to.equal(0);

    expect(buf.length).to.equal(6);

    expect(buf.get(0)).to.be.equal(2);
    expect(buf.get(1)).to.be.equal(3);
    expect(buf.get(2)).to.be.equal(4);
    expect(buf.get(3)).to.be.equal(5);
    expect(buf.get(4)).to.be.equal(6);
    expect(buf.get(5)).to.be.equal(7);
  });
});