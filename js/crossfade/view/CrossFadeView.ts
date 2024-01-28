import CrossFadeModel from '../model/CrossFadeModel';

class CrossFadeView extends scenery.Rectangle {
  public constructor( model: CrossFadeModel ) {
    super( 0, 0, 0, 0, {
      fill: 'black'
    } );

    model.crossFadeValueProperty.link( fadeValue => {
      this.opacity = fadeValue;

      // if zero, we can make it fully invisible (might improve performance)
      this.visible = fadeValue !== 0;
    } );
  }

  public layout( width: number, height: number ): void {
    this.setRectWidth( width );
    this.setRectHeight( height );

    this.leftTop = new dot.Vector2( 0, 0 );
  }
}

export default CrossFadeView;