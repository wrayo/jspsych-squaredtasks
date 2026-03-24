# Squared Tasks for Qualtrics

This repository adapts the original `squared_jspsych` task bundle into a
Qualtrics-friendly hosted asset package.

## Attribution

The underlying task comes from the original
[`squared_jspsych`](https://github.com/vrtliceralde/squared_jspsych?tab=readme-ov-file)
repository by the task creators. This repository does not claim authorship of
the task itself; it only provides a wrapper and hosting structure so the task
can be embedded in Qualtrics.

If you encounter issues with the task design, stimuli, scoring logic, or the
original experimental implementation, those concerns should be directed to the
original task creators. Issues specific to Qualtrics embedding, GitHub Pages
hosting, or the wrapper/export files in this repository belong here.

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

## Data Output

The wrapper writes summary fields plus six compact trial-level JSON strings into
separate Qualtrics Embedded Data fields:

- `squared_practice_stroop_json`
- `squared_stroop_json`
- `squared_practice_flanker_json`
- `squared_flanker_json`
- `squared_practice_simon_json`
- `squared_simon_json`

Each of those fields contains a JSON array of per-trial objects for one block
only. During the Qualtrics run, the wrapper saves those values into Embedded
Data and then auto-advances the survey page at the end of the task so the data
is committed with the response. The exact structure and field list are
documented in `qualtrics-v7/QUALTRICS_SETUP.md`.

## GitHub Pages

The repository includes a GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`. Once the repo is pushed to GitHub, enable
Pages and use the resulting site URL as the `assetBaseUrl` in
`qualtrics-v7/squared-qualtrics.js`.
