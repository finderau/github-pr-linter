const lint = require('./src/lint.js');

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

Relates to CST-2332`;

lint(body, title, console.error, console.log);
