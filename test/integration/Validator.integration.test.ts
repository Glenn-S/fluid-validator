import { Validator } from '../../src/Validator';

describe('Validator', () => {
  interface TestInterface {
    prop1: string;
    prop2: number;
    prop3: boolean;
  }

  const testData: TestInterface = {
    prop1: 'abc',
    prop2: 123,
    prop3: true,
  };

  it('succcessful validation should return successful validation result', () => {
    const result = new Validator(testData)
      .property('prop1', (prop1) => prop1.minLength(3))
      .property('prop2', (prop2) => prop2.equal(123))
      .property('prop3', (prop3) => prop3.isTrue())
      .validate();
    
      expect(result.isValid).toBe(true);
      expect(result.errors.length).toBe(0);
  });

  it('failed validation should return validation failures', () => {
    const result = new Validator(testData)
      .property('prop1', (prop1) => prop1.minLength(4))
      .property('prop2', (prop2) => prop2.equal(124))
      .property('prop3', (prop3) => prop3.isFalse())
      .validate();
    
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(3);
    const prop1Error = result.errors.find((item) => item.property === 'prop1');
    expect(prop1Error?.error).toBe('minLength');
    const prop2Error = result.errors.find((item) => item.property === 'prop2');
    expect(prop2Error?.error).toBe('equal');
    const prop3Error = result.errors.find((item) => item.property === 'prop3');
    expect(prop3Error?.error).toBe('isFalse');
  });

  it('multiple validation failure on same property should return validation failures', () => {
    const result = new Validator(testData)
      .property('prop1', (prop1) => {
        prop1
          .minLength(4)
          .regex(new RegExp(/^abcd$/g))
      })
      .validate();
    
    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(2);
    const errors = result.errors.map((e) => ({error: e.error, property: e.property}));
    expect(errors.every((e) => e.property === 'prop1')).toBe(true);
    expect(errors.filter((e) => e.error === 'minLength').length).toBe(1);
    expect(errors.filter((e) => e.error === 'regex').length).toBe(1);
  });

  it('calling throwOnError in validate should throw error when validation error occurs', () => {
    const result = () => new Validator(testData)
      .property('prop1', (prop1) => prop1.minLength(4))
      .validate(true);
    
    expect(result).toThrow();
  });
});