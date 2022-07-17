import { Validator } from '../../src/Validator'

export interface Test1 {
  prop1: string[];
  prop2: {
    innerProp1: string;
    innerProp2: string[];
  }
}

export const test1Validator = (value: Test1) => {
  return new Validator(value)
    .property('prop1', (prop1) => {
      prop1.isEmpty();
      prop1.forEach((item) => {
        item.maxLength(2);
      });
    })
    .property('prop2', (prop2) => {
      prop2.property('innerProp1', (innerProp1) => {
        innerProp1.maxLength(2);
      });
    })
    .validate();
}