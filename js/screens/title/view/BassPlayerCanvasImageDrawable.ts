import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const BASS_PLAYING_PATHS = [
  './images/bass/playing/bass1.png',
  './images/bass/playing/bass2.png',
  './images/bass/playing/bass3.png',
  './images/bass/playing/bass4.png',
  './images/bass/playing/bass5.png',
  './images/bass/playing/bass6.png',
  './images/bass/playing/bass7.png',
  './images/bass/playing/bass8.png',
  './images/bass/playing/bass9.png',
  './images/bass/playing/bass10.png',
  './images/bass/playing/bass11.png',
  './images/bass/playing/bass12.png',
  './images/bass/playing/bass13.png',
  './images/bass/playing/bass14.png',
  './images/bass/playing/bass15.png',
  './images/bass/playing/bass16.png'
];

const BASS_BOOTING_PATHS = [
  './images/bass/booting/bass-bootup-1.png',
  './images/bass/booting/bass-bootup-2.png',
  './images/bass/booting/bass-bootup-3.png',
  './images/bass/booting/bass-bootup-4.png',
  './images/bass/booting/bass-bootup-5.png',
  './images/bass/booting/bass-bootup-6.png',
  './images/bass/booting/bass-bootup-7.png',
  './images/bass/booting/bass-bootup-8.png',
  './images/bass/booting/bass-bootup-9.png',
  './images/bass/booting/bass-bootup-10.png',
  './images/bass/booting/bass-bootup-11.png',
  './images/bass/booting/bass-bootup-12.png',
  './images/bass/booting/bass-bootup-13.png',
  './images/bass/booting/bass-bootup-14.png',
  './images/bass/booting/bass-bootup-15.png',
  './images/bass/booting/bass-bootup-16.png'
];

export default class BassPlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string> ) {
    super( stateProperty, 0.13, BASS_PLAYING_PATHS, BASS_BOOTING_PATHS );
  }

  public static async load() {
    await Promise.all( BASS_PLAYING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( BASS_BOOTING_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}