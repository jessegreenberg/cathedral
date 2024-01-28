import LoadingModel from './model/LoadingModel';
import LoadingView from './view/LoadingView';
import Screen from '../../Screen';

class LoadingScreen extends Screen {
  public constructor() {
    const loadingModel = new LoadingModel();
    const loadingView = new LoadingView( loadingModel );
    super( loadingModel, loadingView );
  }
}

export default LoadingScreen;