import { ArrayPropertyValidator, ValidationError } from '../../src/validators';

describe('ArrayPropertyValidator', () => {
  describe('isEmpty', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        null as unknown as string[],
        {},
        errors,
      );
      validator.isEmpty();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isEmpty');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        undefined as unknown as string[],
        {},
        errors,
      );
      validator.isEmpty();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isEmpty');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('empty array should return no validation errors', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator('prop', [] as string[], {}, errors);
      validator.isEmpty();

      expect(errors.length).toBe(0);
    });

    it('non-empty array should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        ['abc'] as string[],
        {},
        errors,
      );
      validator.isEmpty();

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('isEmpty');
      expect(property).toBe('prop');
      expect(value).toBe('["abc"]');
      expect(description).toBe('array should have been empty');
    });
  });

  describe('forEach', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        null as unknown as string[],
        {},
        errors,
      );
      validator.forEach((e) => e.maxLength(2));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('forEach');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        undefined as unknown as string[],
        {},
        errors,
      );
      validator.forEach((e) => e.maxLength(2));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('forEach');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('all array elements match validation should return no validation errors', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        ['ab', 'bc', 'mt'],
        {},
        errors,
      );
      validator.forEach((e) => e.maxLength(2));

      expect(errors.length).toBe(0);
    });

    it('non-empty array should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator(
        'prop',
        ['ab', 'bcd', 'mt'],
        {},
        errors,
      );
      validator.forEach((e) => e.maxLength(2));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('forEach');
      expect(property).toBe('prop');
      expect(value).toBe('["ab","bcd","mt"]');
      expect(description).toBe(
        'one or more values did not pass the array element validation',
      );
    });

    it('empty array should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ArrayPropertyValidator('prop', [] as string[], {}, errors);
      validator.forEach((e) => e.maxLength(2));

      expect(errors.length).toBe(0);
    });
  });
});
