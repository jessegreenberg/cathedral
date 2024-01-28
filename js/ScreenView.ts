/**
 * Base class for the view of a screen in an application.
 */

import ScreenModel from './ScreenModel';

class ScreenView extends scenery.Node {
  protected readonly model: ScreenModel;
  public readonly readyForDisposeEmitter = new axon.Emitter();

  // A layer for everything that should be displayed in the pop-up layer.
  // Protected so that subclasses can layer into the scene graph as they wish,
  // and so that they can add their own nodes to it.
  protected readonly modalPaneLayer = new scenery.Node();
  private barrierRectangle = new scenery.Plane( { fill: 'rgba(0,0,0,0.6)' } );

  public constructor( model: ScreenModel ) {
    super();
    this.model = model;

    // Layer for modal dialogs and other UI components
    this.modalPaneLayer = new scenery.Node();

    this.modalPaneLayer.addChild( this.barrierRectangle );
  }

  public layout( width: number, height: number ): void {
    // To be overridden in subtypes
  }

  public step( dt: number ): void {
    // To be overridden in subtypes
  }

  /**
   * This is where all artwork, sounds, and other assets should be instantiated
   * and loaded, and added to the scene graph.
   */
  public async asyncLoad(): Promise<void> {

    // To be override in subtypes
    return new Promise( ( resolve, reject ) => resolve );
  }

  /**
   * This is where all view components are added to the scene (after the load step).
   */
  protected async asyncInitialize(): Promise<boolean> {

    // To be overridden in subtypes
    return new Promise( ( resolve, reject ) => resolve );
  }

  public override dispose(): void {
    super.dispose();
    this.readyForDisposeEmitter.dispose();
  }
}

export default ScreenView;