import { Nestable } from "./Nestable";

export class NestableComponent<T> {
  private parent: NestableComponent<T>;
  private children: Set<NestableComponent<T>>;
  private id: number;

  readonly self: T;

  constructor(id: number, self: T) {
    this.parent = null;
    this.children = new Set();
    this.id = id;
    this.self = self;
  }

  getChildren() {
    const res = Array.from(this.children);
    return res.map(a => a.self);
  }

  getParent() {
    return (this.parent ? this.parent.self : null);
  }

  private findChild(id: number) {
    let res: NestableComponent<T> = null;
    for (let child of this.children) {
      if (child.getId() === id) {
        res = child;
        break;
      }
    }

    if (res === null) {
      for (let child of this.children) {
        res = child.findChild(id);
      }
    }

    return res;
  }

  getChild(id: number) {
    return this.findChild(id).self;
  }

  removeChild(id: number) {
    if (id === this.id) {
      return null;
    }

    for (let child of this.children) {
      if (child.getId() === id) {
        this.children.delete(child);
        child.parent = null;
        return child.self;
      }
    }

    let child = this.findChild(id);
    if (child) {
      child.parent.removeChild(child.getId());
      child.parent = null;
    }

    return child.self;
  }

  addChild(elem: NestableComponent<T>) {
    if (elem.findChild(this.getId())) {
      return false;
    } else {
      if (elem.parent) {
        elem.parent.removeChild(elem.getId());
      }

      // `this` is always a subtype of T
      // crtp means T will inherit nestablebase<T>
      elem.parent = this;
      this.children.add(elem);
      return true;
    }
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }
}