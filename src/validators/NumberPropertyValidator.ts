import { ValidationError } from './types';
import { BasePropertyValidator } from './BasePropertyValidator';

export type NumberValidator<Key extends string, Context> = NumberPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, number, Context>;

export class NumberPropertyValidator<PropKey extends string, Context>
  extends BasePropertyValidator<PropKey, number, Context>
{
  constructor(property: PropKey, value: number, context: Context) {
    super(property, value, context);
  }

  public equal(expected: number, message?: string): NumberPropertyValidator<PropKey, Context> {
    if (this.value !== expected) {
      this.validationErrors.push({
        error: 'equal',
        property: this.prop,
        value: this.value.toString(),
        description: message,
      });
    }
    return this;
  }

  public greaterThan(expected: number, message?: string): NumberPropertyValidator<PropKey, Context> {
    if (this.value <= expected) {
      this.validationErrors.push({
        error: 'greaterThan',
        property: this.prop,
        value: this.value.toString(),
        description: message,
      });
    }
    return this;
  }

  public greaterThanOrEqual(expected: number, message?: string): NumberPropertyValidator<PropKey, Context> {
    if (this.value < expected) {
      this.validationErrors.push({
        error: 'greaterThanOrEqual',
        property: this.prop,
        value: this.value.toString(),
        description: message,
      });
    }
    return this;
  }

  public lessThan(expected: number, message?: string): NumberPropertyValidator<PropKey, Context> {
    if (this.value >= expected) {
      this.validationErrors.push({
        error: 'lessThan',
        property: this.prop,
        value: this.value.toString(),
        description: message,
      });
    }
    return this;
  }

  public lessThanOrEqual(expected: number, message?: string): NumberPropertyValidator<PropKey, Context> {
    if (this.value > expected) {
      this.validationErrors.push({
        error: 'lessThanOrEqual',
        property: this.prop,
        value: this.value.toString(),
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string | undefined): NumberPropertyValidator<PropKey, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(message?: string | undefined): NumberPropertyValidator<PropKey, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (value: number, context: Context) => ValidationError | null
  ): NumberPropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}
