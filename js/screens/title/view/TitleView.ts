/**
 * Main entry point for the view specific to this application. Sets up sounds and the main canvas for drawing
 * everything.
 */

import ScreenView from '../../../ScreenView';
import CathedralCanvasNode from './CathedralCanvasNode';
import TitleModel from '../model/TitleModel';
import LoopableSound from '../../../audio/LoopableSound';

class TitleView extends ScreenView {

  private availableWidth: number | null = null;
  private availableHeight: number | null = null;

  private readonly backgroundShadeRectangle: scenery.Rectangle;

  private readonly bassSound: LoopableSound;
  private readonly drumSound: LoopableSound;
  private readonly harp1Sound: LoopableSound;
  private readonly harp2Sound: LoopableSound;
  private readonly hornSound: LoopableSound;
  private readonly pianoSound: LoopableSound;

  private readonly cathedralCanvasNode: CathedralCanvasNode;

  public constructor( titleModel: TitleModel ) {
    super( titleModel );

    // For performance reasons, the canvas takes up a small portion of the screen. So this shade rectangle is added
    // to create the illusion that the screen is continuous
    this.backgroundShadeRectangle = new scenery.Rectangle( 0, 0, 0, 0, {
      fill: 'rgb(0,0,0)'
    } );
    this.addChild( this.backgroundShadeRectangle );

    this.cathedralCanvasNode = new CathedralCanvasNode( titleModel );
    this.addChild( this.cathedralCanvasNode );

    this.bassSound = new LoopableSound( './sounds/bass.mp3', 0 );
    this.drumSound = new LoopableSound( './sounds/drums.mp3', 0 );
    this.harp1Sound = new LoopableSound( './sounds/bell1.mp3', 0 );
    this.harp2Sound = new LoopableSound( './sounds/bell2.mp3', 0 );
    this.hornSound = new LoopableSound( './sounds/horn.mp3', 0 );
    this.pianoSound = new LoopableSound( './sounds/piano.mp3', 0 );

    const createSoundListener = ( loopableSound: LoopableSound ) => {
      return ( playingState: string ) => {
        if ( playingState === 'playing' ) {
          loopableSound.rampToOutputLevel( 1, 1 );
        }
        else {
          loopableSound.rampToOutputLevel( 0, 1 );
        }
      }
    };

    titleModel.bassStateProperty.link( createSoundListener( this.bassSound ) );
    titleModel.drumStateProperty.link( createSoundListener( this.drumSound ) );
    titleModel.harp1StateProperty.link( createSoundListener( this.harp1Sound ) );
    titleModel.harp2StateProperty.link( createSoundListener( this.harp2Sound ) );
    titleModel.hornStateProperty.link( createSoundListener( this.hornSound ) );
    titleModel.pianoStateProperty.link( createSoundListener( this.pianoSound ) );

    // update extra shade when cathedral canvas changes
    this.cathedralCanvasNode.shadeOpacityProperty.link( opacity => {
      this.backgroundShadeRectangle.fill = `rgba(0,0,0,${opacity})`;
    } );

    // As soon as one of the players begins to play, we start playing music - this is a way to
    // get around the autoplay policy, because the user has to interact with the page to start
    // the music.
    const startMusic = () => {

      // The sounds have two playthroughs. We loop back to the middle (start of the second playthrough) so that
      // reverb from the first playthrough is heard. Otherwise, it sounds like things are cut off at the end.
      const playOptions = {
        loopStart: 54,
        loopEnd: 108
      }
      this.bassSound.play( playOptions );
      this.drumSound.play( playOptions );
      this.harp1Sound.play( playOptions );
      this.harp2Sound.play( playOptions );
      this.hornSound.play( playOptions );
      this.pianoSound.play( playOptions );

      // This should only happen once
      startListeningMultilink.dispose();
    }

    const startListeningMultilink = new axon.Multilink(
      [ titleModel.bassStateProperty,
        titleModel.drumStateProperty,
        titleModel.harp1StateProperty,
        titleModel.harp2StateProperty,
        titleModel.hornStateProperty,
        titleModel.pianoStateProperty
      ],
      ( bassState: string, drumState: string, harp1State: string, harp2State: string, hornState: string, pianoState: string ) => {
        if ( bassState === 'playing' || drumState === 'playing' || harp1State === 'playing' ||
             harp2State === 'playing' || hornState === 'playing' || pianoState === 'playing' ) {
          startMusic();
        }
      }
    );
  }

  /**
   * Load this view (loading sounds and images). The screen won't be shown until all of the assets are loaded.
   */
  public override async asyncLoad(): Promise<void> {

    // Load assets here.
    await CathedralCanvasNode.load();

    await this.bassSound.initialize();
    await this.drumSound.initialize();
    await this.harp1Sound.initialize();
    await this.harp2Sound.initialize();
    await this.hornSound.initialize();
    await this.pianoSound.initialize();
  }

  public override dispose(): void {
    super.dispose();
  }

  public override step( dt: number ): void {
    super.step( dt );

    this.cathedralCanvasNode.step( dt );

    this.bassSound.step( dt );
    this.drumSound.step( dt );
    this.harp1Sound.step( dt );
    this.harp2Sound.step( dt );
    this.hornSound.step( dt );
    this.pianoSound.step( dt );
  }

  public override layout( width: number, height: number ): void {
    this.availableHeight = height;
    this.availableWidth = width;

    this.backgroundShadeRectangle.setRect( 0, 0, width, height );

    this.cathedralCanvasNode.layout( width, height );
  }
}

export default TitleView;