import {flashPage, playAudioElement} from "./util.js";

class KinoCameraBaseManager {
  constructor(account, selectedExercise, isPracticeRun) {
    this.account = account;
    this.selectedExercise = selectedExercise;
    this.isPracticeRun = isPracticeRun;

    this.socket = null;
    this.socketReady = 0;
    this.uiStatus = [];

    // this.initWebSocket();
  }

  initWebSocket() {
    const url = `wss://app.kino.care/backend/socket/${this.account.id}/${this.selectedExercise.id}?api_key=${this.account.api_key}&practice=${this.isPracticeRun}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      const socketStartMessage = {
        action: "start",
        data: "right",
        timestamp: Date.now(),
      };
      this.socket.send(JSON.stringify(socketStartMessage));
      this.socketReady = 1;
    };

    this.socket.onmessage = (msg) => {
      const actionsArray = JSON.parse(msg.data).actions;
      this.handleSocketMessage(actionsArray);
    };

    this.socket.onclose = (evt) => {
      this.socket = null;
      this.socketReady = 0;
      console.log(evt.code === 3001 ? "ws closed" : `ws connection error: ${evt.reason}`);
    };

    this.socket.onerror = (evt) => {
      if (this.socket.readyState === 1) {
        console.log(`ws normal error: ${evt.type}`);
      }
    };
  }

  handleSocketMessage(actionsArray) {
    actionsArray.forEach((actionObj) => {
      if (actionObj.status !== undefined) {
        this.handleStatusChange(actionObj.status);
      }
      if (actionObj.stage !== undefined) {
        this.handleStageChange(actionObj.stage);
      }
      if (actionObj.speed !== undefined) {
        this.speed = actionObj.speed;
        this.uiStatus = [];
      }
      if (actionObj.accuracy !== undefined) {
        this.accuracy = actionObj.accuracy;
      }
      if (actionObj.repetitions !== undefined) {
        this.repetitions = actionObj.repetitions;
        this.updateProgressMatrix();
      }
      if (actionObj.series !== undefined) {
        this.series = actionObj.series;
      }
      if (actionObj.wait_time !== undefined) {
        this.countdownTimestamp = actionObj.wait_time * 1000 + Date.now();
      }
      if (actionObj.dynamic_activated !== undefined) {
        this.setSoundScope(actionObj.dynamic_activated);
      }
      if (actionObj.activated !== undefined) {
        this.setUIScope(actionObj.activated);
      }
      if (actionObj.target_angles !== undefined) {
        this.target_angles = actionObj.target_angles.split(", ").map(parseFloat);
      }
      if (actionObj.movement !== undefined) {
        this.movement = JSON.parse(
          actionObj.movement.replace(/True/g, "true").replace(/False/g, "false")
        );
      }
      if (actionObj.margin !== undefined) {
        this.margin = actionObj.margin.split(", ").map(parseFloat);
      }
      if (actionObj.session_result !== undefined) {
        this.session_result = actionObj.session_result;
        this.showExerciseProgress();
      }
    });
  }

  handleStatusChange(status) {
    this.state = status;
    switch (status) {
      case "moving":
      case "stopped":
        this.slider_container_content = "Assume start position";
        this.resetUIStatus();
        break;
      case "start":
        this.slider_container_content = "Wait";
        this.messagePlayed = { start: false };
        break;
      case "exercise":
        this.slider_container_content = "Let's go!";
        this.messagePlayed = { exercise: false };
        break;
      default:
        break;
    }
  }

  handleStageChange(stage) {
    this.stage = stage;
    this.uiStatus = [];
    this.movement = Array(20).fill(true);
  }

  resetUIStatus() {
    this.uiStatus = [];
    this.accuracy = undefined;
    this.speed = undefined;
    this.movement = Array(20).fill(true);
  }

  updateProgressMatrix() {
    if (this.series < this.max_series) {
      this.progress_matrix[this.series][this.repetitions - 1] = true;
    }
    if (this.progress_matrix.every((arr) => arr.every((v) => v === true))) {
      setTimeout(() => {
        this.handleVideoPlayPause();
      }, 1000);
    }
  }

  setUIScope(receivedStatus) {
    this.uiStatus = receivedStatus.map((status) => mapping[status].slice());
  }

  setSoundScope(receivedStatus) {
    this.uiStatus = receivedStatus.map((status) => mapping[status].slice());
    if (receivedStatus.length > 0) {
      playAudioElement("audio-notification-1");
      flashPage("#6c7d43", 0.5);
    }
  }



  saveExercise(exerciseId) {
    try {
      const saveMessage = { action: "save", timestamp: Date.now() };
      this.socket.send(JSON.stringify(saveMessage));
      this.calculateActivityProgress(exerciseId);
    } catch (exception) {}
  }

  calculateActivityProgress(exerciseId) {
    // Implement activity progress calculation logic
  }
}
