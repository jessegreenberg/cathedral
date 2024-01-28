/**
 * A sound that can be looped forever using the Web Audio API. Sounds must be modulified and added to
 * ModulifiedSoundMap.ts to be used.
 */

import ModulifiedSoundMap from '../ModulifiedSoundMap';
import globalAudioContext from './globalAudioContext';

class LoopableSound {
  private arrayBuffer: IntentionalAny | null;

  private readonly outputGateGainNode: IntentionalAny;
  private readonly outputLevelGainNode: IntentionalAny;

  public playing = false;

  private outputLevelRampVelocity: number | null = null;

  private destinationOutputLevel: number;

  public readonly outputLevelProperty = new axon.NumberProperty( 1 );

  private readonly pathToSound: string;

  private source: IntentionalAny;

  private audioBuffer: IntentionalAny;

  private rampingUp: boolean = false;

  private useEncodedAudio: boolean;

  public constructor( pathToSound: string, initialOutputLevel: number, useEncodedAudio = true ) {
    this.arrayBuffer = null;

    this.pathToSound = pathToSound;
    this.useEncodedAudio = useEncodedAudio;

    // gain controlling whether the audio is playing at all
    this.outputGateGainNode = globalAudioContext.createGain();

    // volume control gain
    this.outputLevelGainNode = globalAudioContext.createGain();
    this.outputLevelGainNode.gain.value = initialOutputLevel;
    this.outputLevelProperty.value = this.outputLevelGainNode.gain.value;

    this.destinationOutputLevel = initialOutputLevel;

    this.audioBuffer = null;
  }

  public setOutputLevel( outputLevel: number ): void {
    this.outputLevelGainNode.gain.setValueAtTime(
      outputLevel,
      globalAudioContext.currentTime
    );

    // Set observable for the current output level
    this.outputLevelProperty.value = outputLevel;
  }

  /**
   * Use native Web audio API to ramp to an output level over a provided duration. Ramps exponentially
   * because that sounds better.
   * @param outputLevel
   * @param duration - in seconds
   */
  public rampToOutputLevel( outputLevel: number, duration: number ): void {
    assert && assert( outputLevel >= 0, 'Value must be greater than zero.' );
    assert && assert( outputLevel <= 1, 'Value must be greater than zero.' );

    const output = Math.max( Math.min( outputLevel, 1 ), 0 );
    this.destinationOutputLevel = output;

    const currentOutputLevel = this.outputLevelGainNode.gain.value;

    this.rampingUp = this.destinationOutputLevel > currentOutputLevel;
    this.outputLevelRampVelocity = ( output - currentOutputLevel ) / duration;
  }

  // @ts-ignore
  public async play( providedOptions?: IntentionalAny ): void {

    const options = phetCore.merge( {
      loopStart: 0,
      loopEnd: 0
    }, providedOptions );

    if ( globalAudioContext.state === 'suspended' ) {
      await globalAudioContext.resume();
    }

    this.source = globalAudioContext.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.loop = true;

    // set up the audio
    this.source.connect( this.outputLevelGainNode );
    this.outputLevelGainNode.connect( this.outputGateGainNode );
    this.outputGateGainNode.connect( globalAudioContext.destination );

    this.source.start();

    this.playing = true;

    this.source.loopStart = options.loopStart;
    this.source.loopEnd = options.loopEnd;
  }

  public step( dt: number ): void {

    // We need to animate to the destination sound
    if ( this.rampingUp && this.outputLevelGainNode.gain.value >= this.destinationOutputLevel ) {

      // we have overshot the destination, so set the output level to the destination
      this.setOutputLevel( this.destinationOutputLevel );

    }
    else if ( !this.rampingUp && this.outputLevelGainNode.gain.value <= this.destinationOutputLevel ) {

      // we have overshot the destination, so set the output level to the destination
      this.setOutputLevel( this.destinationOutputLevel );
    }
    else {

      // otherwise, ramp to the destination
      this.setOutputLevel( this.outputLevelGainNode.gain.value + dt * this.outputLevelRampVelocity! );
    }
  }

  public pause(): void {
    if ( this.source ) {

      // stop playing
      this.source.stop();

      // disconnect from web audio graph
      this.source.disconnect();
    }

    this.playing = false;
  }

  public dispose(): void {
    this.pause();

    this.outputLevelProperty.dispose();
  }

  public async initialize(): Promise<LoopableSound> {
    if ( this.useEncodedAudio ) {

      // Get the encoded data for the audio and turn it into an array buffer

      // @ts-expect-error
      let encodedData = ModulifiedSoundMap[ this.pathToSound ];
      if ( !encodedData ) {
        throw new Error( `No encoded sound found for ${this.pathToSound}` );
      }

      // Remove a prefix on the encoded data before decoding
      const base64Prefix = 'base64,';
      const base64Index = encodedData.indexOf( base64Prefix );
      if ( base64Index !== -1 ) {
        encodedData = encodedData.substring( base64Index + base64Prefix.length );
      }

      const binaryString = window.atob( encodedData );
      const len = binaryString.length;
      const bytes = new Uint8Array( len );
      for ( let i = 0; i < len; i++ ) {
        bytes[ i ] = binaryString.charCodeAt( i );
      }
      this.arrayBuffer = bytes.buffer;
    }
    else {

      // fetch the data from a file
      this.arrayBuffer = await fetch( this.pathToSound ).then( ( res ) => res.arrayBuffer() );
    }

    await this.prepareAudioBuffer();
    return this;
  }

  private async prepareAudioBuffer(): Promise<IntentionalAny> {
    this.audioBuffer = await globalAudioContext.decodeAudioData( this.arrayBuffer );
  }
}

export default LoopableSound;