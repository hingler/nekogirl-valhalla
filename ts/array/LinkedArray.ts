// linked array to guarantee O(1) removal
// for our cache :D
// note: designing an interface for all of these might do some good

interface LinkNode<V> {
  next: LinkNode<V>;
  value: V;
};

class LinkedArrayIterator<V> implements Iterator<V> {
  private node : LinkNode<V>;
  constructor(root: LinkNode<V>) {
    this.node = root;
  }

  next() {
    if (this.node === null) {
      return {
        value: null,
        done: true
      };
    } else {
      const res = this.node.value;
      this.node = this.node.next;
      return { 
        value: res,
        done: this.node === null
      };
    }
  }
}

export class LinkedArray<V> {
  private root: LinkNode<V>;
  private end: LinkNode<V>;
  private length_: number;
  constructor() {
    this.root = null;
    this.end = null;
    this.length_ = 0;
  }

  /**
   * @returns the length of this linkedarray.
   */
  get length() {
    return this.length_;
  }

  /**
   * @returns an ordered iterator on this linkedarray.
   */
  [Symbol.iterator]() {
    return new LinkedArrayIterator(this.root);
  }

  get(ind: number) : V {
    const res = this.findNode(ind);
    if (res !== null) {
      return res.node ? res.node.value : null;
    }

    return null;
  }

  set(ind: number, val: V) {
    const { node } = this.findNode(ind);
    let oldVal : V = null;
    if (node !== null) {
      oldVal = node.value;
      node.value = val;
    }

    return oldVal;
  }

  remove(ind: number) : V {
    if (this.root === null) {
      return null;
    }

    const { node, parent } = this.findNode(ind);
    if (parent !== null) {
      parent.next = node.next;
    }

    if (this.end === node) {
      this.end = parent;
    }

    if (this.root === node) {
      this.root = node.next;
    }

    this.length_--;
    return node.value;
  }

  push(val: V) {
    const node : LinkNode<V> = {
      next: null,
      value: val
    };

    if (this.end !== null) {
      this.end.next = node;
      this.end = node;
    } else {
      // empty
      this.end = node;
      this.root = node;
    }

    this.length_++;
  }

  pop() : V {
    const { node, parent } = this.findNode(this.length_ - 1);
    if (node === this.root) {
      this.root = null;
      this.end = null;
    } else {
      this.end = parent;
      parent.next = null;
    }

    this.length_--;
    return node.value;
  }

  enqueue(val: V) {
    const node : LinkNode<V> = {
      next: this.root,
      value: val
    };

    if (this.end === null) {
      this.root = node;
      this.end = node;
    } else {
      this.root = node;
    }

    this.length_++;
  }

  /**
   * Removes a node from the front of the array.
   * @returns 
   */
  dequeue() {
    if (this.root === null) {
      return null;
    }

    const res = this.root;
    this.root = this.root.next;
    if (this.end === res) {
      this.end = null;
    }

    this.length_--;
    return res.value;
  }

  clear() {
    this.length_ = 0;
    this.root = null;
    this.end = null;
  }

  private findNode(ind: number) {
    if (this.root === null) {
      return {
        "node": null,
        "parent": null
      };
    }

    if (ind >= this.length_ || ind < 0) {
      return {
        "node": null,
        "parent": null
      };
    }

    let prev = null;
    let node = this.root;
    while (ind > 0 && node !== null) {
      prev = node;
      node = node.next;
      ind--;
    }

    if (node) {
      return {
        "node": node,
        "parent": prev
      };
    }

    return {
      "node": null,
      "parent": null
    };
  }
}