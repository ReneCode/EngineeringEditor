import { object } from "prop-types";

/**
 * @summary creates a deep copy of 'obj'.
 * Does not copy the attributes, that names starts with "_" e.g. _internalProp
 */
const deepClone = (obj: any): any => {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = new obj.constructor();

    for (var attr in obj) {
      if (attr[0] !== "_" && obj.hasOwnProperty(attr))
        copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

export const copyOwnProperties = (dest: any, src: any) => {
  for (var attr in src) {
    if (attr[0] !== "_" && src.hasOwnProperty(attr))
      dest[attr] = deepClone(src[attr]);
  }
};

export default deepClone;
