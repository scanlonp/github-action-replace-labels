import * as core from '@actions/core';
//import * as github from '@actions/github';

async function run() {
  const token: string = core.getInput('github-token');
  const labelReplacement = JSON.parse(core.getInput('label-replacement', { required: true }));
  //const labelToReplace: string = core.getInput('label-to-replace');
  //const labelToReplaceWith: string = core.getInput('label-to-replace-with');

  //console.log(labelToReplace, labelToReplaceWith);

  if (token) console.log('token exists');

  console.log(labelReplacement);

  console.log(labelReplacement.a);

  Object.keys(labelReplacement).forEach((key:string)=>{
    console.log(labelReplacement[key]);
  });

  //const octokit = github.getOctokit(token);
  //const repo = github.context.repo;

  //await updateLabel(labelToReplace, labelToReplaceWith);

  /*
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


/**
 * Renders a TypeScript list based on what we expect the list to look like in yaml.
 * We expect to see something like "[item1,item2]". GitHub will return '' if the
 * input is not defined, so treating the empty string like undefined.
 */
/*
function renderListInput(rawInput: string): string[] {
  return (rawInput === '' || rawInput === '[]') ? [] : rawInput.slice(1, -1).split(',');
}
*/


run().catch(error => {
  core.setFailed(error.message);
});