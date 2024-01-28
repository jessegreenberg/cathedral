declare namespace twixt {
  export class Animation {
    public constructor( options?: IntentionalAny );

    public start(): void;
    public stop(): void;

    public then( animation: Animation ): Animation;

    public finishEmitter: axon.Emitter;
    public endedEmitter: axon.Emitter;
    public startEmitter: axon.Emitter;
    public beginEmitter: axon.Emitter;
  }

  export class Easing {
    public static readonly QUADRATIC_IN: Easing;
    public static readonly QUADRATIC_OUT: Easing;
    public static readonly QUADRATIC_IN_OUT: Easing;

    // Cubic-derived easings (t^3)
    public static readonly CUBIC_IN: Easing;
    public static readonly CUBIC_OUT: Easing;
    public static readonly CUBIC_IN_OUT: Easing;

    // Quartic-derived easings (t^4)
    public static readonly QUARTIC_IN: Easing;
    public static readonly QUARTIC_OUT: Easing;
    public static readonly QUARTIC_IN_OUT: Easing;

    // Quintic-derived easings (t^5)
    public static readonly QUINTIC_IN: Easing;
    public static readonly QUINTIC_OUT: Easing;
    public static readonly QUINTIC_IN_OUT: Easing;
  }
}