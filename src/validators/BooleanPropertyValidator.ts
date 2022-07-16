import { ValidationError } from './types';
import { BasePropertyValidator } from './BasePropertyValidator';

export type BooleanValidator<Key extends string, Context> = BooleanPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, boolean, Context>;

export class BooleanPropertyValidator<PropKey extends string, Context>
  extends BasePropertyValidator<PropKey, boolean, Context>
{
  constructor(property: PropKey, value: boolean, context: Context) {
    super(property, value, context);
  }

  public isTrue(message?: string): BooleanPropertyValidator<PropKey, Context> {
    if (this.value === false) {
      this.validationErrors.push({
        error: 'isTrue',
        property: this.prop,
        value: 'false',
        description: message,
      });
    }
    return this;
  }

  public isFalse(message?: string): BooleanPropertyValidator<PropKey, Context> {
    if (this.value === true) {
      this.validationErrors.push({
        error: 'isFalse',
        property: this.prop,
        value: 'true',
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string | undefined): BooleanPropertyValidator<PropKey, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(message?: string | undefined): BooleanPropertyValidator<PropKey, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (value: boolean, context: Context) => ValidationError | null
  ): BooleanPropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}