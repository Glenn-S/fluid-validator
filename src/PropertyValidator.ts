import { ValidationError } from './types';

interface CommonPropertyValidator<T> {
  isUndefined(message?: string): T;
  isNull(message?: string): T;
}

export type PropertyValidator<K extends string, V> = 
  V extends string | undefined
    ? StringPropertyValidator<K> & CommonPropertyValidator<StringPropertyValidator<K>>
  : V extends number | undefined
    ? NumberPropertyValidator<K> & CommonPropertyValidator<NumberPropertyValidator<K>>
  : V extends boolean | undefined
    ? BooleanPropertyValidator<K> & CommonPropertyValidator<BooleanPropertyValidator<K>>
  : V extends object | undefined
    ? ObjectPropertyValidator<K, V> & CommonPropertyValidator<ObjectPropertyValidator<K, V>>
  : object;

export class PropertyValidatorFactory {
  public static getPropertyValidator<K extends string, V>(property: K, value: V): PropertyValidator<K, V> {
    switch (typeof value) {
      case 'string':
        return new StringPropertyValidator(property, value as string) as PropertyValidator<K, V>;
      case 'number':
        return new NumberPropertyValidator(property, value as number) as PropertyValidator<K, V>;
      case 'boolean':
        return new BooleanPropertyValidator(property, value as boolean) as PropertyValidator<K, V>;
      case 'object':
        return new ObjectPropertyValidator(property, value as V) as PropertyValidator<K, V>;
      default:
        throw new Error();
    }
  }
}

export class CommonProperty {
  protected validationErrors: ValidationError[];

  constructor() {
    this.validationErrors = [];
  }

  public getValidationErrors() {
    return [...this.validationErrors];
  }
}

export class StringPropertyValidator<K extends string>
  extends CommonProperty
  implements CommonPropertyValidator<StringPropertyValidator<K>>
{
  private property: K;
  private value: string;

  constructor(property: K, value: string) {
    super();
    this.property = property;
    this.value = value;
  }

  public getValidationErrors(): ValidationError[] {
    return [...this.validationErrors];
  }

  public maxLength(expected: number, message?: string): StringPropertyValidator<K> {
    if (this.value.length >= expected) {
      this.validationErrors.push({
        error: 'maxLength',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public minLength(expected: number, message?: string): StringPropertyValidator<K> {
    if (this.value.length <= expected) {
      this.validationErrors.push({
        error: 'minLength',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isUndefined(message?: string): StringPropertyValidator<K> {
    if (this.value === undefined) {
      this.validationErrors.push({
        error: 'isUndefined',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string): StringPropertyValidator<K> {
    if (this.value === null) {
      this.validationErrors.push({
        error: 'isNull',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public custom(customValidator: () => ValidationError): StringPropertyValidator<K> {
    return this;
  }
}

export class NumberPropertyValidator<K extends string>
  extends CommonProperty
  implements CommonPropertyValidator<NumberPropertyValidator<K>>
{
  private property: K;
  private value: number;

  constructor(property: K, value: number) {
    super();
    this.property = property;
    this.value = value;
  }

  public getValidationErrors(): any[] {
    return [...this.validationErrors];
  }

  public equal(expected: number, message?: string): NumberPropertyValidator<K> {
    if (this.value !== expected) {
      this.validationErrors.push({
        error: 'equal',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public greaterThan(expected: number, message?: string): NumberPropertyValidator<K> {
    if (this.value <= expected) {
      this.validationErrors.push({
        error: 'greaterThan',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public greaterThanOrEqual(expected: number, message?: string): NumberPropertyValidator<K> {
    if (this.value < expected) {
      this.validationErrors.push({
        error: 'greaterThanOrEqual',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public lessThan(expected: number, message?: string): NumberPropertyValidator<K> {
    if (this.value >= expected) {
      this.validationErrors.push({
        error: 'lessThan',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public lessThanOrEqual(expected: number, message?: string): NumberPropertyValidator<K> {
    if (this.value > expected) {
      this.validationErrors.push({
        error: 'lessThanOrEqual',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isUndefined(message?: string): NumberPropertyValidator<K> {
    if (this.value === undefined) {
      this.validationErrors.push({
        error: 'isUndefined',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string): NumberPropertyValidator<K> {
    if (this.value === null) {
      this.validationErrors.push({
        error: 'isNull',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public custom(customValidator: any): NumberPropertyValidator<K> {
    return this;
  }
}

export class BooleanPropertyValidator<K extends string>
  extends CommonProperty
  implements CommonPropertyValidator<BooleanPropertyValidator<K>>
{
  private property: K;
  private value: boolean;

  constructor(property: K, value: boolean) {
    super();
    this.property = property;
    this.value = value;
  }

  public getValidationErrors(): any[] {
    return [...this.validationErrors];
  }

  public isTrue(message?: string) {
    if (this.value === false) {
      this.validationErrors.push({
        error: 'isTrue',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isFalse(message?: string) {
    if (this.value === true) {
      this.validationErrors.push({
        error: 'isFalse',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isUndefined(message?: string): BooleanPropertyValidator<K> {
    if (this.value === undefined) {
      this.validationErrors.push({
        error: 'isUndefined',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string): BooleanPropertyValidator<K> {
    if (this.value === null) {
      this.validationErrors.push({
        error: 'isNull',
        property: this.property,
        description: message,
      });
    }
    return this;
  }

  public custom(customValidator: any): BooleanPropertyValidator<K> {
    return this;
  }
}

export class ObjectPropertyValidator<Key extends string, Value>
  extends CommonProperty
  implements CommonPropertyValidator<ObjectPropertyValidator<Key, Value>>
{
  private prop: Key;
  private value: Value;

  constructor(property: Key, value: Value) {
    super();
    this.prop = property;
    this.value = value;
  }

  public getValidationErrors(): any[] {
    return [...this.validationErrors];
  }

  public property<K extends keyof Value & string>(
    property: K,
    fn: (prop: PropertyValidator<K, Value[K]>) => void,
  ): ObjectPropertyValidator<Key, Value> {
    const propertyValidator = PropertyValidatorFactory.getPropertyValidator(property, this.value[property]);
    fn(propertyValidator);
    this.validationErrors = [
      ...this.validationErrors,
      ...(propertyValidator as CommonProperty).getValidationErrors(),
    ];
    return this;
  }

  public isUndefined(message?: string): ObjectPropertyValidator<Key, Value> {
    if (this.value === undefined) {
      this.validationErrors.push({
        error: 'isTrue',
        property: this.prop,
        description: message,
      });
    }
    return this;
  }

  public isNull(message?: string): ObjectPropertyValidator<Key, Value> {
    if (this.value === null) {
      this.validationErrors.push({
        error: 'isTrue',
        property: this.prop,
        description: message,
      });
    }
    return this;
  }

  // public deepEquals() {

  // }
}

// how to handle nested properties
// how to handle custom validators