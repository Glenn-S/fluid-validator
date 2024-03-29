import { ObjectPropertyValidator, ValidationError } from '../../src/validators';

interface TestInterface {
  prop1: string;
  prop2: {
    innerProp: string;
  };
}

describe('ObjectPropertyValidator', () => {
  describe('property', () => {
    const testObject: TestInterface = {
      prop1: 'abcd',
      prop2: {
        innerProp: 'inner',
      },
    };

    it('null value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ObjectPropertyValidator(
        'prop',
        null as unknown as TestInterface,
        {},
        errors,
      );
      validator.property('prop1', (prop1) => prop1.string.maxLength(3));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('property');
      expect(property).toBe('prop');
      expect(value).toBe('null');
      expect(description).toBe(
        'the value was null when it should not have been',
      );
    });

    it('undefined value should generate invalid value validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ObjectPropertyValidator(
        'prop',
        undefined as unknown as TestInterface,
        {},
        errors,
      );
      validator.property('prop1', (prop1) => prop1.string.maxLength(3));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('property');
      expect(property).toBe('prop');
      expect(value).toBe('undefined');
      expect(description).toBe(
        'the value was undefined when it should not have been',
      );
    });

    it('valid property validation should not return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ObjectPropertyValidator(
        'prop',
        testObject,
        {},
        errors,
      );
      validator.property('prop1', (prop1) => prop1.string.maxLength(4));

      expect(errors.length).toBe(0);
    });

    it('invalid property validation should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ObjectPropertyValidator(
        'prop',
        testObject,
        {},
        errors,
      );
      validator.property('prop1', (prop1) => prop1.string.maxLength(3));

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop.prop1');
      expect(value).toBe('abcd');
      expect(description).toBe(
        "value should have been no more than '3' characters",
      );
    });

    it('invalid nested property validation should return validation error', () => {
      const errors: ValidationError[] = [];
      const validator = new ObjectPropertyValidator(
        'prop',
        testObject,
        {},
        errors,
      );
      validator.property('prop2', (prop2) => {
        prop2.object.property('innerProp', (innerProp) => innerProp.string.maxLength(3));
      });

      expect(errors.length).toBe(1);
      const { error, property, value, description } = errors[0];
      expect(error).toBe('maxLength');
      expect(property).toBe('prop.prop2.innerProp');
      expect(value).toBe('inner');
      expect(description).toBe(
        "value should have been no more than '3' characters",
      );
    });
  });
});
