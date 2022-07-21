import { PropertyValidator, ValidationError } from './types';
import { ArrayPropertyValidator } from './ArrayPropertyValidator';
import { BooleanPropertyValidator } from './BooleanPropertyValidator';
import { NumberPropertyValidator } from './NumberPropertyValidator';
import { ObjectPropertyValidator } from './ObjectPropertyValidator';
import { StringPropertyValidator } from './StringPropertyValidator';
import { UnknownPropertyValidator } from './UnknownPropertyValidator';

type ArrayElem<ArrType> = ArrType extends infer ElementType
  ? ElementType
  : unknown;

export class PropertyValidatorFactory {
  public static getPropertyValidator<PropKey extends string, Value, Context>(
    property: PropKey,
    value: Value,
    context: Context,
    validationErrors: ValidationError[],
  ): PropertyValidator<PropKey, Value, Context> {
    switch (typeof value) {
      case 'string':
        return new StringPropertyValidator(
          property,
          value as string,
          context,
          validationErrors,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'number':
        return new NumberPropertyValidator(
          property,
          value as number,
          context,
          validationErrors,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'boolean':
        return new BooleanPropertyValidator(
          property,
          value as boolean,
          context,
          validationErrors,
        ) as PropertyValidator<PropKey, Value, Context>;
      case 'object':
        if (Array.isArray(value)) {
          return new ArrayPropertyValidator(
            property,
            value as ArrayElem<typeof value>,
            context,
            validationErrors,
          ) as PropertyValidator<PropKey, Value, Context>;
        } else {
          return new ObjectPropertyValidator(
            property,
            value as Value,
            context,
            validationErrors,
          ) as PropertyValidator<PropKey, Value, Context>;
        }
      default:
        return new UnknownPropertyValidator(
          property,
          value as Value,
          context,
          validationErrors,
        ) as PropertyValidator<PropKey, Value, Context>;
    }
  }
}
