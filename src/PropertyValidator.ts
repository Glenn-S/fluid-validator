import { ValidationError } from './types';

type StringValidator<Key extends string, Context> = StringPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, string, Context>;

type NumberValidator<Key extends string, Context> = NumberPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, number, Context>;

type BooleanValidator<Key extends string, Context> = BooleanPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, boolean, Context>;

type ObjectValidator<Key extends string, Value, Context> = ObjectPropertyValidator<Key, Value, Context> &
  BasePropertyValidator<Key, Value, Context>

type UnknownValidator<Key extends string, Context> = {};

export type PropertyValidator<Key extends string, Value, Context> = 
  Value extends string | undefined
    ? StringValidator<Key, Context>
  : Value extends number | undefined
    ? NumberValidator<Key, Context>
  : Value extends boolean | undefined
    ? BooleanValidator<Key, Context>
  : Value extends object | undefined
    ? ObjectValidator<Key, Value, Context>
  : UnknownValidator<Key, Context>;

export class PropertyValidatorFactory {
  public static getPropertyValidator<K extends string, V, T>(
    property: K,
    value: V,
    context: T
  ): PropertyValidator<K, V, T> {
    switch (typeof value) {
      case 'string':
        return new StringPropertyValidator(property, value as string, context) as PropertyValidator<K, V, T>;
      case 'number':
        return new NumberPropertyValidator(property, value as number, context) as PropertyValidator<K, V, T>;
      case 'boolean':
        return new BooleanPropertyValidator(property, value as boolean, context) as PropertyValidator<K, V, T>;
      case 'object':
        return new ObjectPropertyValidator(property, value as V, context) as PropertyValidator<K, V, T>;
      default:
        throw new Error();
    }
  }
}

export interface CommonProperty {
  getValidationErrors(): ValidationError[];
}

class BasePropertyValidator<PropKey extends string, Value, Context> {
  protected prop: PropKey;
  protected value: Value;
  protected context: Context;
  protected validationErrors: ValidationError[];

  constructor(property: PropKey, value: Value, context: Context) {
    this.prop = property;
    this.value = value;
    this.context = context;
    this.validationErrors = [];
  }

  public getValidationErrors(): ValidationError[] {
    return [...this.validationErrors];
  }

  public isUndefined(message?: string): BasePropertyValidator<PropKey, Value, Context> {
    if (this.value === undefined) {
      this.validationErrors.push({
        error: 'isUndefined',
        property: this.prop,
        value: 'undefined',
        description: message,
      });
    }

    return this;
  }

  public isNull(message?: string): BasePropertyValidator<PropKey, Value, Context> {
    if (this.value === null) {
      this.validationErrors.push({
        error: 'isNull',
        property: this.prop,
        value: 'null',
        description: message,
      });
    }

    return this;
  }

  public custom(
    customValidator: (value: Value, context: Context) => ValidationError | null,
  ): BasePropertyValidator<PropKey, Value, Context> {
    const validationError = customValidator(this.value, this.context);
    if (validationError) {
      this.validationErrors.push(validationError);
    }

    return this;
  }
}

export class StringPropertyValidator<PropKey extends string, Context>
  extends BasePropertyValidator<PropKey, string, Context>
{
  constructor(property: PropKey, value: string, context: Context) {
    super(property, value, context);
  }

  public maxLength(expected: number, message?: string): StringPropertyValidator<PropKey, Context> {
    if (this.value.length >= expected) {
      this.validationErrors.push({
        error: 'maxLength',
        property: this.prop,
        value: this.value,
        description: message,
      });
    }
    return this;
  }

  public minLength(expected: number, message?: string): StringPropertyValidator<PropKey, Context> {
    if (this.value.length <= expected) {
      this.validationErrors.push({
        error: 'minLength',
        property: this.prop,
        value: this.value,
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string | undefined): StringPropertyValidator<PropKey, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(message?: string | undefined): StringPropertyValidator<PropKey, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (value: string, context: Context) => ValidationError | null
  ): StringPropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}

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

export class ArrayPropertyValidator<PropKey extends string, Value, Context>
extends BasePropertyValidator<PropKey, Value[], Context>
{
  constructor(property: PropKey, value: Value[], context: Context) {
    super(property, value, context);
  }

  public isEmpty(message?: string): ArrayPropertyValidator<PropKey, Value, Context> {
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
}

// export class UnknownPropertyValidator<Key extends string, Value, T>
//   extends CommonProperty<T>
//   implements CommonPropertyValidator<UnknownPropertyValidator<Key, Value, T>>
// {

// }

// arrays