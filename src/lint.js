module.exports = function (body, title, failureCallback, infoCallback) {
    const bodyLines = body.split("\n");

    // Ensure the PR title matches
    infoCallback('Checking PR title: ' + title);
    const titleRegex = new RegExp(
        '^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\\([\\w\\-.]+\\))?(!)?: '
        + '([\\w ])+([\\s\\S]*)$'
    );
    if (!titleRegex.test(title)) {
        failureCallback('Invalid PR title. Check the CONTRIBUTING.md file for more information.');
    }

    // Ensure that there is some description
    infoCallback('Checking PR body description');
    if (body.split("\n").length < 3) {
        failureCallback('Invalid PR body. Needs a description of the WHY behind the change.');
    }

    // Ensure a Jira ticket is referenced in the body
    infoCallback('Checking PR body Jira reference');
    const jiraRegex = new RegExp('^(Relates to|Closes) ((?<!([A-Z]{1,10})-?)[A-Z]+-\\d+)$');
    if (!jiraRegex.test(bodyLines[bodyLines.length - 1])) {
        failureCallback(
            'Invalid PR body: The last line must contain a Jira reference. '
            + 'Must be either (1) Relates to PROJECT-0000, or (2) Closes PROJECT-0000. '
            + 'Include the Jira reference only, not a full link.'
        );
    }

    // Ensure that there is a blank line before the Jira reference
    infoCallback('Checking PR body empty line');
    if (bodyLines[bodyLines.length - 2] === '') {
        failureCallback('Invalid PR body. Needs a blank line before the Jira reference.');
    }
};
