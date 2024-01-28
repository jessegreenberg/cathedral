/**
 * Creates a cross-fade animation that looks nice for transitions. Add the view to your scene. Step this
 * CrossFade during animation. Use the model functions to start fade effects.
 */

import CrossFadeModel from './model/CrossFadeModel';
import CrossFadeView from './view/CrossFadeView';

class CrossFade {

  public readonly model: CrossFadeModel;
  public readonly view: CrossFadeView;

  public constructor() {
    this.model = new CrossFadeModel();
    this.view = new CrossFadeView( this.model );
  }


  public step( dt: number ): void {
    this.model.step( dt );
  }

  public layout( width: number, height: number ): void {
    this.view.layout( width, height );
  }
}

export default CrossFade;