import { EOL } from 'os';
import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const token: string = core.getInput('github-token');
  const labelReplacement = JSON.parse(core.getInput('label-replacement', { required: true }));
  //const labelToReplace: string = core.getInput('label-to-replace');
  //const labelToReplaceWith: string = core.getInput('label-to-replace-with');

  //console.log(labelToReplace, labelToReplaceWith);

  //if (token) console.log('token exists');

  //console.log(labelReplacement);

  //console.log(labelReplacement.a);


  const octokit = github.getOctokit(token);
  const repo = github.context.repo;

  await verifyLabels();

  for (const label in labelReplacement) {
    await updateLabel(label, labelReplacement[label]);
  }

  async function updateLabel(label: string, newLabel: string) {
    console.log(`Updating label ${label} to ${newLabel}`);
    await octokit.rest.issues.updateLabel({
      owner: repo.owner,
      repo: repo.repo,
      name: label,
      new_name: newLabel,
    });
  }

  async function verifyLabels(): Promise<void> {
    const allLabels = await octokit.rest.issues.listLabelsForRepo({
      owner: repo.owner,
      repo: repo.repo,
    });

    const allLabelNames = allLabels.data.map(label => label.name);

    //console.log(allLabelNames);

    const errors: string[] = [];

    for (const label in labelReplacement) {
      if (!(allLabelNames.includes(label))) {
        errors.push(`Label ${label} not found`);
      }
      if (allLabelNames.includes(labelReplacement[label])) {
        errors.push(`Label ${labelReplacement[label]} already exists in repo`);
      }
    }
    if (errors.length > 0) {
      throw new Error(`Errors:${EOL}${errors.join(EOL)}`);
    }
  }
}


run().catch(error => {
  core.setFailed(error.message);
});