import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const token: string = core.getInput('github-token');
  //const labelReplacement = JSON.parse(core.getInput('label-replacement', { required: true }));
  //const labelToReplace: string = core.getInput('label-to-replace');
  //const labelToReplaceWith: string = core.getInput('label-to-replace-with');

  //console.log(labelToReplace, labelToReplaceWith);

  //if (token) console.log('token exists');

  //console.log(labelReplacement);

  //console.log(labelReplacement.a);


  const octokit = github.getOctokit(token);
  const repo = github.context.repo;

  const allLabels = await octokit.rest.issues.listLabelsForRepo({
    owner: repo.owner,
    repo: repo.repo,
  });

  const allLabelNames = allLabels.data.map(label => label.name);

  console.log(allLabelNames);

  /*
  for (const label in labelReplacement) {
    try {
      await updateLabel(label, labelReplacement[label]);
    } catch (error) {
      console.log(error);
      console.log(typeof(error));
      console.log();
    }
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
  */
}


run().catch(error => {
  core.setFailed(error.message);
});