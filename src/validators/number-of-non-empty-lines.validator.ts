import type { Validator } from '../types';

export const getNumberOfNonEmptyLinesValidator =
  (numberOfLines: number): Validator =>
  (value: string) =>
    value.split('\n').filter((line) => line.length > 0).length >= numberOfLines
      ? { isValid: true }
      : { isValid: false, reason: `Must contain at least ${numberOfLines} non-empty lines.` };
