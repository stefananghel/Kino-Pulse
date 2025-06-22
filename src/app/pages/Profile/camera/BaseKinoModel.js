import * as Pose from "@mediapipe/pose"

import MobileDetect from "mobile-detect"
import {
  POSE_CONNECTIONS,
  mapping,
  LANDMARK_MAPPING,
  POSE_LANDMARKS_ALL as POSE_LANDMARKS,
} from "./constants"
import { compareAngles, flashPage, playAudio, playAudioElement } from "./util"
import { drawArch } from "./drawUtil"
import React from "react"

window.initialPause = 0
export class BaseKinoModel {
  constructor(
    selectedExercise,
    account,
    isPracticeRun,
    cameraId,
    poseInstance,
    domRefs,
  ) {
    this.selectedExercise = selectedExercise
    this.poseInstance = poseInstance

    this.account = account
    this.isPracticeRun = isPracticeRun
    this.cameraId = cameraId
    this.domRefs = domRefs
    this.canvasWidth = 0
    this.canvasHeight = 0
    this.widthRatio = 0
    this.heightRatio = 0
    this.pose = null
    this.state = null
    this.stage = null
    this.nativeWidth = 0
    this.nativeHeight = 0
    this.messagePlayed = {}
    this.series = 0
    this.repetitions = 0
    this.accuracy = null
    this.speed = null
    this.drawImage = true
    this.drawJointNames = false
    this.drawJointAngles = false
    this.drawJointAnglesValues = false
    this.slider_container_content = ""
    this.countdownTimestamp = 0
    this.start_time = null
    this.on_res_count = 0
    this.visibilityMin = 0.5
    this.uiStatus = []
    this.speedImage = new Image()
    this.progress_matrix = []
    this.socket = null
    this.socketReady = 0
    this.exerciseStarted = false
    this.target_angles = Array(20).fill(0)
    this.margin = Array(20).fill(0)
    this.movement = Array(20).fill(true)

    this.output_video = document.getElementById(domRefs.outputVideo)
    this.subtitleTrack = this.output_video.addTextTrack(
      "captions",
      "English",
      "en",
    )
    this.videoElement = document.getElementById(domRefs.inputVideo)
    this.canvasElement = document.getElementById(domRefs.outputCanvas)
    // console.log("Canvas element", this.canvasElement);
    this.canvasCtx = this.canvasElement.getContext("2d")

    this.platform = "desktop"
    this.ws_orientation = {}
    this.screenWidth = window.screen.width
    this.screenHeight = window.screen.height
    this.screenAspectRatio = this.screenWidth / this.screenHeight

    this.max_series = Number(selectedExercise.max_series)
    this.max_stages = selectedExercise.executionTime.split(",").length
    this.max_repetitions = Number(selectedExercise.max_reps)

    this.maskString = selectedExercise.mask
    this.mask = this.maskString
      .split(",")
      .map((value) => Boolean(Number(value)))

    this.target_lmarks = []
    this.videoConfigured = false

    this.isSaved = false

    //sounds
    this.notificationSound1 = new Audio("assets/sounds/notifications-sound-1.mp3")
    this.notificationSound2 = new Audio("assets/sounds/notifications-sound-2.mp3")
    this.notificationSoundVideoPlay = new Audio("assets/sounds/video_start.mp3")
    this.notificationSoundVideoPause = new Audio("assets/sounds/video_stop.mp3")
    this.longSound = new Audio("assets/sounds/long.wav")

    this.testfunction = this.testfunction.bind(this)

    this.initWebSocket()
  }

  setup() {
    this.initPose()
    // this.initCamera()
  }

  testfunction(status) {
    console.log("Test function called with status ", status)

    switch (status) {
      case "playCamera":
        const socketStartMessage = {
          action: "start",
          timestamp: Date.now(),
        }

        console.log("Sending start message", socketStartMessage);

        if (this.socket.readyState !== WebSocket.OPEN) {
          console.error("WebSocket is not open. Current state:", this.socket.readyState);

          setTimeout(() => {
            this.testfunction("playCamera");
          }, 1000);
          return;
        }


        try {
          this.socket.send(JSON.stringify(socketStartMessage))
          this.exerciseStarted = true
        } catch (error) {
          console.error("Error sending start message", error)
          this.exerciseStarted = false
        }
        break
      case "pauseCamera":
        var socketPauseMessage = {
          action: "pause",
          timestamp: Date.now(),
        }

        //TODO: fix save also in python
        try {
          if (this.exerciseStarted) {
            this.socket.send(JSON.stringify(socketPauseMessage))
          }

          this.exerciseStarted = false
        } catch (error) {
          console.error("Error sending pause message", error)
          this.exerciseStarted = false
        }
        socketPauseMessage = {
          action: "save",
          timestamp: Date.now(),
        }

        try {
          if (this.repetitions > 0 && !this.isSaved) {
            this.socket.send(JSON.stringify(socketPauseMessage))
            this.isSaved = true
          }
          this.exerciseStarted = false
        } catch (error) {
          console.error("Error sending save message", error)
          this.exerciseStarted = false
        }

        break
      case "initial":
        this.exerciseStarted = false
        break

      default:
        console.log("Unknown status ", status)
        break
    }
  }

  initPose() {
    console.log("Init Pose")
    this.pose = this.poseInstance

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const options = JSON.parse(xhr.responseText)
        this.pose.SolutionSet = { pose: ["Pose"] }
        this.pose.setOptions(options)
        this.pose.onResults(this.onResults.bind(this))
        this.start_time = Date.now()
      }
    }
    xhr.open(
      "GET",
      "https://resources.kino.care/scripts/config-pose.json",
      true,
    )
    xhr.send()
  }

  onResults(results) {
    console.warn("Unimplemented onResult method")
  }

  initWebSocket() {
    //let hostName = "wss://" + location.hostname;

    //For local debugging
    let hostName = "wss://resources.kino.care"
    // let hostName = ""
    this.wsConnect(
      hostName +
        `/backend/socket/${this.account.id}/${this.selectedExercise.id}?api_key=${this.account.api_key}&practice=${this.isPracticeRun}`,
    )
  }

  wsConnect(url) {
    if (this.socket) {
      this.socket.close(3001)
    } else {
      console.log("Socket Initialised")
      this.socket = new WebSocket(url)
      this.socket.onopen = () => {
        // const socketStartMessage = {
        //   action: "start",
        //   data: "right",
        //   timestamp: Date.now(),
        // };
        // this.socket.send(JSON.stringify(socketStartMessage));
        this.socketReady = 1

        // let cameraUpdateMessage = {};
        // cameraUpdateMessage.action = "camera_update";
        // cameraUpdateMessage.camera_size =
        //     "[" + this.nativeWidth + ", " + this.nativeHeight + "]";
        // this.socket.send(JSON.stringify(cameraUpdateMessage));
      }

      this.socket.onmessage = (msg) => {
        this.handleSocketMessage(JSON.parse(msg.data))
      }

      this.socket.onclose = (evt) => {
        if (evt.code === 3001) {
          this.socket = null
          this.socketReady = 0
        } else {
          console.error("WebSocket connection error", evt)
          this.socket = null
          this.socketReady = 0
        }
      }

      this.socket.onerror = (evt) => {
        if (this.socket.readyState === 1) {
          console.error("WebSocket error:", evt.type)
        }
      }
    }
  }

  handleSocketMessage(data) {
    console.warn("Unimplemented handleSocketMessage method")
  }

  handleVideoSize() {
    this.videoConfigured = true

    const isLandscape =
      screen.orientation?.type?.startsWith("landscape") ||
      window.innerWidth > window.innerHeight

    // console.log("Native width", this.nativeWidth);
    // console.log("Native height", this.nativeHeight);

    if (isLandscape) {
      console.log("Landscape")
      this.nativeWidth = 640
      this.nativeHeight = 360
    } else {
      console.log("Portrait")
      this.nativeWidth = 360
      this.nativeHeight = 640
    }

    // console.log("Native width", this.nativeWidth);
    // console.log("Native height", this.nativeHeight);

    this.canvasElement.width = this.nativeWidth * 3
    this.canvasElement.height = this.nativeHeight * 3
    this.canvasWidth = this.canvasElement.width
    this.canvasHeight = this.canvasElement.height

    if (this.socketReady === 1 && this.exerciseStarted === true) {
      let cameraUpdateMessage = {}
      cameraUpdateMessage.action = "camera_update"
      cameraUpdateMessage.camera_size =
        "[" + this.nativeWidth + ", " + this.nativeHeight + "]"
      this.socket.send(JSON.stringify(cameraUpdateMessage))
    }
    this.initImages && this.initImages(this.canvasWidth, this.canvasHeight)
  }

  startVideoStream(stream, nativeWidth, nativeHeight) {
    this.nativeWidth = nativeWidth
    this.nativeHeight = nativeHeight
    this.cameraStream = stream
    this.handleVideoStream(stream)
    const track = stream.getVideoTracks()[0]
    const settings = track.getSettings()

    this.handleVideoSize(settings)

    window.addEventListener(
      "resize",
      () => {
        this.handleVideoSize(settings)
      },
      true,
    )
  }

  handleVideoStream(stream) {
    this.cameraStream = stream

    this.videoElement.srcObject = stream
    // this.videoElement.src = 'https://appv2.kino.care/resources/IMG_2831.mp4';
    //
    // this.videoElement.addEventListener("loadeddata", () => {
    //   console.log("Loaded metadata input video");
    //   this.videoElement.play();
    //   requestAnimationFrame(this.processFrame.bind(this));
    //
    //
    // });

    this.videoElement.addEventListener("playing", () => {
      console.log("input video playing")
      // if (!this.exerciseStarted) {
      requestAnimationFrame(this.processFrame.bind(this))
      // }
    })

    // Capture stream from canvas and set to output video element
    const canvasStream = this.canvasElement.captureStream(24)

    this.output_video.srcObject = canvasStream

    this.output_video.onerror = (event) => {
      console.error("Output video error:", event)
    }
  }

  processFrame() {
    if (!this.videoElement.paused && !this.videoElement.ended) {
      this.pose.send({ image: this.videoElement }).then(() => {
        requestAnimationFrame(this.processFrame.bind(this))
      })
    }
  }

  getSocketMessage(results) {
    const message = {}
    let arr = []
    let angles = []

    const landmarks = [
      POSE_LANDMARKS.RIGHT_WRIST,
      POSE_LANDMARKS.LEFT_WRIST,
      POSE_LANDMARKS.RIGHT_ELBOW,
      POSE_LANDMARKS.LEFT_ELBOW,
      POSE_LANDMARKS.RIGHT_SHOULDER,
      POSE_LANDMARKS.LEFT_SHOULDER,
      POSE_LANDMARKS.RIGHT_HIP,
      POSE_LANDMARKS.LEFT_HIP,
      POSE_LANDMARKS.RIGHT_KNEE,
      POSE_LANDMARKS.LEFT_KNEE,
      POSE_LANDMARKS.RIGHT_ANKLE,
      POSE_LANDMARKS.LEFT_ANKLE,
      POSE_LANDMARKS.RIGHT_FOOT_INDEX,
      POSE_LANDMARKS.LEFT_FOOT_INDEX,
      POSE_LANDMARKS.RIGHT_HEEL,
      POSE_LANDMARKS.LEFT_HEEL,
      POSE_LANDMARKS.RIGHT_INDEX,
      POSE_LANDMARKS.LEFT_INDEX,
      POSE_LANDMARKS.RIGHT_EYE,
      POSE_LANDMARKS.LEFT_EYE,
      POSE_LANDMARKS.RIGHT_EAR,
      POSE_LANDMARKS.LEFT_EAR,
      POSE_LANDMARKS.NOSE,
    ]

    for (let i = 0; i < landmarks.length; i++) {
      let arrTmp = []
      arrTmp.push(
        results.poseLandmarks[landmarks[i]].x,
        results.poseLandmarks[landmarks[i]].y,
        results.poseLandmarks[landmarks[i]].z,
      )
      arr.push(arrTmp)

      let angTmp = []
      if (results.poseLandmarks[landmarks[i]].visibility > 0.5) {
        angTmp.push(true)
      } else {
        angTmp.push(false)
      }

      //angTmp.push(results.poseLandmarks[landmarks[i]].visibility);
      angles.push(angTmp)
    }

    message.action = "process"
    message.data = JSON.stringify(arr)
      .replaceAll("[[", "")
      .replaceAll("]]", "")
      .replaceAll("],[", ";")
    message.visibility = JSON.stringify(angles)
      .replaceAll("[", "")
      .replaceAll("]", "")
      .replaceAll(",", " ")
    //add current timestamp to message
    message.timestamp = Date.now()

    return message
  }

  drawAnglesArc(angles, landmarks, mask, canvas) {
    let angleValues = []
    angles.forEach((angleMap) => {
      if (angleMap instanceof Map) {
        for (let value of angleMap.values()) {
          angleValues.push(value)
        }
      }
    })
    let colors = compareAngles(
      angleValues,
      this.target_angles,
      mask,
      this.movement,
      this.margin,
    )

    // Go over the mask array
    for (let i = 0; i < mask.length; i++) {
      if (!mask[i]) {
        // If mask value is False
        let mapping = LANDMARK_MAPPING[i]
        if (mapping) {
          let center = landmarks[mapping.center]
          let start = landmarks[mapping.start]
          let end = landmarks[mapping.end]

          let color =
            colors[i] === 0 ? "#6d863b" : colors[i] === -1 ? "yellow" : "red"
          //let color = 'red';
          drawArch(canvas, center, start, end, color, i)
        }
      }
    }
  }

  setUIScope(receivedStatus) {
    let activeUIElements = []
    for (var i = 0; i < receivedStatus.length; i++) {
      activeUIElements.push(mapping[receivedStatus[i]].slice()) // Use .slice() to make a copy of the line
    }
    this.uiStatus = activeUIElements
  }

  setSoundScope(receivedStatus) {
    let activeUIElements = []
    for (var i = 0; i < receivedStatus.length; i++) {
      activeUIElements.push(mapping[receivedStatus[i]].slice()) // Use .slice() to make a copy of the line
    }
    if (receivedStatus.length > 0) {
      playAudioElement("audio-notification-1")
      flashPage("#6c7d43", 0.5)
    }
  }

  cleanup() {
    console.warn("CANVAS CLEANUP")

    this.videoElement.srcObject = null
    this.cameraStream = null

    if (this.canvasElement) {
      this.canvasElement.remove()
    }
  }
}
