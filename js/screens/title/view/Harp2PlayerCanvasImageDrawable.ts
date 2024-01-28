import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const HARP_2_PLAYING_IMAGE_PATHS = [
  './images/harp2/playing/harp1.png',
  './images/harp2/playing/harp2.png',
  './images/harp2/playing/harp3.png',
  './images/harp2/playing/harp4.png',
  './images/harp2/playing/harp5.png',
  './images/harp2/playing/harp6.png',
  './images/harp2/playing/harp7.png',
  './images/harp2/playing/harp8.png',
  './images/harp2/playing/harp9.png',
  './images/harp2/playing/harp10.png',
  './images/harp2/playing/harp11.png',
  './images/harp2/playing/harp12.png',
  './images/harp2/playing/harp13.png',
  './images/harp2/playing/harp14.png',
  './images/harp2/playing/harp15.png',
  './images/harp2/playing/harp16.png'
];

const HARP_2_BOOTING_IMAGE_PATHS = [
  './images/harp2/booting/harp2-bootup-1.png',
  './images/harp2/booting/harp2-bootup-2.png',
  './images/harp2/booting/harp2-bootup-3.png',
  './images/harp2/booting/harp2-bootup-4.png',
  './images/harp2/booting/harp2-bootup-5.png',
  './images/harp2/booting/harp2-bootup-6.png',
  './images/harp2/booting/harp2-bootup-7.png',
  './images/harp2/booting/harp2-bootup-8.png',
  './images/harp2/booting/harp2-bootup-9.png',
  './images/harp2/booting/harp2-bootup-10.png',
  './images/harp2/booting/harp2-bootup-11.png'
];

export default class Harp2PlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string>  ) {
    super( stateProperty, 0.13, HARP_2_PLAYING_IMAGE_PATHS, HARP_2_BOOTING_IMAGE_PATHS );
  }

  public static async load() {
    await Promise.all( HARP_2_PLAYING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( HARP_2_BOOTING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}