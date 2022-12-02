type ValidationResult = { isValid: true; reason: undefined } | { isValid: false; reason: string };

export type Validator = (value: string) => ValidationResult;
