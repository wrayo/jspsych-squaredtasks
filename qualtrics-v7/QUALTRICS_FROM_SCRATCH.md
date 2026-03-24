# Build a Qualtrics Survey From Scratch

Use this guide if you want to create the Qualtrics survey manually instead of
importing `Squared_Tasks.qsf`.

## What you need

The main files are:

- `squared-question.html`
- `squared-qualtrics.js`
- `squared-v7-task.js`
- `squared.css`

You do not paste `squared-v7-task.js` or `squared.css` into Qualtrics. Those
are hosted assets loaded by `squared-qualtrics.js`.

## Before you start

1. Make sure the hosted assets are reachable over HTTPS.
2. Decide whether you want to use this repository's hosted assets or your own fork.
3. If you are using your own fork, update `assetBaseUrl` in
   `squared-qualtrics.js`.

The default hosted asset base URL in this repository is:

`https://wrayo.github.io/jspsych-squaredtasks`

## Survey structure

Create a Qualtrics survey with:

1. A welcome page
2. A task page containing only the Squared task

The task page should be on its own. The wrapper auto-advances when the task
finishes.

## Step 1: Add Embedded Data in Survey Flow

Near the top of Survey Flow, add these Embedded Data fields:

- `squared_participant_id`
- `squared_trial_count`
- `squared_stroop_score`
- `squared_flanker_score`
- `squared_simon_score`
- `squared_stroop_meanrt`
- `squared_flanker_meanrt`
- `squared_simon_meanrt`
- `squared_summary_json`
- `squared_practice_stroop_json`
- `squared_stroop_json`
- `squared_practice_flanker_json`
- `squared_flanker_json`
- `squared_practice_simon_json`
- `squared_simon_json`

These fields are where the wrapper writes the summary and trial-level JSON data.

## Step 2: Create the welcome question

Add a `Text/Graphic` question for the welcome page.

You can use your own wording, or copy the welcome HTML from the QSF template.
A simple version is:

```html
<div style="max-width: 760px; margin: 0 auto; line-height: 1.7; color: #1d2433;">
  <h1 style="margin-bottom: 0.75rem;">Welcome</h1>
  <p>
    In the next section, you will complete the Colors and Arrows Tasks.
  </p>
  <p>
    When you are ready, click <strong>Next</strong> to begin.
  </p>
</div>
```

## Step 3: Create the task question

Add a second `Text/Graphic` question on its own page. This is the task page.

### HTML editor

Open the question's HTML view and paste in:

- `squared-question.html`

This creates the loading message and the container the task uses.

### JavaScript editor

Open `Add JavaScript` for the same question and paste in:

- `squared-qualtrics.js`

This script:

- loads jsPsych and the task assets
- writes summary and JSON data into Embedded Data
- advances the survey automatically when the task is complete

## Step 4: Edit the task configuration if needed

Inside `squared-qualtrics.js`, the main values you may want to edit are:

### `assetBaseUrl`

This tells Qualtrics where to load the hosted task files from.

Default:

```js
var assetBaseUrl = "https://wrayo.github.io/jspsych-squaredtasks";
```

Change this only if you are hosting the assets somewhere else.

### `participantId`

Default:

```js
participantId: "${e://Field/ResponseID}",
```

This uses the Qualtrics `ResponseID` as the participant identifier written into
the task data. You can replace this with a different Embedded Data field if you
prefer.

### `fullscreenMode`

Default:

```js
fullscreenMode: false,
```

Set this to `true` if you want the task to request fullscreen mode.

### `includeTrialData`

Default:

```js
includeTrialData: true
```

This allows the wrapper to build the block-level JSON output that gets written
to Qualtrics Embedded Data.

## Step 5: Publish and test

1. Publish the survey.
2. Test with the anonymous survey link, not only the Qualtrics editor preview.
3. Complete a full run.
4. Confirm that the Embedded Data fields populate in the recorded response.

## What can be customized safely

These are usually safe to change:

- Welcome text
- Loading/error text in `squared-question.html`
- `assetBaseUrl` in `squared-qualtrics.js`
- `participantId` source in `squared-qualtrics.js`
- Whether fullscreen mode is enabled

These should be changed more carefully:

- The data field names written by `squared-qualtrics.js`
- The task logic in `squared-v7-task.js`
- The hosted file paths and file names

## Easiest option

If you do not need to customize the survey structure, the fastest route is still
to import:

- `Squared_Tasks.qsf`

Use this from-scratch guide only if you want to edit the survey more directly.
