import Screen from './Screen';
import CrossFade from './crossfade/CrossFade';
import LoadingScreen from './screens/loading/LoadingScreen';

class Cathedral {
  private readonly display: scenery.Display;

  private readonly screenLayer: scenery.Node;
  private readonly topLayer: scenery.Node;

  private readonly crossFade: CrossFade;

  // @ts-ignore - This will get set by a function call, but for the typing I don't want it to be nullable
  private activeScreen: Screen;

  // The list of screens that are going to be disposed, but still need to be stepped.
  private disposingScreens: Screen[] = [];

  private pendingScreen: Screen | null = null;

  public constructor() {

    // A hack to support a larger sprite sheet for this application.
    // TODO: Request that this is configurable in scenery? Or use fewer assets in each screen?
    scenery.SpriteSheet.MAX_DIMENSION.set( new dot.Dimension2( 2048, 2048 ) );

    // scenery workaround for consistent requestAnimationFrame
    scenery.Utils.polyfillRequestAnimationFrame();

    // set up the display
    const rootNode = new scenery.Node();
    this.display = new scenery.Display( rootNode, {
      backgroundColor: 'rgb(27,32,51)',
      allowWebGL: true,
      accessibility: false
    } );
    this.display.initializeEvents();
    document.body.appendChild( this.display.domElement );

    // set up animation
    this.display.updateOnRequestAnimationFrame( ( dt: number ) => {
      this.step( dt );
    } );

    this.topLayer = new scenery.Node();
    this.screenLayer = new scenery.Node();
    rootNode.children = [ this.screenLayer, this.topLayer ];

    // add the cross-fade Rectangle
    this.crossFade = new CrossFade();
    this.topLayer.addChild( this.crossFade.view );

    // resize support, trigger layout for active screens and fit to window
    const resizeListener = () => {
      this.layout();
    };
    window.addEventListener( 'resize', resizeListener );
    resizeListener();
  }

  /**
   * Begin the transition to a new screen. This does NOT immediately make the new screen active.
   */
  public async transitionToScreen( screen: Screen ): Promise<void> {
    if ( this.pendingScreen === null ) {
      this.pendingScreen = screen;

      // eagerly fade "in" so the cross-fade covers the screen
      this.crossFade.model.fadeIn();

      // when the fade ends, load the next screen
      const firstFadeInListener = () => {
        this.crossFade.model.fadeInCompleteEmitter.removeListener( firstFadeInListener );

        // activate the loading screen now
        this.activateScreen( new LoadingScreen() );

        // fade back to the loading screen
        this.crossFade.model.fadeOut();

        // when the loading screen is visible, start loading the next screen
        const loadingFadeOutCompleteListener = async () => {
          this.crossFade.model.fadeOutCompleteEmitter.removeListener( loadingFadeOutCompleteListener );

          // instantiate/initialize the next Screen and its assets
          screen.asyncLoad().then( async () => {

            // the screen finished loading, use the cross-fade to transition to it
            this.crossFade.model.fadeIn();

            // after full fade, activate the screen
            const finalFadeInListener = () => {
              this.crossFade.model.fadeInCompleteEmitter.removeListener( finalFadeInListener );
              this.activateChangeableScreen( screen );

              this.crossFade.model.fadeOut();
            };

            // done fading out of the loading screen, transition to the next screen
            this.crossFade.model.fadeInCompleteEmitter.addListener( finalFadeInListener );
          } ).catch( error => {

            // Promise error handling
            console.log( error );
          } );
        };

        // done fading to the loading screen, start loading the next screen
        this.crossFade.model.fadeOutCompleteEmitter.addListener( loadingFadeOutCompleteListener );
      };

      // done fading from previous screen, start fading into the loading screen
      this.crossFade.model.fadeInCompleteEmitter.addListener( firstFadeInListener );
    }
  }

  /**
   * Make the provided screen active by setting it as such and adding its content to the display.
   */
  private activateScreen( screen: Screen ) {
    assert && assert( screen !== this.activeScreen, 'About to remove and dispose new screen?' );

    // dispose of the old screen
    if ( this.activeScreen ) {
      this.disposeOfScreen( this.activeScreen );
    }

    this.activeScreen = screen;
    this.screenLayer.addChild( this.activeScreen.view );
    this.pendingScreen = null;

    this.layout();
  }

  /**
   * Remove the Screen from the display and then begin the dispose sequence. There may be tear-down animation
   * or more work to do so we begin that, then wait for the screen to let us know when it is time to fully dispose.
   * Screens that are being disposed are still stepped until the final disposal.
   */
  private disposeOfScreen( screen: Screen ) {
    this.screenLayer.removeChild( screen.view );
    this.disposingScreens.push( screen );

    const readyForDisposeListener = () => {
      screen.readyForDisposeEmitter.removeListener( readyForDisposeListener );
      screen.dispose();

      const indexOfScreen = this.disposingScreens.indexOf( screen );
      this.disposingScreens.splice( indexOfScreen, 1 );
    };
    screen.readyForDisposeEmitter.addListener( readyForDisposeListener );

    screen.beginDispose();
  }

  /**
   * Activate a "changeable" screen, adding it to the display and also adding a listener that will initiate
   * loading a new screen if Screen notifies it is time for that.
   */
  public activateChangeableScreen( screen: Screen ): void {
    this.activateScreen( screen );

    // Will be cleared next screen activation in activeScreen.dispose
    // TODO: Potential memory leak...we don't remove this listener and we never tear down previous screen
    this.activeScreen.model.screenChangeEmitter.addListener( async nextScreen => {
      await this.transitionToScreen( nextScreen );
    } );
  }

  private layout(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Gracefully support bad dimensions
    if ( width === 0 || height === 0 ) {
      return;
    }

    this.display.width = width;
    this.display.height = height;

    if ( this.activeScreen ) {
      this.activeScreen.layout( width, height );
      this.crossFade.layout( width, height );
    }
  }

  private step( dt: number ) {

    // on startup, scenery updates with a dt of zero?
    if ( dt > 0 ) {

      // cap the largest animation frame (like when the tab is in the background) - in seconds
      dt = Math.min( dt, 0.05 );

      // steps model then view
      if ( this.activeScreen ) {
        this.activeScreen.step( dt );
      }

      // we need to keep stepping screens that are being disposed so that fades look smooth
      this.disposingScreens.forEach( screen => {
        screen.step( dt );
      } );

      // step the cross-fader
      this.crossFade.step( dt );
    }
  }

  public start(): void {
    // TODO:
    // Possibly this is a better entry point for sounds.
  }
}

export default Cathedral;