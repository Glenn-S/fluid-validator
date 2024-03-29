import { BasePropertyValidator } from './BasePropertyValidator';
import { InnerValidator } from './InnerValidator';
import { Infer, ValidationError } from './types';

export type ArrayValidator<
  Key extends string,
  ElemType,
  Value extends ElemType[],
  Context,
> = ArrayPropertyValidator<Key, ElemType, Value, Context> &
  BasePropertyValidator<Key, Value, Context>;

export class ArrayPropertyValidator<
  PropKey extends string,
  ElemType,
  Value extends ElemType[],
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

  public minLength(value: number, message?: string) {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('minLength');
      return this;
    }

    if (this.value.length < value) {
      this.validationErrors.push({
        error: 'minLength',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: 
          message ?? `value should have been no less than '${value}' elements in length`,
      });
    }
    return this;
  }

  public maxLength(value: number, message?: string) {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('maxLength');
      return this;
    }

    if (this.value.length > value) {
      this.validationErrors.push({
        error: 'maxLength',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: 
          message ?? `value should have been no more than '${value}' elements in length`,
      });
    }
    return this;
  }

  public isEmpty(
    message?: string,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('isEmpty');
      return this;
    }

    if (this.value.length !== 0) {
      this.validationErrors.push({
        error: 'isEmpty',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: message ?? `array should have been empty`,
      });
    }
    return this;
  }

  public forEach(
    fn: (elem: InnerValidator<PropKey, Infer<Value>, Context>) => void,
    message?: string,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('forEach');
      return this;
    }

    const errorList: ValidationError[] = [];
    this.value.forEach((val) => {
      fn(InnerValidator.getValidator(
        this.prop,
        val as Infer<Value>,
        this.context,
        errorList,
      ));
    });

    if (errorList.length > 0) {
      this.validationErrors.push({
        error: 'forEach',
        property: this.prop,
        value: JSON.stringify(this.value),
        description:
          message ??
          'one or more values did not pass the array element validation',
      });
    }

    return this;
  }

  public isNull(
    message?: string | undefined,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    super.isNull(message);
    return this;
  }

  public isNotUndefined(
    message?: string | undefined,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    super.isNotUndefined(message);
    return this;
  }

  public isNotNull(
    message?: string | undefined,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    super.isNotNull(message);
    return this;
  }

  public isUndefined(
    message?: string | undefined,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (
      value: Value | undefined,
      context: Context,
    ) => ValidationError | null,
  ): ArrayPropertyValidator<PropKey, ElemType, Value, Context> {
    super.custom(customValidator);
    return this;
  }
}
