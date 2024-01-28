type IntentionalAny = any; // eslint-disable-line

declare namespace phetcommon {
  export class ModelViewTransform2 {
    public static createRectangleInvertedYMapping(
      modelBounds: dot.Bounds2,
      viewBounds: dot.Bounds2
    ): phetcommon.ModelViewTransform2;

    public static createSinglePointScaleInvertedYMapping(
      modelPoint: dot.Vector2,
      viewPoint: dot.Vector2,
      scale: number
    ): phetcommon.ModelViewTransform2;

    public modelToViewBounds( bounds: dot.Bounds2 ): dot.Bounds2;

    public modelToViewPosition( position: dot.Vector2 ): dot.Vector2;

    public viewToModelPosition( position: dot.Vector2 ): dot.Vector2;

    public modelToViewDeltaY( y: number ): number;

    public modelToViewDeltaX( x: number ): number;

    public modelToViewX( x: number ): number;
    public modelToViewY( y: number ): number;
  }
}