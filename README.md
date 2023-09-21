This action replaces labels at a repository level by renaming them.

It takes an input `label-replacement`, which is a map of current label name to new name.

Ex.
```
name: replace-labels
on: 
  workflow_dispatch: {}
permissions: write-all
jobs:

  call-action:
    runs-on: ubuntu-latest
    steps:
      - uses: scanlonp/github-action-replace-labels@main
        id: replace-labels
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          label-replacement: >
            {
              "priority1" : "p1",
              "priority2" : "p2"
            }
```
This would change the label `priority1` to `p1`, and all issues / PRs with the `priority1` label would be updated with the `p1` label. Same for `priority2` to `p2`.

The action also has error checking. If any of the keys in the mapping are not current labels in the repository, or any of the values are the names of existing labels, the action will error out before doing any replacement and report the faulty names.
