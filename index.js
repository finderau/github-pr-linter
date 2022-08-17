const core = require('@actions/core');
const github = require('@actions/github');

// noinspection JSUnusedLocalSymbols
async function run() {
    try {
        const title = github.context.payload.pull_request.title;
        const body = github.context.payload.pull_request.body;
        const bodyLines = body.split("\n");

        // Ensure the PR title matches
        const conventionalCommitsRegex = new RegExp(
            '^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\\([\\w\\-.]+\\))?(!)?: '
            + '([\\w ])+([\\s\\S]*)\n'
        );
        if (!conventionalCommitsRegex.test(title)) {
            core.setFailed('Invalid PR title. Check the CONTRIBUTING.md file for more information.');
        }

        // Ensure that there is some description
        if (body.split("\n").length < 3) {
            core.setFailed('Invalid PR body. Needs a description of the WHY behind the change.');
        }

        // Ensure a Jira ticket is referenced in the body
        const jiraRegex = new RegExp('^(Relates to|Closes) ((?<!([A-Z]{1,10})-?)[A-Z]+-\\d+)$');
        if (!jiraRegex.test(bodyLines[bodyLines.length - 1])) {
            core.setFailed(
                'Invalid PR body: The last line must contain a Jira reference. '
                + 'Must be either (1) Relates to PROJECT-0000, or (2) Closes PROJECT-0000. '
                + 'Include the Jira reference only, not a full link.'
            );
        }

        // Ensure that there is a blank line before the Jira reference
        if (bodyLines[bodyLines.length - 2] === '') {
            core.setFailed('Invalid PR body. Needs a blank line before the Jira reference.');
        }
    } catch (error) {
        core.error(error);
    }
}
