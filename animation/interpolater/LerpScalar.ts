export class LerpScalar {
  static interpolate(_: number, a: number, b: number, time: number) {
    return (a * (1.0 - time) + b * time);
  }

  static copy(_: number, a: number) {
    return a;
  }
}