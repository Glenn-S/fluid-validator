import { ValidationError } from './types';
import { BasePropertyValidator } from './BasePropertyValidator';

export type StringValidator<Key extends string, Context> = StringPropertyValidator<Key, Context> &
  BasePropertyValidator<Key, string, Context>;

export class StringPropertyValidator<PropKey extends string, Context>
  extends BasePropertyValidator<PropKey, string, Context>
{
  constructor(property: PropKey, value: string, context: Context) {
    super(property, value, context);
  }

  public maxLength(expected: number, message?: string): StringPropertyValidator<PropKey, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('maxLength');
      return this;
    }
    
    if (this.value.length > expected) {
      this.validationErrors.push({
        error: 'maxLength',
        property: this.prop,
        value: this.value,
        description: message ?? `value should have been no more than '${expected}' characters`,
      });
    }
    return this;
  }

  public minLength(expected: number, message?: string): StringPropertyValidator<PropKey, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('minLength');
      return this;
    }
    
    if (this.value.length < expected) {
      this.validationErrors.push({
        error: 'minLength',
        property: this.prop,
        value: this.value,
        description: message ?? `value should have been no less than '${expected}' characters`,
      });
    }
    return this;
  }

  public regex(expected: RegExp, message?: string) : StringPropertyValidator<PropKey, Context> {
    if (this.value === undefined || this.value === null) {
      this.getInvalidValueError('regex');
      return this;
    }
    
    if (!expected.test(this.value)) {
      this.validationErrors.push({
        error: 'regex',
        property: this.prop,
        value: this.value,
        description: message ?? 'the value provided did not match the regular expression',
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
    customValidator: (value: string | undefined, context: Context) => ValidationError | null
  ): StringPropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}
