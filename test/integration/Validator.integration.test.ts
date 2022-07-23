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
    const result = new Validator<TestInterface>()
      .property('prop1', (prop1) => prop1.minLength(3))
      .property('prop2', (prop2) => prop2.equal(123))
      .property('prop3', (prop3) => prop3.isTrue())
      .validate(testData);

    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('failed validation should return validation failures', () => {
    const result = new Validator<TestInterface>()
      .property('prop1', (prop1) => prop1.minLength(4))
      .property('prop2', (prop2) => prop2.equal(124))
      .property('prop3', (prop3) => prop3.isFalse())
      .validate(testData);

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
    const result = new Validator<TestInterface>()
      .property('prop1', (prop1) => {
        prop1.minLength(4).regex(new RegExp(/^abcd$/g));
      })
      .validate(testData);

    expect(result.isValid).toBe(false);
    expect(result.errors.length).toBe(2);
    const errors = result.errors.map((e) => ({
      error: e.error,
      property: e.property,
    }));
    expect(errors.every((e) => e.property === 'prop1')).toBe(true);
    expect(errors.filter((e) => e.error === 'minLength').length).toBe(1);
    expect(errors.filter((e) => e.error === 'regex').length).toBe(1);
  });

  it('calling throwOnError in validate should throw error when validation error occurs', () => {
    const result = () =>
      new Validator<TestInterface>()
        .property('prop1', (prop1) => prop1.minLength(4))
        .validate(testData, true);

    expect(result).toThrow();
  });

  describe('types', () => {
    it('string should call StringPropertyValidator', () => {
      const testData = 'test';

      const result = new Validator<{prop: string}>()
        .property('prop', (prop) => prop.maxLength(3))
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('maxLength');
    });

    it('boolean should call BooleanPropertyValidator', () => {
      const testData = false;

      const result = new Validator<{prop: boolean}>()
        .property('prop', (prop) => prop.isTrue())
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('isTrue');
    });

    it('number should call NumberPropertyValidator', () => {
      const testData = 123;

      const result = new Validator<{prop: number}>()
        .property('prop', (prop) => prop.equal(124))
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('equal');
    });

    it('date should call DatePropertyValidator', () => {
      const testData = new Date(2022, 6, 23);

      const result = new Validator<{prop: Date}>()
        .property('prop', (prop) => prop.equalDate(new Date(2022, 6, 24)))
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('equalDate');
    });

    it('object should call ObjectPropertyValidator', () => {
      const testData = {innerProp: 123};

      const result = new Validator<{prop: {innerProp: number}}>()
        .property('prop', (prop) => prop.property('innerProp', (innerProp) => innerProp.equal(124)))
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop.innerProp');
      expect(result.errors[0].error).toBe('equal');
    });

    it('array should call ArrayPropertyValidator', () => {
      const testData = [1, 2, 3];

      const result = new Validator<{prop: number[]}>()
        .property('prop', (prop) => prop.isEmpty())
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('isEmpty');
    });

    it('unknown should call UnknownPropertyValidator', () => {
      const testData = 123;

      const result = new Validator<{prop: unknown}>()
        .property('prop', (prop) => prop.isNull())
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('isNull');
    });

    it('any should call UnknownPropertyValidator', () => {
      const testData = 123;

      const result = new Validator<{prop: any}>()
        .property('prop', (prop) => prop.isUndefined())
        .validate({prop: testData}); 
      expect(result.isValid).toBe(false);
      expect(result.errors[0].property).toBe('prop');
      expect(result.errors[0].error).toBe('isUndefined');
    });
  });
});
