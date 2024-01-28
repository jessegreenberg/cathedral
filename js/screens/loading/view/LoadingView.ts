import ScreenView from '../../../ScreenView';
import LoadingModel from '../model/LoadingModel';
import ModulifiedImageMap from '../../../ModulifiedImageMap';

class LoadingView extends ScreenView {
  private readonly loadingText: scenery.Text;

  private sceneryStackIcon = new scenery.Node();

  private availableWidth = 0;
  private availableHeight = 0;

  public constructor( loadingModel: LoadingModel ) {
    super( loadingModel );

    this.loadingText = new scenery.Text( 'Loading...', {
      font: new scenery.Font( { size: 80, family: 'DotGothic', boundsMethod: 'accurate' } ),
      fill: 'white'
    } );
    this.addChild( this.loadingText );

    // An image Node that displays the scenery stack icon
    const imageElement = document.createElement( 'img' );
    imageElement.onload = event => {
      const iconImage = new scenery.Image( imageElement, {
        scale: 0.3
      } );

      this.sceneryStackIcon.addChild( iconImage );

      const sceneryStackText = new scenery.Text( 'SceneryStack', {
        font: new scenery.Font( { size: 50, family: 'DotGothic', boundsMethod: 'accurate' } ),
        fill: 'white',
        centerTop: iconImage.centerBottom
      } );
      this.sceneryStackIcon.addChild( sceneryStackText );
      this.addChild( this.sceneryStackIcon );

      this.layout( this.availableWidth, this.availableHeight );
    }


    const src = ModulifiedImageMap[ './images/scenery-stack-icon.png' ];
    if ( !src ) {
      throw new Error( `No modulified image found for ${src}` );
    }
    imageElement.src = src;
  }

  public override layout( width: number, height: number ): void {
    this.availableWidth = width;
    this.availableHeight = height;
    this.loadingText.center = new dot.Vector2( width / 2, height / 4 );

    if ( this.sceneryStackIcon ) {
      this.sceneryStackIcon.maxHeight = height - this.loadingText.bottom - 10;
      this.sceneryStackIcon.centerBottom = new dot.Vector2( width / 2, height * 0.95 );
    }
  }
}

export default LoadingView;