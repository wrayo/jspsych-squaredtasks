# Qualtrics Setup for Squared Tasks

This folder contains the hosted asset bundle for embedding the Squared task
battery into a Qualtrics survey.

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
6. Publish and test using the anonymous survey link, not only the Qualtrics editor preview.

## Data note

This wrapper stores summary values plus six compact block-level trial JSON fields
in Qualtrics Embedded Data. The trial JSON is intentionally trimmed to the core
trial columns to reduce size, but it can still be large for some studies, so it
is still worth validating exported response sizes during piloting.
