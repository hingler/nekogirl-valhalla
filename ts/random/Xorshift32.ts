
// initial seed
let s: number = 3662;
const int32_max = 4294967295;
const int31_off = 2147483648;
// up to 53 bits in mantissa, i cant multiply more because the computer will be cross with me

// prime number :D
const int_greebler = 104593;
const int_greebler_b = 17497;
const int_greebler_c = 19;
const int_greebler_d = 3;

/**
 * @returns a random 32 bit integer.
 */
export function xorshift32() {
  let x = s;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  // constrain to 32 bits
  x &= -1;

  x += int31_off;
  let res = s;
  s = x;
  // introduce a large multiplication op to greeble our results a bit
  // simulate large number mul with several factors
  // todo: move to lib
  res = (res * int_greebler) % int32_max;
  res = (res * int_greebler_b) % int32_max;
  res = (res * int_greebler_c) % int32_max;
  res = (res * int_greebler_d) % int32_max;

  return res;
}

/**
 * @returns A floating point number from 0 to 1.
 */
export function xorshift32_float() {
  let res = xorshift32();
  return res / (int32_max);
}

export function xorshift32_seed(seed: number) {
  s = seed;
  // flush out the seed
  xorshift32();
  xorshift32();
  xorshift32();
}