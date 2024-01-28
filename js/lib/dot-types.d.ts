type IntentionalAny = any; // eslint-disable-line

declare namespace dot {
  export class Dimension2 {
    public constructor( width: number, height: number );
    public set( other: Dimension2 ): void;
    public width: number;
    public height: number;
  }

  export class Bounds2 {
    public constructor( minX: number, minY: number, maxX: number, maxY: number );

    public static readonly EVERYTHING: dot.Bounds2;

    public set( other: dot.Bounds2 ): dot.Bounds2;
    public setMinMax( minX: number, minY: number, maxX: number, maxY: number ): dot.Bounds2;

    public minX: number;
    public maxX: number;
    public minY: number;
    public maxY: number;

    public copy(): dot.Bounds2;

    public shiftXY( x: number, y: number ): void;

    public shift( vec: dot.Vector2 ): void;

    public setMaxX( maxX: number );
    public setMaxY( maxY: number );

    public width: number;
    public height: number;

    public right: number;
    public left: number;
    public top: number;
    public centerX: number;
    public centerY: number;

    public center: dot.Vector2;
    public centerBottom: dot.Vector2;
    public centerTop: dot.Vector2;
    public leftTop: dot.Vector2;

    public getCenterTop(): dot.Vector2;

    public containsPoint( point: dot.Vector2 ): boolean;
    public containsCoordinates( x: number, y: number ): boolean;
    public containsBounds( other: dot.Bounds2 ): boolean;

    public transformed( matrix: dot.Matrix3 ): dot.Bounds2;
    public dilated( value: number ): dot.Bounds2;

    public includeBounds( bounds: dot.Bounds2 ): dot.Bounds2;

    public intersectsBounds( bounds: dot.Bounds2 ): dot.Bounds2;
  }

  export class Range {
    public constructor( min: number, max: number );
    public readonly min: number;
    public readonly max: number;
  }

  export class Vector2 {
    public constructor( x: number, y: number );

    public plusXY( x: number, y: number ): dot.Vector2;
    public timesScalar( val: number ): dot.Vector2;

    public setXY( x: number, y: number ): void;

    public set( other: dot.Vector2 ): void;

    public plus( other: dot.Vector2 ): dot.Vector2;

    // returns a new Vector
    public multiplyScalar( val: number ): dot.Vector2;

    public componentTimes( other: dot.Vector2 ): dot.Vector2;

    public minusXY( x: number, y: number ): dot.Vector2;

    public isFinite(): boolean;

    public equalsEpsilon( other: dot.Vector2, epsilon: number ): boolean;
    public equals( other: dot.Vector2 ): boolean;

    public minus( other: dot.Vector2 ): dot.Vector2;

    public get magnitude(): number;

    public setMagnitude( mag: number ): dot.Vector2;

    public withMagnitude( value: number ): dot.Vector2;

    public normalized(): dot.Vector2;

    public rotated( value: number ): dot.Vector2;

    public toStateObject(): { x: number; y: number };

    public static getDistanceBetweenVectors( vec1: dot.Vector2, vec2: dot.Vector2 ): number;
    public static fromStateObject( stateObject: { x: number; y: number } ): Vector2;

    public x: number;
    public y: number;
  }

  declare const Utils: {
    toFixedNumber: ( value: number, decimalPlaces: number ) => number;
    equalsEpsilon: ( value: number, otherValue: number, epsilon: number ) => boolean;
  };

  declare const dotRandom: {
    nextBoolean: () => bool;
  };

  export class Matrix3 {
    public static rowMajor(
      v00: number, v01: number, v02: number, v10: number, v11: number, v12: number, v20: number, v21: number, v22: number
    ): Matrix3;

    public copy(): dot.Matrix3;

    public equals( other: dot.Matrix3 ): boolean;

    public m00(): number;

    public static scaling( scale: number ): dot.Matrix3;

    public static rotation2( rotation: number ): dot.Matrix3;

    public static translationTimesMatrix( x: number, y: number, otherMatrix: dot.Matrix3 ): dot.Matrix3;

    public static translationFromVector( vector: dot.Vector2 ): dot.Matrix3;

    public static translation( x: number, y: number ): dot.Matrix3;

    public inverted(): dot.Matrix3;

    // mutables
    public set( matrix: dot.Matrix3 ): void;

    public set00( number: number ): void;

    public set02( number: number ): void;

    public set12( number: number ): void;

    public multiplyMatrix( matrix: dot.Matrix3 ): void;

    // returns new Matrix3
    public timesMatrix( matrix: dot.Matrix3 ): dot.Matrix3;
  }

  export class Vector2Property extends axon.Property<dot.Vector2> {
  }
}