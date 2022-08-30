const lint = require('./src/lint.js');

const title = 'chore: something';
const body = `Some description

Closes XYZ-123`;

lint(body, title, console.error, console.log);
