import { ValidationError } from '../../src/validators';
import { BasePropertyValidator } from '../../src/validators/BasePropertyValidator';

describe('BasePropertyValidator', () => {
  describe('isNull', () => {
    it('value of null should return no validation error', () => {
      const testValue: boolean = null as unknown as boolean;
      const validator = new TestBasePropertyValidator('prop', testValue, {});
      validator.isNull();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value not null should return validation error', () => {
      const validator = new TestBasePropertyValidator('prop', false, {});
      validator.isNull();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const { error, property, value, description } = result[0];
      expect(error).toBe('isNull');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('value should have been null');
    });
  });

  describe('isUndefined', () => {
    it('value of undefined should return no validation error', () => {
      const testValue: boolean = undefined as unknown as boolean;
      const validator = new TestBasePropertyValidator('prop', testValue, {});
      validator.isUndefined();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value not undefined should return validation error', () => {
      const validator = new TestBasePropertyValidator('prop', true, {});
      validator.isUndefined();

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const { error, property, value, description } = result[0];
      expect(error).toBe('isUndefined');
      expect(property).toBe('prop');
      expect(value).toBe('true');
      expect(description).toBe('value should have been undefined');
    });
  });

  describe('custom', () => {
    it('valid value should not return validation error', () => {
      const validator = new TestBasePropertyValidator('prop', false, {});
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

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('invalid value should return validation error', () => {
      const validator = new TestBasePropertyValidator('prop', false, {});
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

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const { error, property, value, description } = result[0];
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
  constructor(property: PropKey, value: boolean, context: Context) {
    super(property, value, context);
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
