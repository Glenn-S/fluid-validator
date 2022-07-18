import { NumberPropertyValidator } from '../../src/validators';

describe('NumberPropertyValidator', () => {
  describe('equal', () => {
    it('null value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', null as unknown as number, {});
      validator.equal(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', undefined as unknown as number, {});
      validator.equal(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('value equal to expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.equal(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value not equal to expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.equal(11);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('equal');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe('value should have been \'11\'');
    });
  });

  describe('greaterThan', () => {
    it('null value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', null as unknown as number, {});
      validator.greaterThan(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', undefined as unknown as number, {});
      validator.greaterThan(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('value greater than expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.greaterThan(11);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value equal to expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.greaterThan(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe('value should have been greater than \'12\'');
    });

    it('value less than expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 11, {});
      validator.greaterThan(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThan');
      expect(property).toBe('prop');
      expect(value).toBe('11');
      expect(description).toBe('value should have been greater than \'12\'');
    });
  });

  describe('greaterThanOrEqual', () => {
    it('null value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', null as unknown as number, {});
      validator.greaterThanOrEqual(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', undefined as unknown as number, {});
      validator.greaterThanOrEqual(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('value greater than expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.greaterThanOrEqual(11);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value equal to expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.greaterThanOrEqual(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value less than expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 11, {});
      validator.greaterThanOrEqual(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('greaterThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('11');
      expect(description).toBe('value should have been greater than or equal to \'12\'');
    });
  });

  describe('lessThan', () => {
    it('null value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', null as unknown as number, {});
      validator.lessThan(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', undefined as unknown as number, {});
      validator.lessThan(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('value less than expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 10, {});
      validator.lessThan(11);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value equal to expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.lessThan(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('12');
      expect(description).toBe('value should have been less than \'12\'');
    });

    it('value greater than expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 13, {});
      validator.lessThan(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThan');
      expect(property).toBe('prop');
      expect(value).toBe('13');
      expect(description).toBe('value should have been less than \'12\'');
    });
  });

  describe('lessThanOrEqual', () => {
    it('null value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', null as unknown as number, {});
      validator.lessThanOrEqual(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new NumberPropertyValidator('prop', undefined as unknown as number, {});
      validator.lessThanOrEqual(3);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('value less than expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 10, {});
      validator.lessThanOrEqual(11);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value equal to expected should not return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 12, {});
      validator.lessThanOrEqual(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('value greater than expected should return validation error', () => {
      const validator = new NumberPropertyValidator('prop', 13, {});
      validator.lessThanOrEqual(12);

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('lessThanOrEqual');
      expect(property).toBe('prop');
      expect(value).toBe('13');
      expect(description).toBe('value should have been less than or equal to \'12\'');
    });
  });
});