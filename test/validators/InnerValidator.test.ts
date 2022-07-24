import {
  ArrayPropertyValidator,
  BooleanPropertyValidator,
  InnerValidator,
  NumberPropertyValidator,
  ObjectPropertyValidator,
  StringPropertyValidator,
} from '../../src/validators';
import { UnknownPropertyValidator } from '../../src/validators/UnknownPropertyValidator';

describe('InnerValidator', () => {
  describe('getPropertyValidator', () => {
    it('string value should return the StringPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        'test',
        {},
        [],
      ).string;

      const actualInstance =
        result instanceof StringPropertyValidator<'prop', object>;
      expect(actualInstance).toBe(true);
    });

    it('number value should return the NumberPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        12,
        {},
        [],
      ).number;

      const actualInstance =
        result instanceof NumberPropertyValidator<'prop', object>;
      expect(actualInstance).toBe(true);
    });

    it('boolean value should return the BooleanPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        false,
        {},
        [],
      ).boolean;

      const actualInstance =
        result instanceof BooleanPropertyValidator<'prop', object>;
      expect(actualInstance).toBe(true);
    });

    it('object value should return the ObjectPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        { innerProp: 'test' },
        {},
        [],
      ).object;

      const actualInstance =
        result instanceof
        ObjectPropertyValidator<'prop', { innerProp: string }, object>;
      expect(actualInstance).toBe(true);
    });

    it('array value should return the ArrayPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        ['test'],
        {},
        [],
      ).array;

      const actualInstance =
        result instanceof
        ArrayPropertyValidator<'prop', string, string[], object>;
      expect(actualInstance).toBe(true);
    });

    it('unknown value should return the UnknownPropertyValidator', () => {
      const result = InnerValidator.getValidator(
        'prop',
        Symbol('test'),
        {},
        [],
      ).unknown;

      const actualInstance =
        result instanceof UnknownPropertyValidator<'prop', unknown, object>;
      expect(actualInstance).toBe(true);
    });
  });
});
