import { ReadWriteBuffer } from "ts/buffer/ReadWriteBuffer";
import { AttributeType } from "./AttributeType";
import { DataType } from "./DataType";
import { GLAttributeSpec, ReadonlyGLAttributeSpec } from "./GLAttributeSpec";

/**
 * Wraps around a ReadWriteBuffer,
 * providing a specification for attributes which can be trivially
 * ported over to OpenGL
 */
export class GLModelSpec {
  private buffer: ReadWriteBuffer;
  private attributeList: Map<AttributeType, GLAttributeSpec>;
  
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
  
  constructor(buffer: ReadWriteBuffer) {
    this.buffer = buffer;
  }

  addAttribute(attrib: AttributeType, components: number, type: DataType, num: number, offset?: number, stride?: number) {
    const data : GLAttributeSpec = {
      "components": components,
      "type": type,
      "count": num,
      "offset": (offset === undefined ? 0 : offset),
      "stride": (stride === undefined ? 0 : offset)
    };

    this.attributeList.set(attrib, data);
  }

  getAttributes() {
    return this.attributeList as ReadonlyMap<AttributeType, ReadonlyGLAttributeSpec>;
  }
}