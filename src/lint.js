module.exports = function (body, title, failureCallback, infoCallback) {
    const bodyLines = body.split("\n");

    infoCallback('Title: ' + title);
    infoCallback('Body: ' + body);

    // Ensure the PR title matches
    infoCallback('Checking PR title');
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

    // Ensure that the last line of the body is not an empty line
    infoCallback('Checking PR body does not end in empty line');
    if (bodyLines[bodyLines.length - 1].trim() === '') {
        failureCallback('Invalid PR body. Last line is empty.');
    } else {
        // Ensure that a valid Jira reference exists in the pull request body
        infoCallback('Checking PR body Jira reference');
        const jiraReferenceRegex = new RegExp(/^(Relates to|Closes) \[([A-Za-z]+-[0-9]+)]$/gm);
        let regexMatchFound = false;
        for (const line of bodyLines) {
            if (jiraReferenceRegex.test(line)) {
              if (!regexMatchFound) {
                regexMatchFound = true;
                infoCallback('Valid Jira reference exists in body')
                break;
              }
            }
        }
        if (!regexMatchFound) {
            failureCallback(
                'Invalid Jira reference in body: The last line must contain a Jira reference. '
                + 'Must be either (1) Relates to [PROJECT-0000], or (2) Closes [PROJECT-0000]. '
                + 'Include the Jira reference within square brackets e.g "[PROJECT-0000]" , not a full link.'
            );
        }
    }
};
