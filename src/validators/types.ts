import { ArrayValidator } from './ArrayPropertyValidator';
import { BooleanValidator } from './BooleanPropertyValidator';
import { NumberValidator } from './NumberPropertyValidator';
import { ObjectValidator } from './ObjectPropertyValidator';
import { StringValidator } from './StringPropertyValidator';

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

type UnknownValidator<Key extends string, Context> = {};

export type PropertyValidator<Key extends string, Value, Context> = 
  Value extends string | undefined
    ? StringValidator<Key, Context>
  : Value extends number | undefined
    ? NumberValidator<Key, Context>
  : Value extends boolean | undefined
    ? BooleanValidator<Key, Context>
  : Value extends object | undefined
    ? ObjectValidator<Key, Value, Context>
  : Value extends any[] | undefined
    ? ArrayValidator<Key, Context>
  : UnknownValidator<Key, Context>;