import * as github from '@actions/github';
import { error, setFailed } from '@actions/core';
import type { Validator } from './types';
import { titleValidator } from './validators/title.validator';
import { jiraTicketInLastLineValidator } from './validators/jira-ticket-in-last-line.validator';
import { getNumberOfNonEmptyLinesValidator } from './validators/number-of-non-empty-lines.validator';

const titleValidators: Validator[] = [titleValidator];
const bodyValidators: Validator[] = [
  jiraTicketInLastLineValidator,
  getNumberOfNonEmptyLinesValidator(2),
];

const run = async (): Promise<void> => {
  const body = github.context.payload.pull_request?.body;
  const title = github.context.payload.pull_request?.title;

  if (typeof body === 'undefined' || typeof title === 'undefined') {
    error('Body or title is undefined.');
    return;
  }

  try {
    titleValidators
      .map((validator) => validator(title))
      .filter(({ isValid }) => !isValid)
      .forEach(({ reason }) => setFailed(`Invalid PR title: ${reason!}`));

    bodyValidators
      .map((validator) => validator(body))
      .filter(({ isValid }) => !isValid)
      .forEach(({ reason }) => setFailed(`Invalid PR body: ${reason!}`));
  } catch (e) {
    if (typeof e === 'string' || e instanceof Error) {
      error(e);
    }
  }
};

void run();
