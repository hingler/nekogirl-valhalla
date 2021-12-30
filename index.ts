import { HashMap } from "./ts/map/HashMap";
import { HashSet } from "./ts/set/HashSet";
import { RingArray } from "./ts/array/RingArray";
import { Hashable } from "./ts/Hashable";

// compile wasm scripts
// note: we need third party tools to do this, so its not really platform agnostic
// that being said, tossing this into a submodule helps a little bit

export { RingArray, HashMap, HashSet, Hashable };