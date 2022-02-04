import { ReadWriteBuffer } from "../buffer/ReadWriteBuffer";
import { AttributeType } from "./AttributeType";
import { DataType } from "./DataType";
import { GLAttributeSpec, ReadonlyGLAttributeSpec } from "./GLAttributeSpec";
import { GLIndexSpec, ReadonlyGLIndexSpec } from "./GLIndexSpec";

/**
 * Wraps around a ReadWriteBuffer,
 * providing a specification for attributes which can be trivially
 * ported over to OpenGL
 */
export class GLModelSpec {
  private attributeList: Map<AttributeType, GLAttributeSpec>;
  private index: GLIndexSpec;
  
  private static getByteSize(type: DataType) {
    switch (type) {
      case DataType.BYTE:
      case DataType.UNSIGNED_BYTE:
        return 1;
      case DataType.SHORT:
      case DataType.UNSIGNED_SHORT:
        return 2;
      case DataType.FLOAT:
        return 4;
      default:
        let err = `Unknown component type: ${type}`;
        console.warn(err);
        throw Error(err);
    }
  }
  
  constructor() {
    this.attributeList = new Map();
  }

  // store buffers in a set
  // 
  setAttribute(buffer: ReadWriteBuffer, attrib: AttributeType, components: number, type: DataType, num: number, offset?: number, stride?: number) {
    const data : GLAttributeSpec = {
      "buffer": buffer,
      "components": components,
      "type": type,
      "count": num,
      "offset": (offset === undefined ? 0 : offset),
      "stride": (stride === undefined ? 0 : offset)
    };

    this.attributeList.set(attrib, data);
  }

  setIndex(buffer: ReadWriteBuffer, type: DataType, count: number, offset?: number) {
    const data : GLIndexSpec = {
      "buffer": buffer,
      "count": count,
      "type": type,
      "offset": (offset ? offset : 0)
    };
  }

  getAttributes() {
    return this.attributeList as ReadonlyMap<AttributeType, ReadonlyGLAttributeSpec>;
  }

  getIndex() {
    return this.index as ReadonlyGLIndexSpec;
  }
}