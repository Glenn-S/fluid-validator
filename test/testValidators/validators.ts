import { ValidationResult } from '../../src/types';
import { Validator } from '../../src/Validator';
import { Test1 } from '../entities/Test1';

export const test1Validator = (value: Test1): ValidationResult => {
  const validationResult = new Validator<Test1>(value)
    .property('prop1', (prop1) => {
      prop1.maxLength(3);
    })
    .property('prop4', (prop4) => {
      prop4
        .property('nestedProp1', (nestedProp2) => {
          nestedProp2.maxLength(2)
            .custom((context) => {
              return {
                error: '',
                property: '',
                description: '',
              }
            });
        })
        .property('nestedProp3', (nestedProp3) => {
          nestedProp3.property('nestedNestedProp1', (nestedNestedProp1) => {
            nestedNestedProp1.maxLength(3);
          });
        });
    })
    .validate();

  return validationResult;
}