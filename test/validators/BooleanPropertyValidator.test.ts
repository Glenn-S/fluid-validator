import {
  BooleanPropertyValidator,
  ValidationError,
} from '../../src/validators';

describe('BooleanPropertyValidator', () => {
  describe('isTrue', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator(
        'prop',
        null as unknown as boolean,
        {},
        errors,
      );
      validator.isTrue();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isTrue');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator(
        'prop',
        undefined as unknown as boolean,
        {},
        errors,
      );
      validator.isTrue();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isTrue');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value of true should return no validation errors', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator('prop', true, {}, errors);
      validator.isTrue();

      expect(errors.length).toBe(0);
    });

    it('value of false should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator('prop', false, {}, errors);
      validator.isTrue();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isTrue');
      expect(property).toBe('prop');
      expect(value).toBe('false');
      expect(description).toBe('value should have been true');
    });
  });

  describe('isFalse', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator(
        'prop',
        null as unknown as boolean,
        {},
        errors,
      );
      validator.isFalse();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isFalse');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator(
        'prop',
        undefined as unknown as boolean,
        {},
        errors,
      );
      validator.isFalse();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isFalse');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value of false should return no validation errors', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator('prop', false, {}, errors);
      validator.isFalse();

      expect(errors.length).toBe(0);
    });

    it('value of true should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new BooleanPropertyValidator('prop', true, {}, errors);
      validator.isFalse();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isFalse');
      expect(property).toBe('prop');
      expect(value).toBe('true');
      expect(description).toBe('value should have been false');
    });
  });
});
