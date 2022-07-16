import { PropertyValidator } from './types';
import { ArrayPropertyValidator } from './ArrayPropertyValidator';
import { BooleanPropertyValidator } from './BooleanPropertyValidator';
import { NumberPropertyValidator } from './NumberPropertyValidator';
import { ObjectPropertyValidator } from './ObjectPropertyValidator';
import { StringPropertyValidator } from './StringPropertyValidator';

export class PropertyValidatorFactory {
  public static getPropertyValidator<PropKey extends string, Value, Context>(
    property: PropKey,
    value: Value,
    context: Context
  ): PropertyValidator<PropKey, Value, Context> {
    switch (typeof value) {
      case 'string':
        return new StringPropertyValidator(
          property,
          value as string,
          context,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'number':
        return new NumberPropertyValidator(
          property,
          value as number,
          context,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'boolean':
        return new BooleanPropertyValidator(
          property,
          value as boolean,
          context,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'object':
        return new ObjectPropertyValidator(
          property,
          value as Value,
          context,
        ) as PropertyValidator<PropKey, Value, Context>;
      // case determine how to tell something is an array
        // return new ArrayPropertyValidator(property, value as any[], context) as PropertyValidator<K, V, T>;
      default:
        throw new Error();
    }
  }
}
