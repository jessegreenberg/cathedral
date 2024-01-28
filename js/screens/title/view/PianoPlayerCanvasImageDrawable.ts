import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const PIANO_PLAYING_PATHS = [
  './images/piano/playing/piano1.png',
  './images/piano/playing/piano2.png',
  './images/piano/playing/piano3.png',
  './images/piano/playing/piano4.png',
  './images/piano/playing/piano5.png',
  './images/piano/playing/piano6.png',
  './images/piano/playing/piano7.png',
  './images/piano/playing/piano8.png',
  './images/piano/playing/piano9.png',
  './images/piano/playing/piano10.png',
  './images/piano/playing/piano11.png',
  './images/piano/playing/piano12.png',
  './images/piano/playing/piano13.png',
  './images/piano/playing/piano14.png'
];

const PIANO_BOOTING_PATHS = [
  './images/piano/booting/piano-bootup-1.png',
  './images/piano/booting/piano-bootup-2.png',
  './images/piano/booting/piano-bootup-3.png',
  './images/piano/booting/piano-bootup-4.png',
  './images/piano/booting/piano-bootup-5.png',
  './images/piano/booting/piano-bootup-6.png',
  './images/piano/booting/piano-bootup-7.png',
  './images/piano/booting/piano-bootup-8.png',
  './images/piano/booting/piano-bootup-9.png'
];

export default class PianoPlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string> ) {
    super( stateProperty, 0.13, PIANO_PLAYING_PATHS, PIANO_BOOTING_PATHS );
  }

  public static async load() {
    await Promise.all( PIANO_PLAYING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( PIANO_BOOTING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}