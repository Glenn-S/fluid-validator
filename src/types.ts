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