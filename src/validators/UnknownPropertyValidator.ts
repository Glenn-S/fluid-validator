import { BasePropertyValidator } from './BasePropertyValidator';
import { ValidationError } from './types';

export type UnknownValidator<
  Key extends string,
  Value,
  Context,
> = UnknownPropertyValidator<Key, Value, Context> &
  BasePropertyValidator<Key, Value, Context>;

export class UnknownPropertyValidator<
  PropKey extends string,
  Value,
  Context,
> extends BasePropertyValidator<PropKey, Value, Context> {
  constructor(
    property: PropKey,
    value: Value,
    context: Context,
    validationErrors: ValidationError[],
  ) {
    super(property, value, context, validationErrors);
  }

  public isNull(
    message?: string | undefined,
  ): UnknownPropertyValidator<PropKey, Value, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(
    message?: string | undefined,
  ): UnknownPropertyValidator<PropKey, Value, Context> {
    super.isUndefined(message);
    return this;
  }

  public isNotUndefined(
    message?: string | undefined,
  ): UnknownPropertyValidator<PropKey, Value, Context> {
    super.isNotUndefined(message);
    return this;
  }

  public isNotNull(
    message?: string | undefined,
  ): UnknownPropertyValidator<PropKey, Value, Context> {
    super.isNotNull(message);
    return this;
  }

  public custom(
    customValidator: (
      value: Value | undefined,
      context: Context,
    ) => ValidationError | null,
  ): UnknownPropertyValidator<PropKey, Value, Context> {
    super.custom(customValidator);
    return this;
  }
}
