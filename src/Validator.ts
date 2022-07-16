import { CommonProperty, PropertyValidator, PropertyValidatorFactory } from './PropertyValidator';
import { ValidationResult } from './types';

export class Validator<T> {
  private objectToValidate: T;

  constructor(obj: T) {
    this.objectToValidate = obj;
  }

  public property<K extends keyof T & string>(
    property: K,
    fn: (prop: PropertyValidator<K, T[K]>) => void,
  ): Validator<T> {
    const propertyValidator = PropertyValidatorFactory.getPropertyValidator(property, this.objectToValidate[property]);
    fn(propertyValidator);
    const errors = (propertyValidator as CommonProperty).getValidationErrors();
    console.log(errors);
    return this;
  }

  public validate(): ValidationResult {
    return {
      isValid: true,
      errors: [],
    };
  }
}
