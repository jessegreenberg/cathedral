import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const HARP_1_PLAYING_IMAGE_PATHS = [
  './images/harp1/playing/harp1.png',
  './images/harp1/playing/harp2.png',
  './images/harp1/playing/harp3.png',
  './images/harp1/playing/harp4.png',
  './images/harp1/playing/harp5.png',
  './images/harp1/playing/harp6.png',
  './images/harp1/playing/harp7.png',
  './images/harp1/playing/harp8.png',
  './images/harp1/playing/harp9.png',
  './images/harp1/playing/harp10.png',
  './images/harp1/playing/harp11.png',
  './images/harp1/playing/harp12.png',
  './images/harp1/playing/harp13.png',
  './images/harp1/playing/harp14.png',
  './images/harp1/playing/harp15.png',
  './images/harp1/playing/harp16.png',
  './images/harp1/playing/harp17.png'
];

const HARP_1_BOOTING_IMAGE_PATHS = [
  './images/harp1/booting/harp1-bootup1.png',
  './images/harp1/booting/harp1-bootup2.png',
  './images/harp1/booting/harp1-bootup3.png',
  './images/harp1/booting/harp1-bootup4.png',
  './images/harp1/booting/harp1-bootup5.png',
  './images/harp1/booting/harp1-bootup6.png',
  './images/harp1/booting/harp1-bootup7.png',
  './images/harp1/booting/harp1-bootup8.png',
  './images/harp1/booting/harp1-bootup9.png',
  './images/harp1/booting/harp1-bootup10.png',
  './images/harp1/booting/harp1-bootup11.png',
  './images/harp1/booting/harp1-bootup12.png',
  './images/harp1/booting/harp1-bootup13.png',
  './images/harp1/booting/harp1-bootup14.png',
  './images/harp1/booting/harp1-bootup15.png',
  './images/harp1/booting/harp1-bootup16.png'
];

export default class Harp1PlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string> ) {
    super( stateProperty, 0.13, HARP_1_PLAYING_IMAGE_PATHS, HARP_1_BOOTING_IMAGE_PATHS );
  }

  public static async load() {
    await Promise.all( HARP_1_PLAYING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( HARP_1_BOOTING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}