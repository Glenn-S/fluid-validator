import { ArrayValidator } from './ArrayPropertyValidator';
import { BooleanValidator } from './BooleanPropertyValidator';
import { NumberValidator } from './NumberPropertyValidator';
import { ObjectValidator } from './ObjectPropertyValidator';
import { StringValidator } from './StringPropertyValidator';
import { UnknownValidator } from './UnknownPropertyValidator';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  error: string;
  property: string;
  value: string;
  description?: string;
}

export interface CommonProperty {
  getValidationErrors(): ValidationError[];
}

export type Infer<ArrType> = ArrType extends (infer Element)[]
  ? Element
  : unknown;

export type PropertyValidator<
  Key extends string,
  Value,
  Context,
> = Value extends string | undefined
  ? StringValidator<Key, Context>
  : Value extends number | undefined
  ? NumberValidator<Key, Context>
  : Value extends boolean | undefined
  ? BooleanValidator<Key, Context>
  : Value extends (infer ElemType)[] | undefined
  ? ArrayValidator<Key, ElemType, ElemType[], Context>
  : Value extends object | undefined
  ? ObjectValidator<Key, Value, Context>
  : UnknownValidator<Key, Value, Context>;
