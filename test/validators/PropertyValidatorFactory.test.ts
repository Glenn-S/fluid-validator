import { ArrayPropertyValidator, BooleanPropertyValidator, NumberPropertyValidator, ObjectPropertyValidator, PropertyValidatorFactory, StringPropertyValidator } from '../../src/validators';
import { UnknownPropertyValidator } from '../../src/validators/UnknownPropertyValidator';

describe('PropertyValidatorFactory', () => {
  describe('getPropertyValidator', () => {
    it('string value should return the StringPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', 'test', {});

      const actualInstance = result instanceof StringPropertyValidator<'prop', {}>;
      expect(actualInstance).toBe(true);
    });

    it('number value should return the NumberPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', 12, {});

      const actualInstance = result instanceof NumberPropertyValidator<'prop', {}>;
      expect(actualInstance).toBe(true);
    });

    it('boolean value should return the BooleanPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', false, {});

      const actualInstance = result instanceof BooleanPropertyValidator<'prop', {}>;
      expect(actualInstance).toBe(true);
    });

    it('object value should return the ObjectPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', {innerProp: 'test'}, {});

      const actualInstance = result instanceof ObjectPropertyValidator<'prop', {innerProp: string}, {}>;
      expect(actualInstance).toBe(true);
    });

    it('array value should return the ArrayPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', ['test'], {});

      const actualInstance = result instanceof ArrayPropertyValidator<'prop', string[], {}>;
      expect(actualInstance).toBe(true);
    });

    it('unknown value should return the UnknownPropertyValidator', () => {
      const result = PropertyValidatorFactory.getPropertyValidator('prop', Symbol('test'), {});

      const actualInstance = result instanceof UnknownPropertyValidator<'prop', unknown, {}>;
      expect(actualInstance).toBe(true);
    });
  });
});