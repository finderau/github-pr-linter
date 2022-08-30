const lint = require('./src/lint.js');

const title = 'chore: reinstate PR linter';
const body = `Upgrading to v1.0.6 which should fix the issue where PR descriptions
like this one were failing the check:
https://github.com/finderau/site/pull/5057

Relates to SRE-225`;

lint(body, title, console.error, console.log);
