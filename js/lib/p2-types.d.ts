type IntentionalAny = any; // eslint-disable-line

declare namespace p2 {
  export class Shape {
    public constructor( obj: IntentionalAny );

    public collisionMask: number;
    public collisionGroup: number;
  }

  export class Body {
    public constructor( obj: IntentionalAny );

    public addShape( shape: p2.Shape ): void;

    public applyImpulse( force: [ number, number ], localPoint: [ number, number ] ): void;
    public applyImpulse( force: [ number, number ] ): void;

    public applyForce( force: [ number, number ], localPoint: [ number, number ] ): void;
    public applyForce( force: [ number, number ] ): void;

    public overlaps( body: p2.Body ): boolean;

    public position: [ number, number ];
    public velocity: [ number, number ];
    public mass: number;
  }

  export class Material {

  }

  export class ContactMaterial {
    public constructor( materialA: p2.Material, materialB: p2.Material, options?: IntentionalAny );
  }

  export class Box extends p2.Shape {
    public constructor( obj: IntentionalAny );
  }

  export class World {
    public constructor( obj?: IntentionalAny );

    public narrowphase: IntentionalAny;

    public addBody( body: p2.Body ): void;
    public removeBody( body: p2.Body ): void;

    public addContactMaterial( material: p2.ContactMaterial ): void;

    public removeContactMaterial( material: p2.ContactMaterial ): void;

    public on( eventName: string, callback: IntentionalAny ): void;

    public step( dt: number ): void;
  }
}
