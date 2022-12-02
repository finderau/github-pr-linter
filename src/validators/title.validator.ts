import type { Validator } from '../types';

const TITLE_REGEX = new RegExp(
  '^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\\([\\w\\-.]+\\))?(!)?: ' +
    '([\\w ])+([\\s\\S]*)$'
);

export const titleValidator: Validator = (value: string) =>
  TITLE_REGEX.test(value)
    ? { isValid: true }
    : {
        isValid: false,
        reason: 'Check the CONTRIBUTING.md file for more information.',
      };
