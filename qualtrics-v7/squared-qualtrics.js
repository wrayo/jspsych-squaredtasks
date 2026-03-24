Qualtrics.SurveyEngine.addOnload(function () {
  var qthis = this;
  var q$ = window.jQuery || window.$;

  var assetBaseUrl = "https://wrayo.github.io/jspsych-squaredtasks";
  var taskConfig = {
    assetBaseUrl: assetBaseUrl + "/qualtrics-v7",
    displayElement: "display_stage",
    participantId: "${e://Field/ResponseID}",
    online: 1,
    promptForParticipantId: false,
    promptForLocation: false,
    fullscreenMode: false,
    finishButtonLabel: "Continue",
    includeTrialData: true
  };

  function valueOrBlank(value) {
    return value === null || value === undefined ? "" : String(value);
  }

  function updateStatus(messageHtml) {
    var statusNode = document.getElementById("squared-load-status");
    if (statusNode) {
      statusNode.innerHTML = messageHtml;
    }
  }

  function showFatalError(messageHtml, error) {
    if (window.console && typeof window.console.error === "function" && error) {
      window.console.error(error);
    }

    updateStatus(messageHtml);
  }

  function ensureStylesheet(href) {
    var existing = document.querySelector("link[data-squared-href='" + href + "']");
    var link;

    if (existing) {
      return;
    }

    link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    link.setAttribute("data-squared-href", href);
    document.head.appendChild(link);
  }

  function ensureDisplayStage() {
    if (!document.getElementById("display_stage_background")) {
      q$("<div id='display_stage_background'></div>").appendTo("body");
    }
    if (!document.getElementById("display_stage")) {
      q$("<div id='display_stage'></div>").appendTo("body");
    }
  }

  function cleanup() {
    if (!q$) {
      return;
    }

    q$("#display_stage").remove();
    q$("#display_stage_background").remove();
  }

  function loadScript(index, requiredResources) {
    q$.getScript(requiredResources[index])
      .done(function () {
        if ((index + 1) < requiredResources.length) {
          loadScript(index + 1, requiredResources);
        }
      })
      .fail(function () {
        showFatalError(
          "The Squared task battery could not finish loading.<br>" +
          "Please capture this screen and contact the study team."
        );
      });
  }

  try {
    if (!q$) {
      showFatalError(
        "The Qualtrics page libraries did not initialize correctly.<br>" +
        "Please capture this screen and contact the study team."
      );
      return;
    }

    if (assetBaseUrl.indexOf("YOUR-GITHUB-USERNAME") !== -1) {
      updateStatus(
        "This question is not configured yet.<br>" +
        "Set <code>assetBaseUrl</code> in the Qualtrics JavaScript first."
      );
      return;
    }

    qthis.hideNextButton();
    ensureDisplayStage();
    ensureStylesheet(assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/jspsych.css");
    ensureStylesheet(assetBaseUrl + "/qualtrics-v7/squared.css");

    window.squaredTaskConfig = taskConfig;
    window.squaredTaskHooks = {
      onFinish: function (jsPsychInstance, payload) {
        var prefix = "squared_";
        var summary = payload.summary || {};
        var trialBlocks = payload.trial_data_blocks || {};

        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "participant_id", valueOrBlank(payload.participant_id));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "trial_count", valueOrBlank(payload.trial_count));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "stroop_score", valueOrBlank(payload.total_scores && payload.total_scores.stroop));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "flanker_score", valueOrBlank(payload.total_scores && payload.total_scores.flanker));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "simon_score", valueOrBlank(payload.total_scores && payload.total_scores.simon));

        Qualtrics.SurveyEngine.setEmbeddedData(
          prefix + "stroop_meanrt",
          valueOrBlank(summary.stroop && summary.stroop.main && summary.stroop.main.meanrt_final)
        );
        Qualtrics.SurveyEngine.setEmbeddedData(
          prefix + "flanker_meanrt",
          valueOrBlank(summary.flanker && summary.flanker.main && summary.flanker.main.meanrt_final)
        );
        Qualtrics.SurveyEngine.setEmbeddedData(
          prefix + "simon_meanrt",
          valueOrBlank(summary.simon && summary.simon.main && summary.simon.main.meanrt_final)
        );

        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "summary_json", JSON.stringify(summary));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "practice_stroop_json", JSON.stringify(trialBlocks.practice_stroop || []));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "stroop_json", JSON.stringify(trialBlocks.stroop || []));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "practice_flanker_json", JSON.stringify(trialBlocks.practice_flanker || []));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "flanker_json", JSON.stringify(trialBlocks.flanker || []));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "practice_simon_json", JSON.stringify(trialBlocks.practice_simon || []));
        Qualtrics.SurveyEngine.setEmbeddedData(prefix + "simon_json", JSON.stringify(trialBlocks.simon || []));

        cleanup();
        qthis.clickNextButton();
      }
    };

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
      loadScript(0, [
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/jspsych.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-fullscreen.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-html-button-response.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-html-keyboard-response.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-preload.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-survey-multi-choice.js",
        assetBaseUrl + "/qualtrics-v7/lib/jspsych-7.3.1/plugin-survey-text.js",
        assetBaseUrl + "/qualtrics-v7/squared-v7-task.js"
      ]);
    }
  } catch (error) {
    showFatalError(
      "The Colors and Arrows tasks could not start correctly.<br>" +
      "Please capture this screen and contact the study team.",
      error
    );
  }
});

Qualtrics.SurveyEngine.addOnReady(function () {
});

Qualtrics.SurveyEngine.addOnUnload(function () {
  var q$ = window.jQuery || window.$;
  if (q$) {
    q$("#display_stage").remove();
    q$("#display_stage_background").remove();
  }
  delete window.squaredTaskConfig;
  delete window.squaredTaskHooks;
  delete window.squaredTaskLastRun;
});
