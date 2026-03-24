# Qualtrics Setup for Squared Tasks

This folder contains the hosted asset bundle for embedding the Squared task
battery into a Qualtrics survey.

## Attribution and Scope

The original task is from the
[`squared_jspsych`](https://github.com/vrtliceralde/squared_jspsych?tab=readme-ov-file)
repository. This repository is only a Qualtrics wrapper and hosting layer
around that task.

Issues with the task itself, including design decisions, stimuli, scoring
behavior, and the original experimental implementation, should be directed to
the original task creators. This wrapper is responsible only for Qualtrics
embedding, hosted asset loading, and the Qualtrics export format.

## Important implementation note

The original Squared task code you provided is a working `jsPsych 7.3.1`
implementation. The surrounding Qualtrics wrapper follows the same ideas as the
Kyoung Whan Choe tutorial, but the task itself stays on `jsPsych 7` so that we
preserve the original battery instead of rewriting it to `jsPsych 6`.

## Files

- `squared-v7-task.js`
  Original task logic adapted for a configurable Qualtrics wrapper.
- `squared-qualtrics.js`
  Paste this into the Qualtrics question JavaScript editor.
- `squared-question.html`
  Paste this into the question HTML editor.
- `preview.html`
  Standalone preview for testing the hosted assets before Qualtrics.
- `Squared_Tasks.qsf`
  Public import template for Qualtrics. By default it points at the hosted
  assets in this repository's GitHub Pages deployment.

## Required hosted assets

Push this repository to GitHub and publish it with GitHub Pages or another HTTPS
host. Qualtrics respondents need every JavaScript, CSS, and image asset to be
publicly reachable over HTTPS.

## Qualtrics steps

1. Create a `Text/Graphic` question in Qualtrics.
2. Open `Add JavaScript` and paste in `qualtrics-v7/squared-qualtrics.js`.
3. Replace `assetBaseUrl` with your actual GitHub Pages base URL.
4. Open the question `HTML View` and paste in `qualtrics-v7/squared-question.html`.
5. In Survey Flow, add Embedded Data fields near the top for:
   `squared_participant_id`
   `squared_trial_count`
   `squared_stroop_score`
   `squared_flanker_score`
   `squared_simon_score`
   `squared_stroop_meanrt`
   `squared_flanker_meanrt`
   `squared_simon_meanrt`
   `squared_summary_json`
   `squared_practice_stroop_json`
   `squared_stroop_json`
   `squared_practice_flanker_json`
   `squared_flanker_json`
   `squared_practice_simon_json`
   `squared_simon_json`
6. Keep the task question on its own page. The wrapper will call `clickNextButton()`
   when the task ends, so Qualtrics should move directly to the next real block or
   the end-of-survey screen without a separate completion question.
7. Publish and test using the anonymous survey link, not only the Qualtrics editor preview.

## Data note

This wrapper stores summary values plus six compact block-level trial JSON fields
in Qualtrics Embedded Data. The trial JSON is intentionally trimmed to the core
trial columns to reduce size, but it can still be large for some studies, so it
is still worth validating exported response sizes during piloting.

In Qualtrics, each of these values is stored as its own Embedded Data field in
Survey Flow. The value in that field is a JSON string. When the task finishes,
the wrapper writes the Embedded Data values and then calls `clickNextButton()`,
so the data is captured when Qualtrics advances from the task page.

The six trial-level JSON fields are:

- `squared_practice_stroop_json`
- `squared_stroop_json`
- `squared_practice_flanker_json`
- `squared_flanker_json`
- `squared_practice_simon_json`
- `squared_simon_json`

Each of those fields is a JSON array of trial objects for one block only. The
arrays are split this way to reduce the size of any single Embedded Data field.

Each trial object contains a compact set of task-relevant columns, including:

- `participant_id`
- `task`
- `practice`
- `trial_index`
- `block_trial_count`
- `item`
- `condition`
- `stim`
- `response`
- `rt`
- `correct_response`
- `accuracy`
- `score_after_trial`
- `timeout`

Task-specific fields are included when relevant:

- Stroop trials can include `stimcolor`, `resp1`, `resp1color`, `resp2`, and `resp2color`
- Simon trials can include `location`

In addition to those six trial-level JSON fields, the wrapper also stores
summary-level Embedded Data fields such as:

- `squared_participant_id`
- `squared_trial_count`
- `squared_stroop_score`
- `squared_flanker_score`
- `squared_simon_score`
- `squared_stroop_meanrt`
- `squared_flanker_meanrt`
- `squared_simon_meanrt`
- `squared_summary_json`

## Variable coverage relative to the original task

The original `squared_jspsych` task can expose more jsPsych output fields than
this Qualtrics wrapper stores in its compact block JSON. The tables below split
that coverage into per-trial JSON fields and summary-level fields so it is easy
to see what is saved where.

### Variables saved in the per-trial JSON

These variables are saved inside the six block-level Embedded Data JSON fields:
`squared_practice_stroop_json`, `squared_stroop_json`,
`squared_practice_flanker_json`, `squared_flanker_json`,
`squared_practice_simon_json`, and `squared_simon_json`.

| Variable | Saved in per-trial JSON? | Notes |
| --- | --- | --- |
| `rt` | Yes | Stored once per trial. |
| `stimulus` | No | The rendered HTML or image markup shown on screen is not included. |
| `response` | Yes | `0` = left choice, `1` = right choice. |
| `trial_type` | No | Omitted to keep the Qualtrics payload compact. |
| `trial_index` | Yes | Preserved from jsPsych. |
| `time_elapsed` | Yes | Stored as the jsPsych elapsed time in milliseconds from task start. |
| `trial_recorded_at` | Yes | Stored as an ISO 8601 wall-clock timestamp when the trial data row is finalized. |
| `internal_node_id` | No | Omitted to keep the payload compact. |
| `participant_id` | Yes | Included on every saved trial record. |
| `task` | Yes | `stroop`, `flanker`, or `simon`. |
| `block_trial_count` | Yes | `0` indicates the block timed out on that trial. |
| `practice` | Yes | `1` = practice, `0` = main block. |
| `item` | Yes | Original item index is preserved. |
| `stim` | Yes | For Stroop this is the word prompt; for Flanker and Simon this stores the sign version of the stimulus. |
| `resp1` | Yes | For Flanker this stores the sign version of the left choice. |
| `resp2` | Yes | For Flanker this stores the sign version of the right choice. |
| `correct_response` | Yes | `0` = left choice, `1` = right choice. |
| `condition` | Yes | Values `1` through `4`. |
| `accuracy` | Yes | `0` = incorrect, `1` = correct. |
| `timeout` | Yes | `1` means the block ended during that trial. |
| `score_after_trial` | Yes | Running score is preserved per trial. |
| `stimcolor` | Yes, when relevant | Saved only on Stroop trials. |
| `resp1color` | Yes, when relevant | Saved only on Stroop trials. |
| `resp2color` | Yes, when relevant | Saved only on Stroop trials. |
| `stimsign` | No, separate field not used | For Flanker and Simon, the sign version is folded into `stim`. |
| `resp1sign` | No, separate field not used | For Flanker, the sign version is folded into `resp1`. |
| `resp2sign` | No, separate field not used | For Flanker, the sign version is folded into `resp2`. |
| `location` | Yes, when relevant | Saved only on Simon trials. |

### Variables saved in summary fields

These variables are saved in `squared_summary_json` and, for the main blocks,
some are also duplicated into dedicated Qualtrics Embedded Data fields such as
`squared_stroop_score` and `squared_stroop_meanrt`.

| Variable | Saved in summary fields? | Notes |
| --- | --- | --- |
| `score_final` | Yes | Stored in `squared_summary_json` for practice and main blocks; main-block values are also surfaced as `squared_stroop_score`, `squared_flanker_score`, and `squared_simon_score`. |
| `meanrt_final` | Yes | Stored in `squared_summary_json` for practice and main blocks; main-block values are also surfaced as `squared_stroop_meanrt`, `squared_flanker_meanrt`, and `squared_simon_meanrt`. |
| `score_x` | Yes, under a nested summary name | Stored in `squared_summary_json` as `condition_1.score`, `condition_2.score`, `condition_3.score`, and `condition_4.score`. |
| `meanrt_x` | Yes, under a nested summary name | Stored in `squared_summary_json` as `condition_1.mean_rt`, `condition_2.mean_rt`, `condition_3.mean_rt`, and `condition_4.mean_rt`. |
