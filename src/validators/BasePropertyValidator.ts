import { ValidationError } from './types';

export class BasePropertyValidator<PropKey extends string, Value, Context> {
  protected prop: PropKey;
  public readonly value: Value;
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

  protected getInvalidValueError(error: string): boolean {
    if (this.value === null) {
      this.validationErrors.push({
        error,
        property: this.prop,
        value: 'null',
        description: 'the value was null when it should not have been',
      });
      return false;
    }

    if (this.value === undefined) {
      this.validationErrors.push({
        error,
        property: this.prop,
        value: 'undefined',
        description: 'the value was undefined when it should not have been',
      });
      return false;
    }

    return true;
  }

  protected isUndefined(message?: string): BasePropertyValidator<PropKey, Value, Context> {
    if (this.value !== undefined) {
      this.validationErrors.push({
        error: 'isUndefined',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: message ?? 'value should have been undefined',
      });
    }

    return this;
  }

  protected isNull(message?: string): BasePropertyValidator<PropKey, Value, Context> {
    if (this.value !== null) {
      this.validationErrors.push({
        error: 'isNull',
        property: this.prop,
        value: JSON.stringify(this.value),
        description: message ?? 'value should have been null',
      });
    }

    return this;
  }

  protected custom(
    customValidator: (value: Value | undefined, context: Context) => ValidationError | null,
  ): BasePropertyValidator<PropKey, Value, Context> {
    const validationError = customValidator(this.value, this.context);
    if (validationError) {
      this.validationErrors.push(validationError);
    }

    return this;
  }
}