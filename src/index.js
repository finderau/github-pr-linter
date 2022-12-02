"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lint_1 = tslib_1.__importDefault(require("./lint"));
const github = tslib_1.__importStar(require("@actions/github"));
const core = tslib_1.__importStar(require("@actions/core"));
const run = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const body = (_a = github.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.body;
    const title = (_b = github.context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.title;
    if (typeof body === "undefined" || typeof title === "undefined") {
        core.error("Body or title is undefined.");
        return;
    }
    try {
        yield (0, lint_1.default)(body, title, core.setFailed, core.info);
    }
    catch (error) {
        if (typeof error === "string" || error instanceof Error) {
            core.error(error);
        }
    }
});
void run();
