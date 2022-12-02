import { getNumberOfNonEmptyLinesValidator } from '../number-of-non-empty-lines.validator';

describe('function getNumberOfNonEmptyLinesValidator', () => {
  it('validation fails if text has less non empty lines than required', () => {
    expect(getNumberOfNonEmptyLinesValidator(2)('test\n\n\n')).toEqual({
      isValid: false,
      reason: 'Must contain at least 2 non-empty lines.',
    });
  });
  it('validation passes if text has equal non empty lines as required', () => {
    expect(getNumberOfNonEmptyLinesValidator(2)('test\n\n\nfoo')).toEqual({
      isValid: true,
    });
  });
  it('validation passes if text has more non empty lines than required', () => {
    expect(getNumberOfNonEmptyLinesValidator(2)('test\n\n\nfoo\nbar')).toEqual({
      isValid: true,
    });
  });
});
