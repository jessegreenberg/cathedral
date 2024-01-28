declare namespace sun {
  export class TextPushButton extends sun.RectangularPushButton {
    public constructor( content: string, options?: IntentionalAny );
  }

  export class RectangularPushButton extends sun.RectangularButton {
    public constructor( options?: IntentionalAny );
  }

  // TODO: If you need to create your own, come back and fill in.
  export class RectangularButton extends sun.ButtonNode {
    public constructor( options?: IntentionalAny );
  }

  export class ButtonNode extends scenery.Node {
    public constructor( options?: IntentionalAny );

    public static readonly FlatAppearanceStrategy;

    public pdomClick: () => void;
  }

  export class Panel extends scenery.Node {
    public constructor( content: scenery.Node, options?: IntentionalAny );
  }

  export class RectangularRadioButtonGroup extends scenery.Node {
    public constructor( property: axon.Property, items: IntentionalAny[], options?: IntentionalAny );
  }
}