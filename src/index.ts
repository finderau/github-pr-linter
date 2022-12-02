import lint from "./lint";
import * as github from "@actions/github";
import * as core from "@actions/core";

const run = async (): Promise<void> => {
  const body = github.context.payload.pull_request?.body;
  const title = github.context.payload.pull_request?.title;

  if (typeof body === "undefined" || typeof title === "undefined") {
    core.error("Body or title is undefined.");
    return;
  }

  try {
    await lint(body, title, core.setFailed, core.info);
  } catch (error) {
    if (typeof error === "string" || error instanceof Error) {
      core.error(error);
    }
  }
};

void run();
