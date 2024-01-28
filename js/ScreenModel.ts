/**
 * Base class for a model that represents a screen.
 */

export type ScreenModelOptions = {
  loadable?: boolean;
};

class ScreenModel {
  public readonly screenChangeEmitter = new axon.Emitter( {
    parameters: [ { valueType: Screen } ]
  } );

  public transitioningScreens = false;

  // Emits when it is time to dispose this model (likely from a screen transition).
  public readonly readyForDisposeEmitter = new axon.Emitter();

  // If true, we will try to load some state from the database when it is time to load the
  // associated screen.
  public readonly loadable;

  // If true, the screen has complete loaded (only relevant for loadable screens).
  public loaded = false;

  // For all models, the amount of time that this model has been running for
  public elapsedTimeProperty = new axon.Property( 0 );

  public constructor( providedOptions?: ScreenModelOptions ) {
    const options = _.merge( {
      loadable: false
    }, providedOptions );
    this.loadable = options.loadable;
  }

  public step( dt: number ): void {
    this.elapsedTimeProperty.value = this.elapsedTimeProperty.value + dt;
  }

  /**
   * Implementation of the state saving so this model can be restored.
   * Returns a JSON object that can be passed to load().
   */
  public save(): IntentionalAny {
    throw new Error( 'Must be overridden in subclasses' );
  }

  /**
   * Implementation of the state loading so this model can be restored.
   */
  public load( stateObject: IntentionalAny ): void {
    throw new Error( 'Must be overridden in subclasses' );
  }

  public dispose(): void {
    this.screenChangeEmitter.dispose();
    this.readyForDisposeEmitter.dispose();
  }
}

export default ScreenModel;