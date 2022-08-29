const core = require('@actions/core');
const github = require('@actions/github');
const lint = require('./src/lint.js');

// noinspection JSUnusedLocalSymbols
async function run() {
    try {
        const title = github.context.payload.pull_request.title;
        const body = github.context.payload.pull_request.body;

        lint(body, title, core.setFailed, core.info);
    } catch (error) {
        core.error(error);
    }
}

// noinspection JSIgnoredPromiseFromCall
run();
