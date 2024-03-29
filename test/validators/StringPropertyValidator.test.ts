import { StringPropertyValidator, ValidationError } from '../../src/validators';

describe('StringPropertyValidator', () => {
  describe('maxLength', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        null as unknown as string,
        {},
        errors,
      );
      validator.maxLength(2);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        undefined as unknown as string,
        {},
        errors,
      );
      validator.maxLength(2);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value less than max length should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator('prop', 'abc', {}, errors);
      validator.maxLength(4);

      expect(errors.length).toBe(0);
    });

    it('value equal to max length should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator('prop', 'abc', {}, errors);
      validator.maxLength(3);

      expect(errors.length).toBe(0);
    });

    it('value longer than max length should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator('prop', 'abc', {}, errors);
      validator.maxLength(2);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop');
      expect(value).toBe('abc');
      expect(description).toBe(
        "value should have been no more than '2' characters",
      );
    });
  });

  describe('minLength', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        null as unknown as string,
        {},
        errors,
      );
      validator.minLength(2);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('minLength');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        undefined as unknown as string,
        {},
        errors,
      );
      validator.minLength(2);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('minLength');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value greater than min length should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        'abcde',
        {},
        errors,
      );
      validator.minLength(4);

      expect(errors.length).toBe(0);
    });

    it('value equal to min length should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator('prop', 'abc', {}, errors);
      validator.minLength(3);

      expect(errors.length).toBe(0);
    });

    it('value less than min length should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator('prop', 'abc', {}, errors);
      validator.minLength(4);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('minLength');
      expect(property).toBe('prop');
      expect(value).toBe('abc');
      expect(description).toBe(
        "value should have been no less than '4' characters",
      );
    });
  });

  describe('regex', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        null as unknown as string,
        {},
        errors,
      );
      validator.regex(new RegExp(/abc/g));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('regex');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        undefined as unknown as string,
        {},
        errors,
      );
      validator.regex(new RegExp(/abc/g));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('regex');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('valid regeular expression match should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        'abcabcabc',
        {},
        errors,
      );
      validator.regex(new RegExp(/^(abc)*$/g));

      expect(errors.length).toBe(0);
    });

    it('valid regeular expression with no match should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new StringPropertyValidator(
        'prop',
        'abcabcabc',
        {},
        errors,
      );
      validator.regex(new RegExp(/^(abcd)*$/g));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('regex');
      expect(property).toBe('prop');
      expect(value).toBe('abcabcabc');
      expect(description).toBe(
        'the value provided did not match the regular expression',
      );
    });
  });
});
