import { expect } from "chai";
import { LinkedArray } from "../ts/array/LinkedArray";

describe("LinkedArray", function() {
  it("Should instantiate properly", function() {
    const list = new LinkedArray<number>();
    list.push(1);
    expect(list.get(0)).to.be.equal(1);
    expect(list.length).to.be.equal(1);
  });

  it("Should maintain order of data", function() {
    const list = new LinkedArray<number>();
    const items = [ 1, 3, 5, 7 ];
    for (let i = 0; i < items.length; i++) {
      list.push(items[i]);
      expect(list.length).to.be.equal(i + 1);
    }

    for (let i = 0; i < items.length; i++) {
      expect(list.get(i)).to.be.equal(items[i]);
    }
  });

  it("Should support mid-list removal", function() {
    const list = new LinkedArray<number>();
    const items = [ 1, 3, 5, 7 ];
    for (let i = 0; i < items.length; i++) {
      list.push(items[i]);
    }

    expect(list.remove(2)).to.be.equal(5);
    expect(list.length).to.be.equal(3);

    expect(list.get(0)).to.be.equal(1);
    expect(list.get(1)).to.be.equal(3);
    expect(list.get(2)).to.be.equal(7);
    
    list.push(9);

    expect(list.get(0)).to.be.equal(1);
    expect(list.get(1)).to.be.equal(3);
    expect(list.get(2)).to.be.equal(7);
    expect(list.get(3)).to.be.equal(9);

    expect(list.remove(0)).to.be.equal(1);

    expect(list.get(0)).to.be.equal(3);
    expect(list.get(1)).to.be.equal(7);
    expect(list.get(2)).to.be.equal(9);

    expect(list.remove(2)).to.be.equal(9);

    expect(list.get(0)).to.be.equal(3);
    expect(list.get(1)).to.be.equal(7);
  });

  it("Should support prepends", function() {
    const list = new LinkedArray<number>();
    const items = [ 1, 3, 5, 7 ];
    for (let i = 0; i < items.length; i++) {
      list.enqueue(items[i]);
      expect(list.length).to.be.equal(i + 1);
    }

    expect(list.remove(2)).to.be.equal(3);
    expect(list.length).to.be.equal(3);

    expect(list.get(0)).to.be.equal(7);
    expect(list.get(1)).to.be.equal(5);
    expect(list.get(2)).to.be.equal(1);    
  });

  it("Should support removal from front", function() {
    const list = new LinkedArray<number>();
    const items = [ 1, 3, 5, 7 ];
    for (let i = 0; i < items.length; i++) {
      list.enqueue(items[i]);
    }

    for (let i = 3; i >= 0; i--) {
      expect(list.dequeue()).to.be.equal(items[i]);
      expect(list.length).to.be.equal(i);
    }

    expect(list.dequeue()).to.be.null;
    expect(list.length).to.be.equal(0);
  });

  it("Should support removal from back", function() {
    const list = new LinkedArray<number>();
    const items = [ 1, 3, 5, 7 ];
    for (let i = 0; i < items.length; i++) {
      list.push(items[i]);
    }

    for (let i = 0; i < 3; i++) {
      expect(list.pop()).to.be.equal(items[3 - i]);
      expect(list.length).to.be.equal(3 - i);
    }
  });
});