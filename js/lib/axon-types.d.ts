declare namespace axon {
  export var stepTimer: IntentionalAny;

  export class Property<T> {
    public constructor( value: T );

    public link( listener: ( value: T, oldValue?: T ) => void ): void;

    public lazyLink( listener: ( value: T, oldValue?: T ) => void ): void;

    public unlink( listener: IntentionalAny ): void;

    public get(): T;

    public dispose(): void;

    public get value(): T;
    public set value( value: T );

    public set( value: T ): void;

    public reset(): void;
  }

  export class EnumerationProperty<T extends phetCore.EnumerationValue> extends Property<T> {
    public constructor( enumerationValue: T );
  }

  export class Multilink {
    public static multilink( properties: axon.Property<IntentionalAny>[], derivationCallback: IntentionalAny ): void;
    public static lazyMultilink( properties: axon.Property<IntentionalAny>[], derivationCallback: IntentionalAny ): void;
    public constructor( properties: axon.Property<IntentionalAny>[], derivationCallback: IntentionalAny );
    public dispose(): void;
  }

  export class NumberProperty extends Property<number> {
    public constructor( value: number, options?: IntentionalAny );

    public readonly range: dot.Range;
  }

  export class BoundsProperty extends Property<dot.Bounds2> {
    public constructor( value: dot.Bounds2 );
  }

  export class BooleanProperty extends Property<boolean> {
    public constructor( value: boolean );
  }

  export class DerivedProperty extends Property<IntentionalAny> {
    public constructor( properties: axon.Property<IntentionalAny>[], derivationCallback: IntentionalAny );

    public static and( properties: axon.Property<IntentionalAny>[] ): axon.DerivedProperty;
  }

  export class Emitter {
    public constructor( options?: IntentionalAny );

    public addListener( listener: ( ( value: IntentionalAny ) => void ) ): void;

    public removeAllListeners(): void;

    public dispose(): void;

    public removeListener( listener: ( ( value: IntentionalAny ) => void ) ): void;

    public emit( value?: IntentionalAny ): void;
  }

  export type ObservableArray<T> = {
    lengthProperty: axon.Property<number>;
    elementAddedEmitter: axon.Emitter;
    elementRemovedEmitter: axon.Emitter;

    // TODO: Why is this necessary?
    includes: ( element: T ) => boolean;
  } & T[];


  export function createObservableArray(): ObservableArray;
}