// Amount of time we will spend transitioning in and out of screens
const FADE_TIME = 0.5;

class CrossFadeModel {

  private timeFadingIn = 0;
  private timeFadingOut = 0;

  private fadingIn = false;
  private fadingOut = false;

  // A number from 0 to 1 representing the fade level. 0 means full fade out, 1 means full fade in.
  public readonly crossFadeValueProperty = new axon.Property( 0 );

  public readonly fadeOutCompleteEmitter = new axon.Emitter();
  public readonly fadeInCompleteEmitter = new axon.Emitter();

  public fadeIn(): void {
    assert && assert( !this.fadingIn && !this.fadingOut, 'Cannot request fade while fading' );
    this.fadingIn = true;
  }

  public fadeOut(): void {
    assert && assert( !this.fadingIn && !this.fadingOut, 'Cannot request fade while fading' );
    this.fadingOut = true;
  }

  public step( dt: number ): void {
    if ( this.fadingIn ) {
      this.timeFadingIn += dt;
      this.crossFadeValueProperty.value = Math.min( this.timeFadingIn / FADE_TIME, 1 );

      if ( this.timeFadingIn > FADE_TIME ) {
        this.timeFadingIn = 0;
        this.fadingIn = false;
        this.fadeInCompleteEmitter.emit();
      }
    }
    else if ( this.fadingOut ) {
      this.timeFadingOut += dt;
      this.crossFadeValueProperty.value = Math.max( 1 - this.timeFadingOut / FADE_TIME, 0 );

      if ( this.timeFadingOut > FADE_TIME ) {
        this.timeFadingOut = 0;
        this.fadingOut = false;
        this.fadeOutCompleteEmitter.emit();
      }
    }
  }
}

export default CrossFadeModel;