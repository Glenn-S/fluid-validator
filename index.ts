import { Test1, test1Validator } from './test/helpers/test1Validator';

export {Validator} from './src/Validator';
export {
  ValidationResult,
  ValidationError,
} from './src/validators';

const test: Test1 = {
  prop1: ['testing'],
  prop2: {
    innerProp1: 'test21',
    innerProp2: [
      'innerTest2Array'
    ],
  },
};

const validator = test1Validator(test);
console.log(validator);
