import PlayerCanvasImageDrawable from './PlayerCanvasImageDrawable';
import SceneryImageLoader from '../../common/interface/SceneryImageLoader';

const HORN_PLAYING_IMAGE_PATHS = [
  './images/horn/playing/horn1.png',
  './images/horn/playing/horn2.png',
  './images/horn/playing/horn3.png',
  './images/horn/playing/horn4.png',
  './images/horn/playing/horn5.png',
  './images/horn/playing/horn6.png',
  './images/horn/playing/horn7.png',
  './images/horn/playing/horn8.png',
  './images/horn/playing/horn9.png',
  './images/horn/playing/horn10.png',
  './images/horn/playing/horn11.png',
  './images/horn/playing/horn12.png',
  './images/horn/playing/horn13.png',
  './images/horn/playing/horn14.png',
  './images/horn/playing/horn15.png',
  './images/horn/playing/horn16.png',
  './images/horn/playing/horn17.png',
  './images/horn/playing/horn18.png',
  './images/horn/playing/horn19.png',
  './images/horn/playing/horn20.png',
  './images/horn/playing/horn21.png',
  './images/horn/playing/horn22.png',
  './images/horn/playing/horn23.png'
];

const HORN_BOOTING_IMAGE_PATHS = [
  './images/horn/booting/horn-bootup-1.png',
  './images/horn/booting/horn-bootup-2.png',
  './images/horn/booting/horn-bootup-3.png',
  './images/horn/booting/horn-bootup-4.png',
  './images/horn/booting/horn-bootup-5.png',
  './images/horn/booting/horn-bootup-6.png',
  './images/horn/booting/horn-bootup-7.png',
  './images/horn/booting/horn-bootup-8.png',
  './images/horn/booting/horn-bootup-9.png',
  './images/horn/booting/horn-bootup-10.png',
  './images/horn/booting/horn-bootup-11.png',
  './images/horn/booting/horn-bootup-12.png',
  './images/horn/booting/horn-bootup-13.png',
  './images/horn/booting/horn-bootup-14.png',
  './images/horn/booting/horn-bootup-15.png',
  './images/horn/booting/horn-bootup-16.png'
];

export default class HornPlayerCanvasImageDrawable extends PlayerCanvasImageDrawable {
  public constructor( stateProperty: axon.Property<string> ) {
    super( stateProperty, 0.13, HORN_PLAYING_IMAGE_PATHS, HORN_BOOTING_IMAGE_PATHS );
  }

  public static async load() {
    await Promise.all( HORN_PLAYING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
    await Promise.all( HORN_BOOTING_IMAGE_PATHS.map( path => SceneryImageLoader.loadImage( path ) ) );
  }
}