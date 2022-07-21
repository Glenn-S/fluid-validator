# Fluid Validator

A library for specifying object validation. Please note, this library is still under construction and is not stable yet.

## Installation and Usage
### Installation
```sh
npm i fluid-validator
```

### Usage

Fluid Validator is a library that is intended to facilitate validating well defined objects. Validation is done through an opt-in approach so you only have to write validations for what you want on your object. For the best experience, use with a Typescript project since the validator properties can infer the property names and types. 

ES6
```code
import {Validator} from 'fluid-validator';

interface User {
  firstName: string;
  lastName?: string;
  age: number;
}

const user: User = {
  firstName: 'hello',
  lastName: 'world',
  age: 28,
};

const userValidator = new Validator<User>()
  .property('firstName', (firstName) => firstName.maxLength(30).minLength())
  .property('lastName', (lastName) => lastName.isUndefined())
  .property('age', (age) => age.greaterThanOrEqual(18))
  .build();

const result = userValidator.validate(user);
```

#### Validator Methods
`property(propertyName: string, (propertyValue) => void)`
<br>
Defines a property to begin writing validation rules. The property name in the first argument must correspond to a property that exists on the object. The second argument is a lambda which provides access to the value associated with that property in order to call the appropriate validation method(s). The name of the argument in the lambda does not need to correspond with the property name.
```code
new Validator<User>().property('firstName', (fn) => fn.maxLength(4));
```
-------------------------------------------
`build()`
<br>
Acts as a method that blocks any additional rules from being specified. This method is provided to allow creating a validation lambda which can "lock" the validator from further modification in order to only allow the validate method to be called after. This is done to allow a single validator instance to be used multiple times.
```code
const userValidator = new Validator<User>()
  .property('firstName', (fn) => fn.maxLength(50))
  .build();
const result = userValidator.validate(someUser);
```
------------------------
`validate(instanceToValidate: T, throwOnError?: boolean): ValidationResult`
<br>
Runs the validation of an instance which corresponds to the type allowed in the validator. This method may be called after any 'property()' call or after the 'build()' call. The validator returns an object containing a list of errors, if any, along with a shortcut property to specify if the object validated had errors or not.
```code
const userValidator = new Validator<User>()
  .property('firstName', (fn) => fn.maxLength(50))
  .build();
const {isValid, errors} = userValidator.validate(someUser);

if (!isValid) {
  throw new Error(errors);
}
...
```
The second argument, 'throwOnError', is intended to allow throwing an error if any validation errors occur instead of failing silently with the errors returned.
```code
try {
  userValidator.validate(someUser, true);
} catch (e) {
  // handle error
}
```

#### Property Validation methods

##### Common Validations
`isNull(message?: string)`
<br>
Checks if a properties value is null.
```code
prop.isNull('property was not null');
```
----------
`isNotNull(message?: string)`
<br>
Checks if a properties value is not null.
```code
prop.isNotNull('property was null');
```
----------
`isUndefined(message?: string)`
<br>
Checks if a properties value is undefined.
```code
prop.isUndefined('property was not undefined');
```
----------
`isNotUndefined(message?: string)`
<br>
Checks if a properties value is not undefined.
```code
prop.isNotUndefined('property was undefined');
```
----------
`isCustom((propertyValue: T, context: U) => ValidationError | null)`
<br>
Allows the creation of a custom validation rule if custom logic is required. A lambda is required to be defined which returns a ValidationError dependent on your own custom rules. The first property of the lambda provided is the raw value of the property being validated. The second property of the lambda gives access to the entire object being validated if it is required that there is some dependent values in which you need access to.
```code
prop.custom((value) => {
  if (value === 'hello world') {
    return {
      error: 'custom',
      property: 'prop',
      value,
      description: 'property did not equal \'hello world\'',
    };
  }
})
```
----------
<br>
More to come...

##### String Validations
`maxLength(expected: number, message?: string)`
<br>
Checks the maximum length of a string inclusively. Can be used within any 'property()' method, as well as the arra 'forEach()' method.
```code
prop.maxLength(20, 'string can be no more than 20 characters')
```
----------
`minLength(expected: number, message?: string)`
<br>
Checks the minimum length of a string inclusively. Can be used within any 'property()'.
```code
prop.minLength(1, 'string can be no less than 1 character');
```
----------
`regex(expected: RegExp, message?: string)`
<br>
Checks a string against a given regular expression.
```code
prop.regex(RegExp(/(abc)+/g), 'string did not match the given regular expression');
```
More to come...

#### Number
`equal(value: number, message?: string)`
<br>
Checks if a number is equal in value.
```code
prop.equal(5, 'number did not equal 5');
```
---------
`greaterThan(value: number, message?: string)`
<br>
Checks if a number is greater than a value.
```code
prop.greaterThan(5, 'number was not greater than 5');
```
---------
`greaterThanOrEqual(value: number, message?: string)`
<br>
Checks if a number is greater than or equal to a value.
```code
prop.greaterThan(5, 'number was not greater than or equal to 5');
```
---------
`lessThan(value: number, message?: string)`
<br>
Checks if a number is less than a value.
```code
prop.lessThan(5, 'number was not less than 5');
```
---------
`lessThanOrEqual(value: number, message?: string)`
<br>
Checks if a number is less than or equal to a value.
```code
prop.lessThanOrEqual(5, 'number was not less than or equal to 5');
```

#### Boolean
`isTrue(message?: string)`
<br>
Checks if a boolean property value is true.
```code
prop.isTrue('value should have been true');
```
---------
`isFalse(message?: string)`
<br>
Checks if a boolean property value is false.
```code
prop.isFalse('value should have been false');
```

#### Object
`property(propertyName: string, (propertyValue) => void)`
<br>
Defines a property to begin writing validation rules on nested properties of an object. The property name in the first argument must correspond to a property that exists on the object. The second argument is a lambda which provides access to the value associated with that property in order to call the appropriate validation method(s). The name of the argument in the lambda does not need to correspond with the property name.
```code
outerProp.property('innerProperty', (fn) => fn.maxLength(4));
```
This property method is used in exactly the same manner as the one available on the Validator class directly.

#### Array
`isEmpty(message?: string)`
<br>
Checks if an array is empty.
```code
prop.isEmpty('array should have been empty');
```
--------
`forEach((element: T) => void, message?: string)`
<br>
Checks each item of an array and runs the given validation against each item. If any of the items fail validation, a validation error is generated. All validation methods are available to be used on the argument passed in from the labmda and the type is inferred.
```code
prop.forEach((elem) => elem.maxLength(5));
```

#### Unknown
If the type cannot be inferred, such as the case when a property is unknown, there are some validation methods available as a backup. They are those found in the common section above.

#### Date
Coming soon...

## License
GPLv3