/**
 * Draws a single character to a canvas context. Players are drawn and animated with Canvas to support
 * better animation performance.
 */

import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

export default class PlayerCanvasImageDrawable {

  // How long we have displayed the current image in the animation sequence
  public readonly imageDisplayTimeProperty = new axon.NumberProperty( 0 );

  // The current image displayed in the animation sequence
  public readonly imageIndexProperty = new axon.NumberProperty( 0 );

  public readonly timeBootingProperty = new axon.NumberProperty( 0 );

  private static readonly BOOT_TIME = 2;

  // The amount of time between each image for animation
  public readonly timePerImage: number;

  private readonly playingImagePaths: string[];
  private readonly bootingImagePaths: string[];

  private drawableBounds: dot.Bounds2;

  private readonly stateProperty: axon.Property<string>;

  public constructor( stateProperty: axon.Property<string>, timePerImage: number, playingImagePaths: string[], bootingImagePaths: string[] ) {
    this.imageDisplayTimeProperty.value = 0;
    this.imageIndexProperty.value = 0;

    this.timePerImage = timePerImage;
    this.playingImagePaths = playingImagePaths;
    this.bootingImagePaths = bootingImagePaths;

    this.drawableBounds = new dot.Bounds2( 0, 0, 0, 0 );

    this.stateProperty = stateProperty;
  }

  public toggleState() {
    if ( this.stateProperty.value === 'playing' || this.stateProperty.value === 'booting' ) {
      this.stateProperty.value = 'off';
    }
    else {
      this.stateProperty.value = 'booting';
    }

    this.imageDisplayTimeProperty.value = 0;
    this.imageIndexProperty.value = 0;
  }

  draw( context: CanvasRenderingContext2D, left: number, top: number, width: number, height: number ) {

    const imagePath = this.getActiveImagePaths()[ this.imageIndexProperty.value ];
    if ( !imagePath ) {
      throw new Error( 'No image path for index: ' + this.imageIndexProperty.value );
    }

    const playerImage = SceneryImageLoader.getLoadedImage( imagePath );
    context.drawImage( playerImage, left, top, width, height );

    // draw a brown border around the image
    context.strokeStyle = 'rgb(248,243,227)';
    context.lineWidth = 6;
    context.strokeRect( left, top, width, height );

    // if the state is off, draw a transaprent black rectangle over the image
    if ( this.stateProperty.value === 'off' ) {
      context.fillStyle = 'rgba(0,0,0,0.5)';
      context.fillRect( left, top, width, height );
    }

    this.drawableBounds.setMinMax( left, top, left + width, top + height );
  }

  public containsPoint( point: dot.Vector2 ): boolean {
    return this.drawableBounds.containsPoint( point );
  }

  private getActiveImagePaths() {
    return this.stateProperty.value === 'playing' ? this.playingImagePaths : this.bootingImagePaths;
  }

  public step( dt: number ) {

    if ( this.stateProperty.value !== 'off' ) {
      this.imageDisplayTimeProperty.value += dt;

      if ( this.stateProperty.value === 'booting' ) {
        this.timeBootingProperty.value += dt;
        if ( this.timeBootingProperty.value > PlayerCanvasImageDrawable.BOOT_TIME ) {
          this.stateProperty.value = 'playing';
          this.timeBootingProperty.value = 0;
        }
      }

      if ( this.imageDisplayTimeProperty.value > this.timePerImage ) {
        this.imageDisplayTimeProperty.value = 0;

        if ( this.stateProperty.value === 'booting' ) {
          this.imageIndexProperty.value = Math.min( this.imageIndexProperty.value + 1, this.bootingImagePaths.length - 1 );
        }
        else {
          this.imageIndexProperty.value = ( this.imageIndexProperty.value + 1 ) % this.playingImagePaths.length;
        }
      }
    }
  }
}