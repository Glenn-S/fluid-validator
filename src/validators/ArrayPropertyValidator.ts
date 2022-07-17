import { BasePropertyValidator } from './BasePropertyValidator';
import { PropertyValidatorFactory } from './PropertyValidatorFactory';
import { CommonProperty, Infer, PropertyValidator } from './types';

export type ArrayValidator<Key extends string, Value extends Array<any>, Context> = 
  ArrayPropertyValidator<Key, Value, Context> &
  BasePropertyValidator<Key, Value, Context>;

export class ArrayPropertyValidator<PropKey extends string, Value extends Array<any>, Context>
  extends BasePropertyValidator<PropKey, Value, Context>
{
  constructor(property: PropKey, value: Value, context: Context) {
    super(property, value, context);
  }

  public isEmpty(message?: string): ArrayPropertyValidator<PropKey, Value, Context> {
    console.log(this.value.length);
    if (this.value.length !== 0) {
      this.validationErrors.push({
        error: 'isEmpty',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: message,
      });
    }
    return this;
  }

  public forEach(fn: (elem: PropertyValidator<PropKey, Infer<Value>, Context>) => void) {
    this.value.forEach((val) => {
      const propertyValidator = PropertyValidatorFactory.getPropertyValidator(
        this.prop,
        val as Infer<Value>,
        this.context,
      );
      fn(propertyValidator);
      this.validationErrors.push(...(propertyValidator as CommonProperty).getValidationErrors());
    });

    return this;
  }
}
