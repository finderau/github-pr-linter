"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (body, title, failureCallback, infoCallback) => {
    const bodyLines = body.split("\n");
    infoCallback("Title: " + title);
    infoCallback("Body: " + body);
    // Ensure the PR title matches
    infoCallback("Checking PR title");
    const titleRegex = new RegExp("^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\\([\\w\\-.]+\\))?(!)?: " +
        "([\\w ])+([\\s\\S]*)$");
    if (!titleRegex.test(title)) {
        failureCallback("Invalid PR title. Check the CONTRIBUTING.md file for more information.");
    }
    // Ensure that there is some description
    infoCallback("Checking PR body description");
    if (body.split("\n").length < 3) {
        failureCallback("Invalid PR body. Needs a description of the WHY behind the change.");
    }
    // Ensure that the last line of the body is not an empty line
    infoCallback("Checking PR body does not end in empty line");
    if (bodyLines[bodyLines.length - 1].trim() === "") {
        failureCallback("Invalid PR body. Last line is empty.");
    }
    else {
        // Ensure a Jira ticket is referenced on the last line of the body
        infoCallback("Checking PR body Jira reference");
        const jiraRegex = new RegExp("^(Relates to|Closes) ((?<!([A-Z]{1,10})-?)[A-Z]+-\\d+)$");
        if (!jiraRegex.test(bodyLines[bodyLines.length - 1])) {
            failureCallback("Invalid PR body: The last line must contain a Jira reference. " +
                "Must be either (1) Relates to PROJECT-0000, or (2) Closes PROJECT-0000. " +
                "Include the Jira reference only, not a full link.");
        }
        else {
            const regexResult = jiraRegex.exec(bodyLines[bodyLines.length - 1]);
            if ((regexResult === null || regexResult === void 0 ? void 0 : regexResult[2]) === "XYZ-123") {
                failureCallback("Invalid PR body: The template Jira reference (XYZ-123) must be replaced.");
            }
            // Ensure that there is a blank line before the Jira reference
            infoCallback("Checking PR body empty line before Jira reference");
            if (bodyLines[bodyLines.length - 2].trim() !== "") {
                for (let i = 0; i < bodyLines.length; i++) {
                    infoCallback("Body line " + i + ": " + bodyLines[i]);
                }
                failureCallback("Invalid PR body. Needs a blank line before the Jira reference. " +
                    "(Expected blank line, found " +
                    bodyLines[bodyLines.length - 2] +
                    ")");
            }
        }
    }
};
