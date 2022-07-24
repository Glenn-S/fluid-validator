import { ArrayPropertyValidator } from './ArrayPropertyValidator';
import { BooleanPropertyValidator } from './BooleanPropertyValidator';
import { NumberPropertyValidator } from './NumberPropertyValidator';
import { ObjectPropertyValidator } from './ObjectPropertyValidator';
import { StringPropertyValidator } from './StringPropertyValidator';
import { ValidationError } from './types';
import { UnknownPropertyValidator } from './UnknownPropertyValidator';

export class InnerValidator<PropKey extends string, Value, Context> {
  private property: PropKey;
  private value: Value;
  private context: Context;
  private validationErrors: ValidationError[];

  protected constructor(
    property: PropKey,
    value: Value,
    context: Context,
    validationErrors: ValidationError[],
  ) {
    this.property = property;
    this.value = value;
    this.context = context;
    this.validationErrors = validationErrors;
  }

  public static getValidator<PropKey extends string, Value, Context>(
    property: PropKey,
    value: Value,
    context: Context,
    validationErrors: ValidationError[],
  ) {
    return new InnerValidator(property, value, context, validationErrors);
  }

  public get string() {
    return new StringPropertyValidator(
      this.property,
      this.value as unknown as string,
      this.context,
      this.validationErrors,
    );
  }

  public get number() {
    return new NumberPropertyValidator(
      this.property,
      this.value as unknown as number,
      this.context,
      this.validationErrors,
    );
  }

  public get boolean() {
    return new BooleanPropertyValidator(
      this.property,
      this.value as unknown as boolean,
      this.context,
      this.validationErrors,
    );
  }

  // will return a date validator
  // public get date() {
  //   return new DatePropertyValidator(
  //     this.property,
  //     this.context[this.property] as boolean,
  //     this.context,
  //     this.validationErrors,
  //   );
  // }

  public get array() {
    return new ArrayPropertyValidator(
      this.property,
      this.value as unknown as Value[],
      this.context,
      this.validationErrors,
    );
  }

  public get object() {
    return new ObjectPropertyValidator(
      this.property,
      this.value as unknown as Value,
      this.context,
      this.validationErrors,
    )
  }

  public get unknown() {
    return new UnknownPropertyValidator(
      this.property,
      this.value as unknown as Value,
      this.context,
      this.validationErrors,
    );
  }
}