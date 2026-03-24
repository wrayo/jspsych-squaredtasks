# Squared Tasks for Qualtrics

This repository adapts the original `squared_jspsych` task bundle into a
Qualtrics-friendly hosted asset package.

## Support, Attribution, and Citation

This repository provides a Qualtrics-friendly wrapper and hosting structure for
the original `squared_jspsych` task bundle. It is intended to help researchers
deploy the task through Qualtrics, but it does not claim authorship of the task
itself.

Questions or issues about the task design, stimuli, scoring, or original
experimental implementation should be directed to the original task creators.
Questions or issues about the Qualtrics embedding, GitHub Pages hosting, or the
wrapper/export files in this repository belong here.

Contact points:

- This adaptation: `wrayo`
- jsPsych implementation adapted here: Van, via the
  [`squared_jspsych`](https://github.com/vrtliceralde/squared_jspsych?tab=readme-ov-file)
  repository
- Task in general: Burgoyne et al. (2023) or Alex Burgoyne

If you use this task, please cite:

1. Burgoyne et al. (2023)

   Nature and measurement of attention control. Journal of Experimental
   Psychology: General. https://doi.org/10.1037/xge00014082

2. Squared tasks of attention control for jsPsych

   Liceralde, V. R. T. & Burgoyne, A. P. (2023). Squared tasks of attention
   control for jsPsych (Version 1.0.0) [Computer software].
   https://doi.org/10.5281/zenodo.8313315

   ```bibtex
   @misc{liceralde23squared,
     author = {Van Rynald T. Liceralde and Alexander P. Burgoyne},
     year = {2023},
     title = {Squared tasks of attention control for {jsPsych}},
     howpublished = {\url{https://doi.org/10.5281/zenodo.8313315}}
   }
   ```

3. Rayo, W. (2026). jsPsych Squared Tasks Embed into Qualtrics (Version 1.0.0)
   [workflow]. https://doi.org/10.5281/zenodo.19209170

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
