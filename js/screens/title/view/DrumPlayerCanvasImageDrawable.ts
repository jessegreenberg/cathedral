import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const DRUM_PLAYING_PATHS = [
  './images/drums/playing/drums1.png',
  './images/drums/playing/drums2.png',
  './images/drums/playing/drums3.png',
  './images/drums/playing/drums4.png',
  './images/drums/playing/drums5.png',
  './images/drums/playing/drums6.png',
  './images/drums/playing/drums7.png',
  './images/drums/playing/drums8.png',
  './images/drums/playing/drums9.png',
  './images/drums/playing/drums10.png',
  './images/drums/playing/drums11.png',
  './images/drums/playing/drums12.png',
  './images/drums/playing/drums13.png',
  './images/drums/playing/drums14.png',
  './images/drums/playing/drums15.png',
  './images/drums/playing/drums16.png'
];

const DRUM_BOOTING_PATHS = [
  './images/drums/booting/drums-bootup-1.png',
  './images/drums/booting/drums-bootup-2.png',
  './images/drums/booting/drums-bootup-3.png',
  './images/drums/booting/drums-bootup-4.png',
  './images/drums/booting/drums-bootup-5.png',
  './images/drums/booting/drums-bootup-6.png',
  './images/drums/booting/drums-bootup-7.png',
  './images/drums/booting/drums-bootup-8.png',
  './images/drums/booting/drums-bootup-9.png',
  './images/drums/booting/drums-bootup-10.png'
];

export default class DrumPlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string> ) {
    super( stateProperty, 0.13, DRUM_PLAYING_PATHS, DRUM_BOOTING_PATHS );
  }

  public static async load() {
    await Promise.all( DRUM_PLAYING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( DRUM_BOOTING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}