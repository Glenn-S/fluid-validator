import {
  ValidationError,
  ValidationResult,
} from './validators';
import { InnerValidator } from './validators/InnerValidator';

interface IValidate<Context> {
  validate(context: Context, throwOnError?: boolean): ValidationResult;
}

export class Validator<Context> {
  private validators: ((context: Context) => void)[];
  private validationErrors: ValidationError[];

  constructor() {
    this.validators = [];
    this.validationErrors = [];
  }

  public property<Key extends keyof Context & string>(
    property: Key,
    fn: (prop: InnerValidator<Key, Context[Key], Context>) => void,
  ): Validator<Context> {
    const validation = (context: Context) => {
      fn(InnerValidator.getValidator(
        property,
        context[property],
        context,
        this.validationErrors,
      ));
    };
    this.validators.push(validation);

    return this;
  }

  public build(): IValidate<Context> {
    return this;
  }

  public validate(context: Context, throwOnError = false): ValidationResult {
    this.validators.forEach((property) => property(context));
    const errorCount = this.validationErrors.length;
    if (errorCount > 0 && throwOnError) {
      throw new Error(JSON.stringify(this.validationErrors));
    }
    return {
      isValid: errorCount === 0,
      errors: this.validationErrors,
    };
  }
}
