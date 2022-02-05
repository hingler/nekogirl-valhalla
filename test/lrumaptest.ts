import { expect } from "chai";
import { LRUMap } from "../ts/map";

describe("LRUMap", function() {
  it("Should evict items automatically", function() {
    const map = new LRUMap<number, number>(4);
    map.insert(0, 0);
    map.insert(1, 1);
    map.insert(2, 2);
    map.insert(3, 3);

    expect(map.get(0)).to.be.equal(0);
    expect(map.get(1)).to.be.equal(1);
    expect(map.get(2)).to.be.equal(2);
    expect(map.get(3)).to.be.equal(3);

    map.insert(4, 4);

    expect(map.get(0)).to.be.null;
    expect(map.get(1)).to.be.equal(1);
    expect(map.get(2)).to.be.equal(2);
    expect(map.get(3)).to.be.equal(3);
    expect(map.get(4)).to.be.equal(4);
  });

  it("Should evict items when called", function() {
    const map = new LRUMap<number, number>(4);
    map.insert(0, 0);
    map.insert(1, 1);
    map.insert(2, 2);
    map.insert(3, 3);

    expect(map.get(0)).to.be.equal(0);
    expect(map.get(1)).to.be.equal(1);
    expect(map.get(2)).to.be.equal(2);
    expect(map.get(3)).to.be.equal(3);

    map.evict();
    expect(map.get(0)).to.be.null;
    expect(map.get(1)).to.be.equal(1);
    expect(map.get(2)).to.be.equal(2);
    expect(map.get(3)).to.be.equal(3);

  });
})