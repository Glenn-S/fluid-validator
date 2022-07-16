import { CommonProperty, PropertyValidator, ValidationError } from './types';
import { BasePropertyValidator } from './BasePropertyValidator';
import { PropertyValidatorFactory } from './PropertyValidatorFactory';

export type ObjectValidator<Key extends string, Value, Context> = ObjectPropertyValidator<Key, Value, Context> &
  BasePropertyValidator<Key, Value, Context>

export class ObjectPropertyValidator<PropKey extends string, Value, Context>
  extends BasePropertyValidator<PropKey, Value, Context>
{
  constructor(property: PropKey, value: Value, context: Context) {
    super(property, value, context);
  }

  public property<K extends keyof Value & string>(
    property: K,
    fn: (prop: PropertyValidator<K, Value[K], Context>) => void,
  ): ObjectPropertyValidator<PropKey, Value, Context> {
    const propertyValidator = PropertyValidatorFactory.getPropertyValidator(
      property,
      this.value[property],
      this.context,
    );
    fn(propertyValidator);
    this.validationErrors.push(...(propertyValidator as CommonProperty).getValidationErrors());
    return this;
  }

  public isNull(message?: string | undefined): ObjectPropertyValidator<PropKey, Value, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(message?: string | undefined): ObjectPropertyValidator<PropKey, Value, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (value: Value, context: Context) => ValidationError | null
  ): ObjectPropertyValidator<PropKey, Value, Context> {
    super.custom(customValidator);
    return this;
  }
}