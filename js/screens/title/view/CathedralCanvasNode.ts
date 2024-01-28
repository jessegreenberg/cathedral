import SceneryImageLoader from '../../common/interface/SceneryImageLoader';
import Harp1PlayerCanvasImageDrawable from './Harp1PlayerCanvasImageDrawable';
import HornPlayerCanvasImageDrawable from './HornPlayerCanvasImageDrawable';
import Harp2PlayerCanvasImageDrawable from './Harp2PlayerCanvasImageDrawable';
import PianoPlayerCanvasImageDrawable from './PianoPlayerCanvasImageDrawable';
import DrumPlayerCanvasImageDrawable from './DrumPlayerCanvasImageDrawable';
import BassPlayerCanvasImageDrawable from './BassPlayerCanvasImageDrawable';
import TitleModel from '../model/TitleModel';

const CATHEDRAL_IMAGE_PATH = './images/cathedral-background-3.png';
const SKY_IMAGE_PATH = './images/cathedral-sky-3.png';

const CATHEDRAL_ASPECT_RATIO = 1800 / 1200;
const PLAYER_IMAGE_WIDTH = 360;
const PLAYER_IMAGE_HEIGHT = 288;

// We create a new comet at this interval (when all are playing), in seconds
const COMET_CREATION_INTERVAL = 0.3;

const MAX_COMETS = 30;

export default class CathedralCanvasNode extends scenery.CanvasNode {

  // Controls the vertical pan of the cathedral so we can see comets better
  private readonly verticalPanProperty = new axon.NumberProperty( 0 );

  // A shade we put over the cathedral to make the players stand out more. Public
  // so that other Nodes matching the shade can change at the same time and look
  // the same.
  public readonly shadeOpacityProperty = new axon.NumberProperty( 0 );

  private shadeAnimation: twixt.Animation | null = null;
  private cathedralAnimation: twixt.Animation | null = null;

  private offscreenSkyCanvas: HTMLCanvasElement;
  private offscreenSkyContext: CanvasRenderingContext2D | null;

  private offscreenCathedralCanvas: HTMLCanvasElement;
  private offscreenCathedralContext: CanvasRenderingContext2D | null;

  private cometBounds = new dot.Bounds2( 0, 0, 0, 0 );

  private sceneLeft = 0;
  private sceneTop = 0;

  private timeSinceCreatingComet = 0;

  private readonly harp1Player: Harp1PlayerCanvasImageDrawable;
  private readonly hornPlayer: HornPlayerCanvasImageDrawable;
  private readonly harp2Player: Harp2PlayerCanvasImageDrawable;
  private readonly pianoPlayer: PianoPlayerCanvasImageDrawable;
  private readonly drumPlayer: DrumPlayerCanvasImageDrawable;
  private readonly bassPlayer: BassPlayerCanvasImageDrawable;

  private readonly comets: Comet[] = [];

  private readonly model: TitleModel;

  public constructor( model: TitleModel ) {
    super();

    this.model = model;

    this.harp1Player = new Harp1PlayerCanvasImageDrawable( model.harp1StateProperty );
    this.hornPlayer = new HornPlayerCanvasImageDrawable( model.hornStateProperty );
    this.harp2Player = new Harp2PlayerCanvasImageDrawable( model.harp2StateProperty );
    this.pianoPlayer = new PianoPlayerCanvasImageDrawable( model.pianoStateProperty );
    this.drumPlayer = new DrumPlayerCanvasImageDrawable( model.drumStateProperty );
    this.bassPlayer = new BassPlayerCanvasImageDrawable( model.bassStateProperty );

    const allPlayers = [
      this.harp1Player,
      this.hornPlayer,
      this.harp2Player,
      this.pianoPlayer,
      this.drumPlayer,
      this.bassPlayer
    ];

    this.offscreenSkyCanvas = document.createElement( 'canvas' );
    this.offscreenSkyContext = this.offscreenSkyCanvas.getContext( '2d' );

    this.offscreenCathedralCanvas = document.createElement( 'canvas' );
    this.offscreenCathedralContext = this.offscreenCathedralCanvas.getContext( '2d' );

    // handle input to activate the players
    this.addInputListener( {
      down: ( event: scenery.SceneryEvent ) => {
        const point = event.pointer.point;
        for ( const playerDrawable of allPlayers ) {
          if ( playerDrawable.containsPoint( point ) ) {
            playerDrawable.toggleState();
          }
        }
      },
      move: ( event: scenery.SceneryEvent ) => {
        const point = event.pointer.point;
        this.cursor = 'pointer';

        for ( const playerDrawable of allPlayers ) {
          if ( playerDrawable.containsPoint( point ) ) {
            this.cursor = 'pointer';
            break;
          }
          else {
            this.cursor = 'default';
          }
        }
      }
    } );

    // When all are playing, make the cathedral pan down and reduce the opacity of the sky
    model.allPlayingProperty.link( allPlaying => {
      this.cathedralAnimation && this.cathedralAnimation.stop();
      this.shadeAnimation && this.shadeAnimation.stop();

      if ( allPlaying ) {
        this.cathedralAnimation = new twixt.Animation( {
          property: this.verticalPanProperty,
          duration: 2,
          from: this.verticalPanProperty.value,
          to: this.canvasBounds.height * 0.6,
          easing: twixt.Easing.QUADRATIC_IN_OUT
        } );

        this.shadeAnimation = new twixt.Animation( {
          property: this.shadeOpacityProperty,
          from: 0.7,
          to: 0,
          duration: 1,
          easing: twixt.Easing.CUBIC_IN_OUT
        } );

        this.shadeAnimation.then( this.cathedralAnimation );
        this.shadeAnimation.start();
      }
      else {
        this.cathedralAnimation = new twixt.Animation( {
          property: this.verticalPanProperty,
          duration: 2,
          from: this.verticalPanProperty.value,
          to: 0,
          easing: twixt.Easing.QUADRATIC_IN_OUT
        } );

        this.shadeAnimation = new twixt.Animation( {
          property: this.shadeOpacityProperty,
          from: 0,
          to: 0.7,
          duration: 0.7,
          easing: twixt.Easing.CUBIC_IN_OUT
        } );

        const fadeOutFinishListener = () => {
          this.comets.length = 0;
          this.shadeAnimation?.finishEmitter.removeListener( fadeOutFinishListener );
        };
        this.shadeAnimation.finishEmitter.addListener( fadeOutFinishListener );

        this.cathedralAnimation.then( this.shadeAnimation );
        this.cathedralAnimation.start();
      }
    } );

    // redraw the static content when the pan changes
    axon.Multilink.lazyMultilink( [ this.verticalPanProperty, this.shadeOpacityProperty ], () => {
      this.paintStaticContent();
    } );
  }

  layout( width: number, height: number ) {

    // limit the bounds by the asset dimensions for performance
    const limitWidth = Math.min( width, 1800 );
    const limitHeight = limitWidth / CATHEDRAL_ASPECT_RATIO;

    this.sceneTop = height - limitHeight;

    this.setCanvasBounds( new dot.Bounds2( 0, this.sceneTop, width, height ) ); // remember width and height are max values

    this.offscreenSkyCanvas.width = width;
    this.offscreenSkyCanvas.height = height;

    this.offscreenCathedralCanvas.width = width;
    this.offscreenCathedralCanvas.height = height;

    // bounds for comets, initially placed within these bounds and then removed when leaves the bounds
    this.cometBounds.setMinMax( -width / 4, this.sceneTop - limitHeight / 4, width * 5 / 4, this.sceneTop + limitHeight * 5 / 4 );

    this.paintStaticContent();
    this.invalidatePaint();
  }

  /**
   * Implemented so that this Node can receive input from scenery (otherwise skipped for performance reasons).
   * @param point
   */
  containsPointSelf( point: dot.Vector2 ): boolean {
    return this.canvasBounds.containsPoint( point );
  }

  /**
   * Redraw every animation frame.
   * @param dt
   */
  step( dt: number ) {
    this.harp1Player.step( dt );
    this.hornPlayer.step( dt );
    this.harp2Player.step( dt );
    this.pianoPlayer.step( dt );
    this.drumPlayer.step( dt );
    this.bassPlayer.step( dt );

    // shallow copy because we modify the array
    const cometsCopy = this.comets.slice();
    for ( const comet of cometsCopy ) {

      // move the comet forward
      comet.x += comet.speed;
      comet.y += comet.speed * 0.5;

      if ( !this.cometBounds.containsCoordinates( comet.x, comet.y ) ) {
        this.comets.splice( this.comets.indexOf( comet ), 1 );
      }
    }

    // Randomly add a new comet infrequently
    this.timeSinceCreatingComet += dt;
    if ( this.comets.length < MAX_COMETS && this.model.allPlayingProperty.value && this.timeSinceCreatingComet > COMET_CREATION_INTERVAL ) {
      this.comets.push( new Comet(
        this.cometBounds.minX + Math.random() * this.cometBounds.width / 4,
        this.cometBounds.minY + Math.random() * this.cometBounds.height / 4
      ) );
      this.timeSinceCreatingComet = 0;
    }

    this.invalidatePaint();
  }

  public paintCanvas( context: CanvasRenderingContext2D ): void {

    // Draw the static sky from the offscreen canvas since it rarely changes
    context.drawImage( this.offscreenSkyCanvas, 0, 0 );

    // limit the width and height so that the full scene is in view
    const width = Math.min( this.canvasBounds.width, 1800 );
    const height = width / CATHEDRAL_ASPECT_RATIO;
    const displayedScale = width / 1800;

    const playerWidth = PLAYER_IMAGE_WIDTH * displayedScale;
    const playerHeight = PLAYER_IMAGE_HEIGHT * displayedScale;

    // center the content horizontally
    const horizontalPan = ( this.canvasBounds.width - width ) / 2;

    // draw the comets
    for ( let i = 0; i < this.comets.length; i++ ) {
      const comet = this.comets[ i ];
      context.fillStyle = comet.color.toCSS();
      context.fillRect( comet.x, comet.y, comet.size, comet.size );

      // draw the comet tail
      for ( let j = 0; j < comet.length; j++ ) {
        context.fillStyle = `rgba( ${comet.color.r}, ${comet.color.g}, ${comet.color.b}, ${1 - j / comet.length} )`;
        context.fillRect( comet.x - j, comet.y - j / 2, 1, 1 );
      }
    }

    // Draw the static cathedral from the offscreen canvas since it rarely changes
    context.drawImage( this.offscreenCathedralCanvas, 0, 0 );

    // draw the players
    const firstRowHeight = this.canvasBounds.height - playerHeight - height * 0.285 + this.sceneTop;
    this.harp1Player.draw( context, horizontalPan + width * 0.1, firstRowHeight, playerWidth, playerHeight );
    this.hornPlayer.draw( context, horizontalPan + width * 0.5 - playerWidth / 2, firstRowHeight, playerWidth, playerHeight );
    this.harp2Player.draw( context, horizontalPan + width * 0.9 - playerWidth, firstRowHeight, playerWidth, playerHeight );

    const secondRowHeight = this.canvasBounds.height - playerHeight - height * 0.02 + this.sceneTop;
    this.pianoPlayer.draw( context, horizontalPan + width * 0.15 - playerWidth / 2, secondRowHeight, playerWidth, playerHeight );
    this.bassPlayer.draw( context, horizontalPan + width * 0.85 - playerWidth / 2, secondRowHeight, playerWidth, playerHeight );
    this.drumPlayer.draw( context, horizontalPan + width * 0.5 - playerWidth / 2, secondRowHeight, playerWidth, playerHeight );
  }

  /**
   * Paint the static background layers which don't change much. Putting them on an offscreen canvas means
   * less draw calls and hopefully better performance every animation frame.
   */
  paintStaticContent() {

    // amount of vertical panning, mimicking a camera with some parallax
    const cathedralPan = this.verticalPanProperty.value;
    const skyPan = this.verticalPanProperty.value * 0.1;

    // limit the width and height so that the full scene is in view
    const width = Math.min( this.canvasBounds.width, 1800 );
    const height = width / CATHEDRAL_ASPECT_RATIO;

    // center the content horizontally
    const horizontalPan = ( this.canvasBounds.width - width ) / 2;

    // when horizontalPan is zero, the images should be along the bottom of the window
    const verticalPan = this.canvasBounds.height - height;

    // clear the canvases
    this.offscreenSkyContext?.clearRect( 0, 0, this.offscreenSkyCanvas.width, this.offscreenSkyCanvas.height );
    this.offscreenCathedralContext?.clearRect( 0, 0, this.offscreenCathedralCanvas.width, this.offscreenCathedralCanvas.height );

    const skyImage = SceneryImageLoader.getLoadedImage( SKY_IMAGE_PATH );
    this.offscreenSkyContext?.drawImage( skyImage, horizontalPan, verticalPan + skyPan + this.sceneTop, width, height );

    const cathedralImage = SceneryImageLoader.getLoadedImage( CATHEDRAL_IMAGE_PATH );
    this.offscreenCathedralContext?.drawImage( cathedralImage, horizontalPan, verticalPan + cathedralPan + this.sceneTop, width, height );

    // A shade over the cathedral to make the players stand out more
    if ( this.offscreenCathedralContext ) {
      this.offscreenCathedralContext.fillStyle = `rgba( 0, 0, 0, ${this.shadeOpacityProperty.value} )`;
      this.offscreenCathedralContext.fillRect( 0, this.sceneTop, this.canvasBounds.width, this.canvasBounds.height );
    }
  }

  public static async load() {

    // load all images that are used in this class
    await SceneryImageLoader.loadImage( CATHEDRAL_IMAGE_PATH );
    await SceneryImageLoader.loadImage( SKY_IMAGE_PATH );

    await Harp1PlayerCanvasImageDrawable.load();
    await HornPlayerCanvasImageDrawable.load();
    await Harp2PlayerCanvasImageDrawable.load();
    await PianoPlayerCanvasImageDrawable.load();
    await DrumPlayerCanvasImageDrawable.load();
    await BassPlayerCanvasImageDrawable.load();
  }
}

// Inner class representing the comet that we will draw on the canvas
class Comet {
  public x: number;
  public y: number;
  public speed: number;
  public length: number
  public color: scenery.Color;
  public colorString: string;
  public size: number

  public constructor( initialX: number, initialY: number ) {

    // a mix of white and blue from teh palette
    const color = Math.random() > 0.5 ? `rgba( 235, 237, 230, ${0.5 + Math.random() * 0.5} )` :
                  `rgba( 184, 222, 231, ${0.5 + Math.random() * 0.5} )`;


    this.x = initialX;
    this.y = initialY;
    this.speed = 0.3 + Math.random() * 2.5;
    this.length = 100 + Math.random() * 150;
    this.color = new scenery.Color( color );
    this.colorString = this.color.toCSS();
    this.size = 3 + Math.random() * 3;
  }
}