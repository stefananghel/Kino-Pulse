import * as Pose from "@mediapipe/pose";
console.log(Pose);
import { BaseKinoModel } from "./BaseKinoModel";
import { POSE_CONNECTIONS, TARGET_LMARK_MAPPING } from "./constants";
import {
  euclideanDistance,
  filterLandmarks,
  getAnglesArray,
  getTargetChildElementNames,
  getLandmarkName,
  getSecondsDifference,
  isElementActive,
  mapAccuracyToImages,
  playAudio,
} from "./util";

import { draw_angles, draw_targets } from "./drawUtil";
import { Action } from "./socketUtil";
import { POSE_LANDMARKS_ALL as POSE_LANDMARKS } from "./constants";

export class WalkthroughKinoModel extends BaseKinoModel {
  constructor(
    selectedExercise,
    account,
    isPracticeRun,
    cameraId,
    poseInstance,
    domRefs,
    modelParams
  ) {
    super(
      selectedExercise,
      account,
      isPracticeRun,
      cameraId,
      poseInstance,
      domRefs
    );
    this.target_points = {};
    this.landmarkCoordinates = {};
    this.isStretch = false;
    this.pauseCamera = modelParams.pauseCamera;
    this.finishCallback = modelParams.finishCallback;
    this.orientationImageMap = {};
    this.initialOrientation = selectedExercise.orientation;
    this.utteranceRate = 1;

    this.walkthrough = selectedExercise.walkthrough_def;
    this.wOrientation = this.walkthrough.stages.find(
      (s) => s.stage_number === 1
    );
    this.showTargets = this.walkthrough.showTargets ?? true;
    this.promptPlayed = [];

    this.initProgressMatrix();

    console.log(selectedExercise);
  }

  sendStartMessage() {
    let exerciseTemplateMask = this.selectedExercise?.mask;

    if (!exerciseTemplateMask.includes("[")) {
      exerciseTemplateMask = "[" + exerciseTemplateMask;
    }

    if (!exerciseTemplateMask.includes("]")) {
      exerciseTemplateMask = exerciseTemplateMask + "]";
    }

    const data = {
      action: Action.Start,
      data: JSON.parse(exerciseTemplateMask),
      timestamp: Date.now(),
    };

    const sendMessage = () => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(data));
        return JSON.stringify(data);
      } else {
        setTimeout(sendMessage, 1000);
      }
    };

    // sendMessage();
  }
  saveExercise() {
    let saveMessage = { action: "save", timestamp: Date.now() };
    this.socket.send(JSON.stringify(saveMessage));
  }

  /**
   * Callback function invoked when pose is estimated.
   * @param {*} results
   */
  onResults(results) {
    this.canvasCtx.save();
    this.canvasCtx.scale(-1, 1);
    this.canvasCtx.translate(-this.canvasElement.width, 0);
    this.canvasCtx.clearRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );

    if (this.drawImage !== undefined && this.drawImage === true) {
      this.canvasCtx.drawImage(
        results.image,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
    }

    const filteredLandmarks = filterLandmarks(results.poseLandmarks);
    let startLandmark = {};
    let endLandmark = {};

    if (filteredLandmarks !== undefined) {
      var lineWidth = 1;
      var bulaRadius =
        Math.max(this.canvasCtx.canvas.height, this.canvasCtx.canvas.width) /
        70;

      var shoulderDistance = Math.round(
        100 *
          euclideanDistance(
            filteredLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].x,
            filteredLandmarks[POSE_LANDMARKS.LEFT_SHOULDER].y,
            filteredLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].x,
            filteredLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER].y
          )
      );

      if (shoulderDistance <= 10) {
        lineWidth = 2;
        bulaRadius = bulaRadius / 2;
      } else if (shoulderDistance <= 20) {
        lineWidth = 4;
        bulaRadius = bulaRadius / 1.5;
      } else {
        lineWidth = 6;
        bulaRadius = bulaRadius;
      }

      for (let i = 0; i < POSE_CONNECTIONS.length; i++) {
        this.drawLandmarksAndConnections(
          this.state,
          this.canvasCtx,
          filteredLandmarks,
          i,
          bulaRadius,
          lineWidth,
          startLandmark,
          endLandmark,
          this.target_lmarks,
          this.drawJointNames,
          this.uiStatus,
          this.canvasElement
        );

        if (endLandmark === undefined || startLandmark === undefined) {
          continue;
        }

        switch (this.state) {
          case "moving":
            this.slider_container_content = "Assume start position";
            this.connectionColor = "white";
            this.uiStatus = [];
            this.accuracy = undefined;
            this.speed = undefined;
            this.movement = [
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
            ];

            break;
          case "stopped":
            this.slider_container_content = "Assume start position";
            this.connectionColor = "white";
            this.uiStatus = [];
            this.accuracy = undefined;
            this.speed = undefined;
            this.movement = [
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
              true,
            ];

            break;
          case "start":
            this.slider_container_content = "Wait";
            this.connectionColor = "white";
            this.accuracy = undefined;
            this.speed = undefined;

            break;
          case "exercise":
            this.slider_container_content = "";
            this.connectionColor =
              this.stage !== undefined ? "#6d863b" : "yellow";

            if (this.isStretch === true) {
              this.slider_container_content = "Hold still!";
              this.connectionColor = "green";
            }

            break;
          default:
            break;
        }
        if (this.drawJointAnglesValues) {
          let anglesArray = [];
          try {
            anglesArray = getAnglesArray(results, this.mask, false, this.mask)
              .map((map, index) => ({
                index,
                map,
              }))
              .filter(({ map }) => map && map.has(POSE_CONNECTIONS[i][0]));
          } catch (error) {}

          if (anglesArray !== undefined && anglesArray.length > 0) {
            const index = anglesArray[0].index;

            this.canvasCtx.font = "bold 36px Arial"; // set the font
            this.canvasCtx.fillStyle = "#000"; // set the fill color
            this.canvasCtx.scale(-1, 1);

            const x = startLandmark.x * this.canvasElement.width;
            const y = startLandmark.y * this.canvasElement.height;

            if (this.movement[index] === false) {
              canvasCtx.fillStyle = "red"; // set the fill color
            } else if (
              Math.abs(
                anglesArray[0].map.values().next().value - this.mask[index]
              ) <= this.margin[index]
            ) {
              this.canvasCtx.fillStyle = "#6d863b"; // set the fill color
            } else {
              this.canvasCtx.fillStyle = "yellow"; // set the fill color
            }
            this.canvasCtx.fillText(
              anglesArray[0].map.values().next().value,
              -x,
              y - 40
            );
            this.canvasCtx.scale(-1, 1);
          }
        }
        let angleValues = getAnglesArray(results, [], true, this.mask);

        if (this.drawJointAngles) {
          this.drawAnglesArc(
            angleValues,
            results.poseLandmarks,
            this.mask,
            this.canvasCtx
          );
        }

        //Draw only if there is somebody in frame
        if (filteredLandmarks[POSE_LANDMARKS.NOSE] !== undefined) {
          if (Object.keys(this.target_points).length > 0) {
            if (this.showTargets) {
              draw_targets(
                this.landmarkCoordinates,
                bulaRadius,
                this.canvasCtx
              );
            }
          }
        }

        if (this.state === undefined || this.state !== "exercise") {
          if (
            (this.state === "moving" || this.state === "stopped") &&
            this.isStretch === true
          ) {
            this.canvasCtx.scale(-1, 1);

            this.canvasCtx.font = "bold 164px Arial";
            this.canvasCtx.fillStyle = "white";
            this.canvasCtx.strokeStyle = "black";
            this.canvasCtx.strokeWidth = 1;
            //canvasCtx.lineWidth = 2;
            this.canvasCtx.textAlign = "center";

            this.seriesText = this.repetitions + "" + "/" + this.series;

            var textMetrics = this.canvasCtx.measureText(seriesText);
            var textHeight =
              textMetrics.actualBoundingBoxAscent +
              textMetrics.actualBoundingBoxDescent;
            var textWidth = textMetrics.width;

            var x = textWidth / 2 + textHeight / 2;
            var y = textHeight + textHeight / 2;
            this.canvasCtx.fillText(seriesText, -x, y);
            this.canvasCtx.scale(-1, 1);
          }

          this.canvasCtx.scale(-1, 1);

          //draw orientation
          this.canvasCtx.shadowBlur = 0; // Set shadow blur to 0
          this.canvasCtx.shadowColor = "transparent";

          if (
            this.ws_orientation.state_a !== "match" ||
            Math.abs(this.ws_orientation.value) === 30
          ) {
            this.canvasCtx.shadowColor = "#FF2B2B";
            this.canvasCtx.shadowBlur = 10;
          } else {
            this.canvasCtx.shadowColor = "#6d863b";
            this.canvasCtx.shadowBlur = 10;
          }

          if (this.orientationImageMap[this.initialOrientation]) {
            this.canvasCtx.drawImage(
              this.orientationImageMap[this.initialOrientation],
              -this.canvasWidth + 10 * this.widthRatio,
              0 + 10 * this.widthRatio,
              (this.orientationImageMap[this.initialOrientation].width * 3) /
                this.widthRatio,
              (this.orientationImageMap[this.initialOrientation].height * 3) /
                this.widthRatio
            );
          }
          this.canvasCtx.shadowColor = "transparent";
          this.canvasCtx.shadowBlur = 0;
          this.canvasCtx.scale(-1, 1);

          if (this.countdownTimestamp > 0) {
            this.canvasCtx.scale(-1, 1);
            if (
              getSecondsDifference(this.countdownTimestamp) <= this.lastSecond
            ) {
              this.currentCount =
                getSecondsDifference(this.countdownTimestamp) + 1;
              this.lastSecond = getSecondsDifference(this.countdownTimestamp);

              // countdown
              if (this.currentCount > 0 && !speechSynthesis.speaking) {
                let utterance = new CreateKinoUtterance(this.currentCount);
                speechSynthesis.speak(utterance);
              }

              if (this.currentCount >= 0) {
                const x =
                  filteredLandmarks[POSE_LANDMARKS.NOSE].x *
                  this.canvasElement.width;
                const y =
                  (filteredLandmarks[POSE_LANDMARKS.NOSE].y / 3) *
                  this.canvasElement.height;
                this.canvasCtx.drawImage(
                  this.countdownImageMap[this.currentCount],
                  -x - 150 / 3,
                  y,
                  150,
                  150
                );
              } else {
                this.countdownTimestamp = 0;
                this.lastSecond = 0;
              }
            }
            this.canvasCtx.scale(-1, 1);
          }

          if (
            this.slider_container_content === "Assume start position" &&
            !speechSynthesis.speaking &&
            !this.messagePlayed["start"]
          ) {
            // let utterance = new CreateKinoUtterance(
            //     this.slider_container_content
            // );
            // utterance.rate = this.utteranceRate;
            // speechSynthesis.speak(utterance);

            this.messagePlayed["start"] = true;
          }
        } else if (this.state === "exercise") {
          if (!speechSynthesis.speaking && !this.messagePlayed["exercise"]) {
            let utterance = new CreateKinoUtterance(
              this.slider_container_content
            );
            utterance.rate = this.utteranceRate;
            speechSynthesis.speak(utterance);
            const synth = window.speechSynthesis;
            const voices = synth.getVoices();
            let voice3 = voices.filter((voice) => voice.lang === "en-US");

            this.messagePlayed["exercise"] = true;
          }

          this.canvasCtx.scale(-1, 1);

          this.canvasCtx.font = "bold 164px Arial";
          this.canvasCtx.fillStyle = "white";
          this.canvasCtx.strokeStyle = "black";
          this.canvasCtx.strokeWidth = 1;
          this.canvasCtx.textAlign = "center";

          let seriesText = this.repetitions + "" + "/" + this.series;

          var textMetrics = this.canvasCtx.measureText(seriesText);
          var textHeight =
            textMetrics.actualBoundingBoxAscent +
            textMetrics.actualBoundingBoxDescent;
          var textWidth = textMetrics.width;

          var x = textWidth / 2 + textHeight / 2;
          var y = textHeight + textHeight / 2;
          this.canvasCtx.fillText(seriesText, -x, y);

          switch (true) {
            case this.speed === 0:
              this.speedImage = this.speedGreat;
              break;
            case this.speed > 0:
              this.speedImage = this.speedSlow;
              break;
            case this.speed < 0:
              this.speedImage = this.speedFast;
              break;
          }

          try {
            this.canvasCtx.drawImage(
              this.speedImage,
              0 - this.speedImage.width - 10 * this.widthRatio,
              this.canvasHeight - this.speedImage.height - 10 * this.widthRatio,
              this.speedImage.width,
              this.speedImage.height
            );
            this.canvasCtx.drawImage(
              this.accuracyImageMap[mapAccuracyToImages(this.accuracy)],
              -this.canvasWidth + 10 * this.widthRatio,
              this.canvasHeight - this.speedImage.height - 10 * this.widthRatio,
              this.speedImage.width,
              this.speedImage.height
            );
          } catch (error) {
            console.log(error);
          }

          this.canvasCtx.scale(-1, 1);

          // this.canvasCtx.scale(-1, 1);

          //draw wOrientation
          this.canvasCtx.shadowBlur = 0; // Set shadow blur to 0
          this.canvasCtx.shadowColor = "transparent";

          // if (
          //     this.ws_orientation.state_a !== "match" ||
          //     Math.abs(this.ws_orientation.value) === 30
          // ) {
          //   this.canvasCtx.shadowColor = "#FF2B2B";
          //   this.canvasCtx.shadowBlur = 10;
          // } else {
          this.canvasCtx.shadowColor = "#6d863b";
          this.canvasCtx.shadowBlur = 10;
          // }

          if (this.orientationImageMap[this.wOrientation]) {
            this.canvasCtx.drawImage(
              this.orientationImageMap[this.wOrientation],
              -this.canvasWidth + 10 * this.widthRatio,
              0 + 10 * this.widthRatio,
              (this.orientationImageMap[this.wOrientation].width * 3) /
                this.widthRatio,
              (this.orientationImageMap[this.wOrientation].height * 3) /
                this.widthRatio
            );
          }
          this.canvasCtx.shadowColor = "transparent";
          this.canvasCtx.shadowBlur = 0;
          this.canvasCtx.scale(-1, 1);
        }
      }
    }

    //sending to py backend, maybe I should restore first - to test
    if (this.socketReady === 1 && this.exerciseStarted === true) {
      if (results.poseLandmarks !== undefined) {
        this.socket.send(JSON.stringify(this.getSocketMessage(results)));
      }
    }

    this.canvasCtx.restore();
  }

  drawLandmarksAndConnections(
    state,
    canvasCtx,
    filteredLandmarks,
    i,
    bulaRadius,
    lineWidth,
    startLandmark,
    endLandmark,
    target_lmarks,
    drawJointNames,
    uiStatus,
    canvasElement
  ) {
    let connectionColor = "white";
    if (target_lmarks !== undefined && state === "exercise") {
      if (
        target_lmarks[TARGET_LMARK_MAPPING.indexOf(POSE_CONNECTIONS[i][0])] ===
          true ||
        target_lmarks[TARGET_LMARK_MAPPING.indexOf(POSE_CONNECTIONS[i][1])] ===
          true
      ) {
        startLandmark = filteredLandmarks[POSE_CONNECTIONS[i][0]];
        endLandmark = filteredLandmarks[POSE_CONNECTIONS[i][1]];
      }

      for (let i = 0; i < filteredLandmarks.length; i++) {
        if (target_lmarks.length > 0 && target_lmarks[i] === true) {
          canvasCtx.beginPath();
          canvasCtx.arc(
            filteredLandmarks[TARGET_LMARK_MAPPING[i]].x *
              canvasCtx.canvas.width,
            filteredLandmarks[TARGET_LMARK_MAPPING[i]].y *
              canvasCtx.canvas.height,
            bulaRadius * 1.5,
            0,
            2 * Math.PI
          );
          canvasCtx.fillStyle = "red";
          canvasCtx.fill();
          canvasCtx.strokeStyle = "red";
          canvasCtx.lineWidth = lineWidth;
          canvasCtx.stroke();
        }
      }
    } else {
      startLandmark = filteredLandmarks[POSE_CONNECTIONS[i][0]];
      endLandmark = filteredLandmarks[POSE_CONNECTIONS[i][1]];
    }

    //Common for both ex and not
    // Draw start landmark
    canvasCtx.beginPath();
    canvasCtx.arc(
      startLandmark.x * canvasCtx.canvas.width,
      startLandmark.y * canvasCtx.canvas.height,
      bulaRadius,
      0,
      2 * Math.PI
    );
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();
    canvasCtx.strokeStyle = "#6d863b";
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.stroke();

    // Draw end landmark
    canvasCtx.beginPath();
    canvasCtx.arc(
      endLandmark.x * canvasCtx.canvas.width,
      endLandmark.y * canvasCtx.canvas.height,
      bulaRadius,
      0,
      2 * Math.PI
    );
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();
    canvasCtx.strokeStyle = "#6d863b";
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.stroke();

    // Draw connection
    if (startLandmark !== undefined && endLandmark !== undefined) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        startLandmark.x * canvasCtx.canvas.width,
        startLandmark.y * canvasCtx.canvas.height
      );
      canvasCtx.lineTo(
        endLandmark.x * canvasCtx.canvas.width,
        endLandmark.y * canvasCtx.canvas.height
      );

      if (isElementActive(i, uiStatus)) {
        canvasCtx.strokeStyle = connectionColor;
        canvasCtx.lineWidth = lineWidth;
      } else {
        canvasCtx.strokeStyle = "white";
        canvasCtx.lineWidth = lineWidth;
      }
      canvasCtx.stroke();
    }

    if ((startLandmark || endLandmark) && drawJointNames === true) {
      const startLandmarkName = getLandmarkName(POSE_CONNECTIONS[i][0]);
      canvasCtx.font = "bold 52px Arial"; // set the font

      canvasCtx.scale(-1, 1);

      const x = startLandmark.x * canvasElement.width;
      const y = startLandmark.y * canvasElement.height;

      canvasCtx.fillText(startLandmarkName, -x, y - 20);
      canvasCtx.scale(-1, 1);
    }
  }

  toggleSkeleton(value) {
    this.drawImage = !value;
  }

  toggleAngles(value) {
    this.drawJointAngles = value;
  }

  toggleJointNames(value) {
    this.drawJointNames = value;
  }
  set_targets(jsonInput) {
    this.landmarkCoordinates = {};

    Object.keys(jsonInput).forEach((key) => {
      // Get coordinates and scale them
      const [targetX, targetY] = jsonInput[key];
      const x = targetX;
      const y = targetY;
      this.landmarkCoordinates[TARGET_LMARK_MAPPING[key]] = [x, y];
    });
  }

  set_target_lmarks(jsonInput) {
    this.target_lmarks = jsonInput;
  }

  /**
   * Handle received socket message
   * @param {*} data
   * @returns {void}
   **/
  handleSocketMessage(data) {
    const actionsArray = data["actions"];
    actionsArray.forEach((actionObj) => {
      if (actionObj["reset_status"] !== undefined) {
        this.promptPlayed = [];

        let utterance = new CreateKinoUtterance(
          this.walkthrough.statuses.reset.audio_prompts[0]
        );

        utterance.rate = this.utteranceRate;

        speechSynthesis.speak(utterance);
      }

      if (actionObj["status"] !== undefined) {
        this.state = actionObj["status"];

        switch (this.state) {
          case "stopped":
            if (!this.promptPlayed.includes("stopped")) {
              console.log("stopped");

              this.exerciseStarted = false;

              console.log(this.walkthrough);

              let utterance = new CreateKinoUtterance(
                this.walkthrough.statuses.stopped.audio_prompts[0]
              );

              utterance.rate = this.utteranceRate;

              utterance.onend = () => {
                this.exerciseStarted = true;
              };

              console.log(utterance);
              speechSynthesis.speak(utterance);
              this.promptPlayed.push("stopped");
            }
            break;

          case "exercise":
            if (!this.promptPlayed.includes("exercise")) {
              console.log("exercise");
              let utterance = new CreateKinoUtterance(
                this.walkthrough.statuses.exercise.audio_prompts[0]
              );
              utterance.rate = this.utteranceRate;
              speechSynthesis.speak(utterance);
              this.promptPlayed.push("exercise");
            }
            break;

          default:
            break;
        }
      }

      if (actionObj["stage"] !== undefined) {
        this.stage = actionObj["stage"];
        // todo clear uiStatus
        this.uiStatus = [];
        this.movement = [
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ];

        console.log("stage", actionObj["stage"]);
        var stageNo = parseInt(actionObj["stage"].split(" / ")[0], 10) - 1;
        var prompt = this.walkthrough.stages.find(
          (s) => s.stage_number === stageNo + 1
        );
        this.wOrientation = prompt?.wOrientation;
        console.log("prompt", prompt);
        console.log("wOrientation", this.wOrientation);

        if (prompt) {
          let utterance = new CreateKinoUtterance(prompt.audio_prompts[0]);

          utterance.rate = this.utteranceRate;

          if (prompt.sound != undefined && prompt.sound === true) {
            utterance.rate = this.utteranceRate;
            console.log("sound at stage");
            playAudio(this.notificationSound2);
          }

          utterance.onend = function () {
            //
          };
          if (!this.promptPlayed.includes("stage_completed" + stageNo)) {
            speechSynthesis.speak(utterance);
          }

          this.promptPlayed.push("stage_completed" + stageNo);
        }
      }

      if (actionObj["speed"] !== undefined) {
        this.speed = actionObj["speed"];
        this.uiStatus = [];
      }

      if (actionObj["accuracy"] !== undefined) {
        this.accuracy = actionObj["accuracy"];
      }

      if (actionObj["stage_completed"] !== undefined) {
        // playAudio(this.longSound);
        console.log("stage_completed", actionObj["stage_completed"]);
        var stageNo = parseInt(actionObj["stage_completed"], 10);
        //var prompt = this.walkthrough.stages.find(s => s.stage_number === stageNo);
        var prompt = this.walkthrough.stages.find(
          (s) => s.stage_number === stageNo
        );
        console.log("prompt", prompt);

        if (prompt) {
          let utterance = new CreateKinoUtterance(prompt.audio_prompts[0]);

          utterance.rate = this.utteranceRate;

          if (prompt.sound != undefined && prompt.sound === true) {
            utterance.rate = this.utteranceRate;
            playAudio(this.notificationSound2);
          }
          utterance.onend = function () {
            //
          };
          if (!this.promptPlayed.includes("stage_completed" + stageNo)) {
            speechSynthesis.speak(utterance);
          }

          this.promptPlayed.push("stage_completed" + stageNo);
        }
      }

      if (actionObj["repetitions"] !== undefined) {
        this.repetitions = actionObj["repetitions"];
        //playAudio(this.notificationSound2);

        if (this.series < this.max_series) {
          this.progress_matrix[this.series][this.repetitions - 1] = true;
        }

        if (this.progress_matrix.every((arr) => arr.every((v) => v === true))) {
          // this.videoElement.pause();
          // this.output_video.pause();
          // this.testfunction("pauseCamera");
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
        }
      }

      if (actionObj["series"] !== undefined) {
        this.series = actionObj["series"];
      }

      if (actionObj["wait_time"] !== undefined) {
        this.countdownTimestamp = actionObj["wait_time"] * 1000 + Date.now();
        this.lastSecond = actionObj["wait_time"];
      }

      if (actionObj["dynamic_activated"] !== undefined) {
        const dynamic_activated = actionObj["dynamic_activated"];
        //TODO UPDATE SESSION OBJECT
        this.setSoundScope(dynamic_activated);
      }

      if (actionObj["activated"] !== undefined) {
        const activated = actionObj["activated"];
        //TODO UPDATE SESSION OBJECT
        this.setUIScope(activated);
      }

      if (actionObj["target_angles"] !== undefined) {
        const targetAnglesArray = actionObj["target_angles"].split(", ");
        this.target_angles = targetAnglesArray.map(parseFloat);
      }

      if (actionObj["movement"] !== undefined) {
        let movementArray = actionObj["movement"]
          .replace(/True/g, "true")
          .replace(/False/g, "false");
        this.movement = JSON.parse(movementArray);
      }

      if (actionObj["margin"] !== undefined) {
        const marginArray = actionObj["margin"].split(", ");
        this.margin = marginArray.map(parseFloat);
      }

      if (actionObj["target_points"] !== undefined) {
        this.target_points = actionObj["target_points"];
        this.set_targets(this.target_points);
        this.set_target_lmarks(getTargetChildElementNames(this.target_points));
      }

      if (actionObj["orientation"] !== undefined) {
        this.ws_orientation.state_a = actionObj["orientation"];
        this.ws_orientation.direction = actionObj["direction"];
        this.ws_orientation.value = actionObj["value"];
        this.ws_orientation.current = actionObj["current"];
        let slider_container_content = "";

        if (this.ws_orientation.state_a === "move") {
          let slight = "";
          if (Math.abs(this.ws_orientation.value) === 30) {
            slight = "slightly";
          }
          if (this.ws_orientation.direction === "left") {
            slider_container_content = "Turn " + slight + " to your left";
          } else {
            slider_container_content = "Turn " + slight + " to your right";
          }
          let utterance = new CreateKinoUtterance(slider_container_content);
          utterance.rate = this.utteranceRate;
          speechSynthesis.speak(utterance);
        }

        if (this.ws_orientation.state_a === "switch_sides") {
          slider_container_content = "Turn to the other side";
          let utterance = new CreateKinoUtterance(slider_container_content);
          utterance.rate = this.utteranceRate;
          speechSynthesis.speak(utterance);
        }
      }

      // if (actionObj["hold"] !== undefined && actionObj["hold"] === "true") {
      //   let utterance = new CreateKinoUtterance("Hold position!");
      //   utterance.rate = this.utteranceRate;
      //   speechSynthesis.speak(utterance);
      // }

      if (actionObj["session_result"] !== undefined) {
        let session_result = actionObj["session_result"];
        // showExerciseProgress();
      }

      if (actionObj["profile_points"] !== undefined) {
        let points = actionObj["profile_points"];
        this.finishCallback && this.finishCallback(points);
      }
    });
  }

  initProgressMatrix() {
    for (let i = 0; i < this.max_series; i++) {
      const toadd = Array(this.max_repetitions).fill(false);
      this.progress_matrix.push(toadd);
    }
    console.log("Progress matrix initialised");
  }

  initImages(width, height) {
    this.svgImg = new Image();
    this.svgImg.src = "https://resources.kino.care/images/orientation/0.png";
    this.speedGreat = new Image();
    this.speedGreat.src = "https://resources.kino.care/images/speed/great.svg";
    this.speedSlow = new Image();
    this.speedSlow.src = "https://resources.kino.care/images/speed/slow.svg";
    this.speedFast = new Image();
    this.speedFast.src = "https://resources.kino.care/images/speed/fast.svg";
    this.speedImage = this.speedGreat;

    this.idea = new Image();
    this.idea.src = "https://resources.kino.care/images/icons/idea.svg";
    this.svgImg.crossOrigin = "anonymous";
    this.speedGreat.crossOrigin = "anonymous";
    this.speedSlow.crossOrigin = "anonymous";
    this.speedFast.crossOrigin = "anonymous";
    this.idea.crossOrigin = "anonymous";

    for (let i = -3; i <= 3; i++) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = `https://resources.kino.care/images/orientation/${i}.png`;
      this.orientationImageMap[i] = image;
    }

    console.log(this.orientationImageMap);

    this.stagesImageMap = this.createImageMap(5, "stages", "anonymous");
    this.countdownImageMap = this.createImageMap(4, "countdown", "anonymous");
    this.accuracyImageMap = this.createImageMap(6, "accuracy", "anonymous");
    this.repImageArray = this.createRepImageArray(this.max_series, "anonymous");

    this.repImageArray = this.createRepImageArray(this.max_series);

    this.stagesSvg = new Image();
    this.stagesSvg.src =
      "https://resources.kino.care/images/speed/stages.php?totalSegments=6&completed=3";

    this.speedImage.onload = () => {
      this.widthRatio = width / this.speedImage.width;
      this.heightRatio = height / this.speedImage.height;
    };
  }
  createImageMap(size, folder) {
    const imageMap = {};
    for (let i = 0; i < size; i++) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = `https://resources.kino.care/images/${folder}/${i}.svg`;
      imageMap[i] = image;
    }
    return imageMap;
  }

  createRepImageArray(numImages) {
    const repImageArray = [];
    for (let i = 0; i < numImages; i++) {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = `https://resources.kino.care/images/speed/stages.php?totalSegments=${numImages}&completed=${
        i + 1
      }`;
      repImageArray.push(image);
    }
    return repImageArray;
  }
}
