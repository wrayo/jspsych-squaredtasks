# Squared Tasks for Qualtrics

This repository adapts the original `squared_jspsych` task bundle into a
Qualtrics-friendly hosted asset package.

## What is in here

- `qualtrics-v7/`
  Hosted assets for running the Squared task battery from Qualtrics.
- `qualtrics-v7/squared-v7-task.js`
  The original task logic adapted from the provided source bundle.
- `qualtrics-v7/squared-qualtrics.js`
  The JavaScript you paste into a Qualtrics Text/Graphic question.
- `qualtrics-v7/squared-question.html`
  The HTML snippet you paste into that question's HTML editor.
- `qualtrics-v7/QUALTRICS_SETUP.md`
  Setup notes and field recommendations.

## GitHub Pages

The repository includes a GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`. Once the repo is pushed to GitHub, enable
Pages and use the resulting site URL as the `assetBaseUrl` in
`qualtrics-v7/squared-qualtrics.js`.
