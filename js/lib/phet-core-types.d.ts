type IntentionalAny = any; // eslint-disable-line

declare namespace phetCore {
  export class EnumerationValue {
    public readonly name: string;
  }

  export class Enumeration {
    public constructor( enumerationValueType: phetCore.EnumerationValue ) {}
    public readonly keys: [];
    public readonly values: [];
    public includes( value: phetCore.EnumerationValue ): boolean;
    public getValue( key: string ): phetCore.EnumerationValue;
  }

  export const platform = {
    firefox: boolean
  };

  export function merge( ...args ): IntentionalAny;
}

declare const assert;