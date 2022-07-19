import {
  CommonProperty,
  PropertyValidator,
  PropertyValidatorFactory,
  ValidationError,
  ValidationResult,
} from './validators';

export class Validator<Context> {
  private validations: ((context: Context) => ValidationError[])[];

  constructor() {
    this.validations = [];
  }

  public property<Key extends keyof Context & string>(
    property: Key,
    fn: (prop: PropertyValidator<Key, Context[Key], Context>) => void,
  ): Validator<Context> {
    const validation = (context: Context) => {
      const propertyValidator = PropertyValidatorFactory.getPropertyValidator(
        property,
        context[property],
        context,
      );
      fn(propertyValidator);
      const errors = (
        propertyValidator as CommonProperty
      ).getValidationErrors();
      return [...errors];
    };
    this.validations.push(validation);

    return this;
  }

  public validate(context: Context, throwOnError = false): ValidationResult {
    const validationErrors: ValidationError[] = [];
    this.validations.forEach((property) =>
      validationErrors.push(...property(context)),
    );

    if (validationErrors.length > 0 && throwOnError) {
      throw new Error(JSON.stringify(validationErrors));
    }
    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors,
    };
  }
}
