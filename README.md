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
- `qualtrics-v7/Squared_Tasks.qsf`
  Public Qualtrics import template wired to the hosted assets in this repository.

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

### Per-trial JSON fields

The six block-level JSON fields are:

- `squared_practice_stroop_json`
- `squared_stroop_json`
- `squared_practice_flanker_json`
- `squared_flanker_json`
- `squared_practice_simon_json`
- `squared_simon_json`

Each field stores a JSON array of trial objects for one block only.

| Variable | Saved in per-trial JSON? | Notes |
| --- | --- | --- |
| `rt` | Yes | Stored once per trial. |
| `response` | Yes | `0` = left choice, `1` = right choice. |
| `trial_index` | Yes | Preserved from jsPsych. |
| `time_elapsed` | Yes | jsPsych elapsed time in milliseconds from task start. |
| `trial_recorded_at` | Yes | ISO 8601 wall-clock timestamp when the trial row is finalized. |
| `participant_id` | Yes | Included on every saved trial record. |
| `task` | Yes | `stroop`, `flanker`, or `simon`. |
| `block_trial_count` | Yes | `0` indicates the block timed out on that trial. |
| `practice` | Yes | `1` = practice, `0` = main block. |
| `item` | Yes | Original item index is preserved. |
| `stim` | Yes | For Flanker and Simon, this stores the sign version of the stimulus. |
| `resp1` | Yes | For Flanker, this stores the sign version of the left choice. |
| `resp2` | Yes | For Flanker, this stores the sign version of the right choice. |
| `correct_response` | Yes | `0` = left choice, `1` = right choice. |
| `condition` | Yes | Values `1` through `4`. |
| `accuracy` | Yes | `0` = incorrect, `1` = correct. |
| `timeout` | Yes | `1` means the block ended during that trial. |
| `score_after_trial` | Yes | Running score is preserved per trial. |
| `stimcolor` | Yes, when relevant | Stroop only. |
| `resp1color` | Yes, when relevant | Stroop only. |
| `resp2color` | Yes, when relevant | Stroop only. |
| `location` | Yes, when relevant | Simon only. |

### Summary fields

These variables are saved in `squared_summary_json`, and the main-block score
and mean RT values are also duplicated into dedicated Embedded Data fields.

| Variable | Saved in summary fields? | Notes |
| --- | --- | --- |
| `score_final` | Yes | Stored for practice and main blocks; main-block values are also surfaced as task-level score fields. |
| `meanrt_final` | Yes | Stored for practice and main blocks; main-block values are also surfaced as task-level mean RT fields. |
| `score_x` | Yes, under a nested summary name | Stored as `condition_1.score` through `condition_4.score`. |
| `meanrt_x` | Yes, under a nested summary name | Stored as `condition_1.mean_rt` through `condition_4.mean_rt`. |

For the full comparison against the original `squared_jspsych` variable list,
see `qualtrics-v7/QUALTRICS_SETUP.md`.

## GitHub Pages

Hosted assets for this repository are served via GitHub Pages at
https://wrayo.github.io/jspsych-squaredtasks/.

If you fork this repository for your own deployment, enable GitHub Pages for
the fork and update the `assetBaseUrl` in `qualtrics-v7/squared-qualtrics.js`
to match your own site URL. The Pages workflow used by this repository lives at
`.github/workflows/deploy-pages.yml`.
