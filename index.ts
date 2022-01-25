import { HashMap } from "./map/HashMap";
import { HashSet } from "./set/HashSet";
import { RingArray } from "./array/RingArray";
import { Hashable } from "./Hashable";

// compile wasm scripts
// note: we need third party tools to do this, so its not really platform agnostic
// that being said, tossing this into a submodule helps a little bit

export { RingArray, HashMap, HashSet, Hashable };