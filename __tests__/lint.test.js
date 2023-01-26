// noinspection JSUnresolvedFunction,JSUnresolvedVariable

const lint = require('../src/lint.js');

test('failure', () => {
    const title = 'chore: use internal PR linting action';
    const body = `Use the internal GitHub Action for linting PR title/body.

We're using an internal one so that we can ensure a few things specific
to Finder's use case, including the correct placement of the Jira
reference.`;

    const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(1);
});

test('failure with empty line', () => {
    const title = 'chore: something';
    const body = `Some description

Closes [ABC-123](https://finder.atlassian.net/browse/ABC-123)
`;

    const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(1);
});

test('success', () => {
    const title = 'chore: reinstate PR linter';
    const body = `Upgrading to v1.0.6 which should fix the issue where PR descriptions
like this one were failing the check:
https://github.com/finderau/site/pull/5057

Relates to [SRE-225]`;

    const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(0);
});

test('success with checkboxes', () => {
    const title = 'feat: improve redirect page performance';
    const body = `#### Ticket Number
https://finder.atlassian.net/browse/CST-2332

#### Description
This PR improves redirect page performance by fixing the mechanism, which allows getting the correct niche from the URL if available. This saves time-intensive searches for the correct niche in Product API.


---

### Pre-deployment checklist

- [ ] Confirmed that code can be deployed (no code freeze, support confirmed at least for 2 hours, sign-off from a leader if deployment outside of support hours)
- [ ] Code tested on the local or staging environment both on FIN and FUS (cross-browser and cross-device testing where appropriate)
- [ ] Code optimized ([Speed standards](https://github.com/finderau/engineering-standards/blob/master/general/2019-05-29-speed-standards.md) and not negatively affecting performance ([Web Vitals testing guide](https://finder.atlassian.net/wiki/spaces/GPD/pages/2075558987/Testing+Speed+Web+Vitals))
- [ ] Deployment communicated properly according to [Release Risk calculation](https://github.com/finderau/engineering-standards/blob/master/general/2020-06-03-major-deployment-guidelines.md#release-risk-calculation)
- [ ] No active secrets (keys, tokens, passwords, etc) have been included in any of the commits at any point (remove and rotate them otherwise)
- [ ] Environmental variables set (both FIN and FUS)

Remember to follow the [Major Deployment Guidelines](https://github.com/finderau/engineering-standards/blob/master/general/2020-06-03-major-deployment-guidelines.md) when deploying.

Relates to [CST-2332]`;

    const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(0);
});

test('failure with full jira link', () => {
    const title = 'chore: something';
    const body = `Some description

Relates to https://finder.atlassian.net/browse/PLATFORM-4864
`;

const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(1);
});

test('failure with invalid jira reference', () => {
    const title = 'chore: something';
    const body = `Some description

Relates to 1234
`;

const errorCallback = jest.fn(() => {});
    lint(body, title, errorCallback, () => {});
    expect(errorCallback.mock.calls.length).toBe(1);
});
