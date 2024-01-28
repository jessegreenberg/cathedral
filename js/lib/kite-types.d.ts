declare namespace kite {
  export class Shape {
    public static bounds( bounds: dot.Bounds2 ): Shape;
    public static roundRect( x: number, y: number, width: number, height: number, r1: number, r2: number ): Shape;
  }
}