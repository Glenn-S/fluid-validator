import { NumberPropertyValidator, ValidationError } from '../../src/validators';

describe('NumberPropertyValidator', () => {
  describe('equal', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        null as unknown as number,
        {},
        errors
      );
      validator.equal(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        undefined as unknown as number,
        {},
        errors
      );
      validator.equal(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value equal to expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.equal(12);

      expect(errors.length).toBe(0);
    });

    it('value not equal to expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.equal(11);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe("value should have been '11'");
    });
  });

  describe('greaterThan', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        null as unknown as number,
        {},
        errors,
      );
      validator.greaterThan(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        undefined as unknown as number,
        {},
        errors,
      );
      validator.greaterThan(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value greater than expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.greaterThan(11);

      expect(errors.length).toBe(0);
    });

    it('value equal to expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.greaterThan(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe("value should have been greater than '12'");
    });

    it('value less than expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 11, {}, errors);
      validator.greaterThan(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('11');
      expect(description).toBe("value should have been greater than '12'");
    });
  });

  describe('greaterThanOrEqual', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        null as unknown as number,
        {},
        errors
      );
      validator.greaterThanOrEqual(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        undefined as unknown as number,
        {},
        errors,
      );
      validator.greaterThanOrEqual(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value greater than expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.greaterThanOrEqual(11);

      expect(errors.length).toBe(0);
    });

    it('value equal to expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.greaterThanOrEqual(12);

      expect(errors.length).toBe(0);
    });

    it('value less than expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 11, {}, errors);
      validator.greaterThanOrEqual(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('11');
      expect(description).toBe(
        "value should have been greater than or equal to '12'",
      );
    });
  });

  describe('lessThan', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        null as unknown as number,
        {},
        errors,
      );
      validator.lessThan(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        undefined as unknown as number,
        {},
        errors,
      );
      validator.lessThan(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value less than expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 10, {}, errors);
      validator.lessThan(11);

      expect(errors.length).toBe(0);
    });

    it('value equal to expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.lessThan(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe("value should have been less than '12'");
    });

    it('value greater than expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 13, {}, errors);
      validator.lessThan(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('13');
      expect(description).toBe("value should have been less than '12'");
    });
  });

  describe('lessThanOrEqual', () => {
    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        null as unknown as number,
        {},
        errors,
      );
      validator.lessThanOrEqual(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator(
        'prop',
        undefined as unknown as number,
        {},
        errors,
      );
      validator.lessThanOrEqual(3);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('value less than expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 10, {}, errors);
      validator.lessThanOrEqual(11);

      expect(errors.length).toBe(0);
    });

    it('value equal to expected should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 12, {}, errors);
      validator.lessThanOrEqual(12);

      expect(errors.length).toBe(0);
    });

    it('value greater than expected should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new NumberPropertyValidator('prop', 13, {}, errors);
      validator.lessThanOrEqual(12);

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('13');
      expect(description).toBe(
        "value should have been less than or equal to '12'",
      );
    });
  });
});
