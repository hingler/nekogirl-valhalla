import { expect } from "chai";
import { NestableBase } from "../ts/object/NestableBase";

class NestableTest extends NestableBase<NestableTest> {

}

describe("Nestable", function() {
  it("Stores and returns nested components", function() {
    const p = new NestableTest(0);
    const c = new NestableTest(1);

    p.addChild(c);

    expect(p.getChild(1)).to.equal(c);

    const children = p.getChildren();
    expect(children.length).to.equal(1);
    expect(children[0]).to.equal(c);

    expect(p.removeChild(1)).to.equal(c);
    expect(p.getChild(1)).to.be.null;
    expect(c.getParent()).to.be.null;
  });

  it("Resolves potential nesting issues", function() {
    const gp = new NestableTest(0);
    const p = new NestableTest(1);
    const c = new NestableTest(2);
    gp.addChild(p);
    p.addChild(c);

    expect(gp.getChild(2)).to.equal(c);
    expect(p.getChild(2)).to.equal(c);

    gp.addChild(c);

    expect(c.getParent()).to.equal(gp);
    expect(p.getParent()).to.equal(gp);

    expect(p.getChild(2)).to.be.null;
  });
});