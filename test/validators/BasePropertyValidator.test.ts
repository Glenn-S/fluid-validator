import { ValidationError } from '../../src/validators';
import { BasePropertyValidator } from '../../src/validators/BasePropertyValidator';

describe('BasePropertyValidator', () => {
  describe('isNull', () => {
    it('value of null should return no validation error', () => {
      const errors: ValidationError[] = [];
      const testValue: boolean = null as unknown as boolean;
      const validator = new TestBasePropertyValidator('prop', testValue, {}, errors);
      validator.isNull();

      expect(errors.length).toBe(0);
    });

    it('value not null should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new TestBasePropertyValidator('prop', false, {}, errors);
      validator.isNull();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isNull');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('value should have been null');
    });
  });

  describe('isUndefined', () => {
    it('value of undefined should return no validation error', () => {
      const errors: ValidationError[] = [];
      const testValue: boolean = undefined as unknown as boolean;
      const validator = new TestBasePropertyValidator('prop', testValue, {}, errors);
      validator.isUndefined();

      expect(errors.length).toBe(0);
    });

    it('value not undefined should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new TestBasePropertyValidator('prop', true, {}, errors);
      validator.isUndefined();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isUndefined');
      expect(property).toBe('prop');
      expect(value).toBe('true');
      expect(description).toBe('value should have been undefined');
    });
  });

  describe('custom', () => {
    it('valid value should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new TestBasePropertyValidator('prop', false, {}, errors);
      validator.custom((value) => {
        return value === true
          ? {
              error: 'custom',
              property: 'prop',
              value: 'false',
              description: '',
            }
          : null;
      });

      expect(errors.length).toBe(0);
    });

    it('invalid value should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new TestBasePropertyValidator('prop', false, {}, errors);
      validator.custom((value) => {
        return value !== true
          ? {
              error: 'custom',
              property: 'prop',
              value: 'false',
              description: '',
            }
          : null;
      });

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('custom');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('');
    });
  });
});

class TestBasePropertyValidator<
  PropKey extends string,
  Context,
> extends BasePropertyValidator<PropKey, boolean, Context> {
  constructor(
    property: PropKey,
    value: boolean,
    context: Context,
    validationerrors: ValidationError[],
  ) {
    super(property, value, context, validationerrors);
  }

  public isNull(
    message?: string | undefined,
  ): TestBasePropertyValidator<PropKey, Context> {
    super.isNull(message);
    return this;
  }

  public isUndefined(
    message?: string | undefined,
  ): TestBasePropertyValidator<PropKey, Context> {
    super.isUndefined(message);
    return this;
  }

  public custom(
    customValidator: (
      value: boolean | undefined,
      context: Context,
    ) => ValidationError | null,
  ): TestBasePropertyValidator<PropKey, Context> {
    super.custom(customValidator);
    return this;
  }
}
