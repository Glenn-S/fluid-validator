import { ValidationError } from './types';
import { BasePropertyValidator } from './BasePropertyValidator';

export type BooleanValidator<
  Key extends string,
  Context,
> = BooleanPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, boolean, Context>;

export class BooleanPropertyValidator<
  PropKey extends string,
  Context,
> extends BasePropertyValidator<PropKey, boolean, Context> {
  constructor(
    property: PropKey,
    value: boolean,
    context: Context,
    validationErrors: ValidationError[],
  ) {
    super(property, value, context, validationErrors);
  }

  public isTrue(message?: string): BooleanPropertyValidator<PropKey, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('isTrue');
      return this;
    }

    if (this.value === false) {
      this.validationErrors.push({
        error: 'isTrue',
        property: this.prop,
        value: 'false',
        description: message ?? 'value should have been true',
      });
    }
    return this;
  }

  public isFalse(message?: string): BooleanPropertyValidator<PropKey, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('isFalse');
      return this;
    }

    if (this.value === true) {
      this.validationErrors.push({
        error: 'isFalse',
        property: this.prop,
        value: 'true',
        description: message ?? 'value should have been false',
      });
    }
    return this;
  }

  public isNull(
    message?: string | undefined,
  ): BooleanPropertyValidator<PropKey, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(
    message?: string | undefined,
  ): BooleanPropertyValidator<PropKey, Context> {
    super.isUndefined(message);
    return this;
  }

  public isNotUndefined(
    message?: string | undefined,
  ): BooleanPropertyValidator<PropKey, Context> {
    super.isNotUndefined(message);
    return this;
  }

  public isNotNull(
    message?: string | undefined,
  ): BooleanPropertyValidator<PropKey, Context> {
    super.isNotNull(message);
    return this;
  }

  public custom(
    customValidator: (
      value: boolean | undefined,
      context: Context,
    ) => ValidationError | null,
  ): BooleanPropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}
