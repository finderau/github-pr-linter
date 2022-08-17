const lint = require('./src/lint.js');

const title = 'chore: use internal PR linting action';
const body = `Use the internal GitHub Action for linting PR title/body.

We're using an internal one so that we can ensure a few things specific
to Finder's use case, including the correct placement of the Jira
reference.`;

lint(body, title, console.error, console.log);
