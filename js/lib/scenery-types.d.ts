declare namespace scenery {
  export class Node {
    public constructor( options?: IntentionalAny );

    public addChild( node: Node ): void;

    public removeChild: ( node: Node ) => void;
    public addInputListener: ( listener: IntentionalAny ) => void;
    public removeInputListener: ( listener: IntentionalAny ) => void;

    public setMatrix( matrix: dot.Matrix3 ): void;

    public set matrix( matrix: dot.Matrix3 );

    public setScaleMagnitude( scale: number ): void;

    public set children( children: scenery.Node[] );

    public globalToParentPoint( vector: dot.Vector2 ): dot.Vector2;

    public globalToLocalPoint( vector: dot.Vector2 ): dot.Vector2;

    public opacity: number;
    public visible: boolean;

    public enabled: boolean;
    public inputEnabled: boolean;
    public maxHeight: number;
    public maxWidth: number;
    public cursor: string;

    public moveToBack(): void;

    public get width(): number;

    public get height(): number;

    public parents: scenery.Node[];

    public translation: dot.Vector2;
    public leftBottom: dot.Vector2;
    public leftCenter: dot.Vector2;
    public rightCenter: dot.Vector2;
    public center: dot.Vector2;
    public leftTop: dot.Vector2;
    public centerTop: dot.Vector2;
    public centerBottom: dot.Vector2;
    public rightBottom: dot.Vector2;
    public rightTop: dot.Vector2;
    public left: number;
    public top: number;
    public bottom: number;
    public right: number;
    public maxWidth: number;
    public touchArea: dot.Bounds2;
    public mouseArea: dot.Bounds2;
    public pickable: boolean;

    public readonly boundsProperty: axon.Property<axon.Bounds2>;
    public readonly localBoundsProperty: axon.Property<axon.Bounds2>;

    public m00(): number;

    public set00( val: number ): void;

    public readonly bounds: dot.Bounds2;

    public dispose(): void;
  }

  export class GridBox extends scenery.Node {
  }

  export class VBox extends scenery.Node {
  }

  export class CanvasNode extends scenery.Node {
    public setCanvasBounds( bounds: dot.Bounds2 ): void;
    public paintCanvas( context: CanvasRenderingContext2D ): void;
    public invalidatePaint(): void;
    public readonly canvasBounds: dot.Bounds2;
  }

  export class HBox extends scenery.Node {
  }

  export class Text extends scenery.Node {
    public constructor( text: string, options?: IntentionalAny );

    public string: string | number;
  }

  export class RichText extends scenery.Node {
    public constructor( text: string, options?: IntentionalAny );
  }

  export class Circle extends scenery.Node {
    public constructor( radius: number, options?: IntentionalAny );
  }

  export class Font {
    public constructor( options?: IntentionalAny );
  }

  export class DOM extends scenery.Node {

  }

  export class SceneryEvent {
    public readonly pointer: IntentionalAny;
  }

  export class Image extends scenery.Node {
    public constructor( image: string | HTMLImageElement, options?: IntentionalAny );
    public image: string | HTMLImageElement;
  }

  export class SpriteImage {
    public constructor( image: HTMLElement, offset: dot.Vector2, options?: IntentionalAny );
    public get image(): HTMLImageElement;
    public readonly width: number;
    public readonly height: number;
  }

  export class Sprite {
    public constructor( spriteImage: scenery.SpriteImage );
    public imageProperty: axon.Property<scenery.SpriteImage>;
  }

  export class SpriteInstance {
    public static readonly pool: IntentionalAny;
    public sprite: scenery.Sprite;

    public matrix: dot.Matrix3;
  }

  export class Sprites extends scenery.Node {
    public constructor( options?: IntentionalAny );

    public invalidatePaint(): void;
  }

  export class KeyboardListener {
    public constructor( obj?: IntentionalAny );

    public readonly keysPressed: string;
    public readonly keysDown: boolean;
  }

  export class Color {
    public constructor( r: number, g: number, b: number, a?: number );
    public constructor( cssString: string );
    public toCSS(): string;
    public r: number;
    public g: number;
    public b: number;
  }

  export class Rectangle extends Node {
    public constructor( bounds: dot.Bounds2, options?: IntentionalAny );
    public constructor( x: number, y: number, width: number, height: number, options?: IntentionalAny );

    public setRectWidth( width: number ): void;
    public setRectBounds( bounds: dot.Bounds2 ): void;

    public setRect( x: number, y: number, width: number, height: number ): void;

    public setRectHeight( height: number ): void;

    public fill: string | null;
    public stroke: string | null;
    public lineDash: number[] | null;
  }

  // A huge rectangle that takes up the entire screen
  export class Plane extends scenery.Rectangle{
    public constructor( options?: IntentionalAny );
  }

  export class Path extends scenery.Node {
    public constructor( shape: kite.Shape, options?: IntentionalAny );

    public fill: string | null;
    public stroke: string | null;
    public lineDash: number[] | null;
  }

  export class KeyboardUtils {
    public static KEY_ENTER: string;
  }

  export class Display {
    public constructor( rootNode: scenery.Node, options?: IntentionalAny );

    public updateOnRequestAnimationFrame( callback: IntentionalAny ): void;

    public initializeEvents(): void;

    public readonly domElement: HTMLElement;
    public width: number;
    public height: number;
  }

  export class SpriteSheet {
    public static readonly MAX_DIMENSION: dot.Dimension2;
  }

  export var Utils: IntentionalAny;
}

declare namespace _ {
  export function extend( destination: IntentionalAny, source: IntentionalAny );

  export function merge( destination: IntentionalAny, source: IntentionalAny );
  export function merge( destination: IntentionalAny, source: IntentionalAny, others: IntentionalAny );

  export function sample( collection: IntentionalAny[] );
  export function countBy( collection: IntentionalAny, callback: IntentionalAny );

  export function noop(): void;

  export function find( collection: IntentionalAny, callback: IntentionalAny );
  export function pull( collection: IntentionalAny, values: IntentionalAny );
}