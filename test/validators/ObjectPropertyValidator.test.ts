import { ObjectPropertyValidator } from '../../src/validators';

interface TestInterface {
  prop1: string;
  prop2: {
    innerProp: string;
  }
}

describe('ObjectPropertyValidator', () => {
  describe('property', () => {
    const testObject: TestInterface = {
      prop1: 'abcd',
      prop2: {
        innerProp: 'inner'
      }
    };

    it('null value should generate invalid value validation error', () => {
      const validator = new ObjectPropertyValidator('prop', null as unknown as TestInterface, {});
      validator.property('prop1', (prop1) => prop1.maxLength(3));

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('property');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe('the value was null when it should not have been');
    });

    it('undefined value should generate invalid value validation error', () => {
      const validator = new ObjectPropertyValidator('prop', undefined as unknown as TestInterface, {});
      validator.property('prop1', (prop1) => prop1.maxLength(3));

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('property');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe('the value was undefined when it should not have been');
    });

    it('valid property validation should not return validation error', () => {
      const validator = new ObjectPropertyValidator('prop', testObject, {});
      validator.property('prop1', (prop1) => prop1.maxLength(4));

      const result = validator.getValidationErrors();

      expect(result.length).toBe(0);
    });

    it('invalid property validation should return validation error', () => {
      const validator = new ObjectPropertyValidator('prop', testObject, {});
      validator.property('prop1', (prop1) => prop1.maxLength(3));

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop.prop1');
      expect(value).toBe('abcd');
      expect(description).toBe('value should have been no more than \'3\' characters');
    });

    it('invalid nested property validation should return validation error', () => {
      const validator = new ObjectPropertyValidator('prop', testObject, {});
      validator.property('prop2', (prop2) => {
        prop2.property('innerProp', (innerProp) => innerProp.maxLength(3));
      });

      const result = validator.getValidationErrors();

      expect(result.length).toBe(1);
      const {error, property, value, description} = result[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop.prop2.innerProp');
      expect(value).toBe('inner');
      expect(description).toBe('value should have been no more than \'3\' characters');
    });
  });
});