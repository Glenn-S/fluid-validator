import { CommonProperty, PropertyValidator, PropertyValidatorFactory } from './PropertyValidator';
import { ValidationError, ValidationResult } from './types';

export class Validator<T> {
  private objectToValidate: T;
  private validationErrors: ValidationError[];

  constructor(obj: T) {
    this.objectToValidate = obj;
    this.validationErrors = [];
  }

  public property<K extends keyof T & string>(
    property: K,
    fn: (prop: PropertyValidator<K, T[K], T>) => void,
  ): Validator<T> {
    const propertyValidator = PropertyValidatorFactory.getPropertyValidator(
      property,
      this.objectToValidate[property],
      this.objectToValidate,
    );
    fn(propertyValidator);
    this.validationErrors = [...(propertyValidator as CommonProperty).getValidationErrors()];
    return this;
  }

  public validate(): ValidationResult {
    return {
      isValid: this.validationErrors.length === 0,
      errors: this.validationErrors,
    };
  }
}
