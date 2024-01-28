import TitleView from './view/TitleView';
import Screen from '../../Screen';
import TitleModel from './model/TitleModel';

class TitleScreen extends Screen {
  public constructor() {
    const titleModel = new TitleModel();
    const titleView = new TitleView( titleModel );

    super( titleModel, titleView );
  }
}

export default TitleScreen;