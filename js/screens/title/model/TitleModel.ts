import ScreenModel from '../../../ScreenModel';

export type PlayerState = 'off' | 'playing' | 'booting';

export default class TitleModel extends ScreenModel {
  public readonly harp1StateProperty: axon.Property<PlayerState>;
  public readonly harp2StateProperty: axon.Property<PlayerState>;
  public readonly hornStateProperty: axon.Property<PlayerState>;
  public readonly pianoStateProperty: axon.Property<PlayerState>;
  public readonly drumStateProperty: axon.Property<PlayerState>;
  public readonly bassStateProperty: axon.Property<PlayerState>;

  public readonly allPlayingProperty: axon.DerivedProperty;

  public constructor() {
    super();

    this.harp1StateProperty = new axon.Property( 'off' );
    this.harp2StateProperty = new axon.Property( 'off' );
    this.hornStateProperty = new axon.Property( 'off' );
    this.pianoStateProperty = new axon.Property( 'off' );
    this.drumStateProperty = new axon.Property( 'off' );
    this.bassStateProperty = new axon.Property( 'off' );

    // Only true when all of the players are playing
    this.allPlayingProperty = new axon.DerivedProperty(
      [
        this.harp1StateProperty,
        this.harp2StateProperty,
        this.hornStateProperty,
        this.pianoStateProperty,
        this.drumStateProperty,
        this.bassStateProperty
      ],
      ( ...states: PlayerState[] ) => {
        return states.every( state => state === 'playing' );
      } );
  }
}