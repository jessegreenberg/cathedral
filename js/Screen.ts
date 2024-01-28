/**
 * Base class for a screen in an application.
 */

import ScreenModel from './ScreenModel';
import ScreenView from './ScreenView';

class Screen {
  public readonly model: ScreenModel;
  public readonly view: ScreenView;

  public readonly readyForDisposeEmitter = new axon.Emitter();

  public constructor( model: ScreenModel, view: ScreenView ) {
    this.model = model;
    this.view = view;
  }

  public layout( width: number, height: number ): void {
    this.view.layout( width, height );
  }

  public step( dt: number ): void {
    this.model.step( dt );
    this.view.step( dt );
  }

  public async asyncLoad(): Promise<void> {
    await this.view.asyncLoad();
  }

  /**
   * Override in subtypes to emit the readyForDisposeEmitter when the screen is ready to
   * be disposed. By default, this emits immediately.
   */
  public beginDispose(): void {
    this.readyForDisposeEmitter.emit();
  }

  public dispose(): void {
    this.model.dispose();
    this.view.dispose();
  }
}

export default Screen;