import { jiraTicketInLastLineValidator } from '../jira-ticket-in-last-line.validator';

describe('function jiraTicketInLastLineValidator', () => {
  it.each([['test\n\nABC-123'], ['ABC-123'], ['test\n\nABC-123\n\n']])(
    'for "%s" validation passes',
    (input: string) => {
      expect(jiraTicketInLastLineValidator(input)).toEqual({
        isValid: true,
      });
    }
  );

  it.each([['test\nabc-123'], ['ABC-123\n\ntest']])(
    'for "%s" validation fails',
    (input: string) => {
      expect(jiraTicketInLastLineValidator(input)).toEqual({
        isValid: false,
        reason: 'The last line must contain JIRA ticket number.',
      });
    }
  );
});
