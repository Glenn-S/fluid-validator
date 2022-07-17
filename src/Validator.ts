import {
  CommonProperty,
  PropertyValidator,
  PropertyValidatorFactory,
  ValidationError,
  ValidationResult,
} from './validators';

export class Validator<Context> {
  private objectToValidate: Context;
  private validationErrors: ValidationError[];

  constructor(obj: Context) {
    this.objectToValidate = obj;
    this.validationErrors = [];
  }

  public property<Key extends keyof Context & string>(
    property: Key,
    fn: (prop: PropertyValidator<Key, Context[Key], Context>) => void,
  ): Validator<Context> {
    const propertyValidator = PropertyValidatorFactory.getPropertyValidator(
      property,
      this.objectToValidate[property],
      this.objectToValidate,
    );
    fn(propertyValidator);
    this.validationErrors = [...(propertyValidator as CommonProperty).getValidationErrors()];
    return this;
  }

  public validate(throwOnError: boolean = false): ValidationResult {
    if (this.validationErrors.length > 0 && throwOnError) {
      throw new Error(JSON.stringify(this.validationErrors));
    }
    return {
      isValid: this.validationErrors.length === 0,
      errors: this.validationErrors,
    };
  }
}
