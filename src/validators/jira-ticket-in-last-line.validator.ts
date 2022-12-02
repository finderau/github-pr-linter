import type { Validator } from '../types';

const JIRA_TICKET_REGEX = /(^|\/|\s)[A-Z0-9]+-[0-9]+/;

export const jiraTicketInLastLineValidator: Validator = (value: string) => {
  const lines = value.split('\n').filter((line) => line.length > 0);

  return JIRA_TICKET_REGEX.test(lines[lines.length - 1])
    ? { isValid: true }
    : { isValid: false, reason: 'The last line must contain JIRA ticket number.' };
};
