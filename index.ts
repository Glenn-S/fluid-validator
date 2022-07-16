import { Test1 } from './test/entities/Test1';
import { test1Validator } from './test/testValidators/validators';

const test1: Test1 = {
  prop1: 'abcd',
  prop2: 1,
  prop3: true,
  prop4: {
    nestedProp1: 'test',
    nestedProp2: 2,
    nestedProp3: {
      nestedNestedProp1: 'test2',
    },
  },
};

// const test2: Test1 = {
//   prop1: 'abcd',
//   prop2: 1,
//   prop3: true,
//   prop4: {
//     nestedProp1: 'test',
//     nestedProp2: 2,
//     nestedProp3: {
//       nestedNestedProp1: 'test2',
//     }
//   },
// };

try {
  const validationResult = test1Validator(test1);
  console.log(validationResult);
} catch (err) {
  const e = err as Error;
  console.log(e.message);
}
