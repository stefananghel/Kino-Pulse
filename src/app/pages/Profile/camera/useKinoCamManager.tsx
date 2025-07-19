import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { camera } from "ionicons/icons";
import MobileDetect from "mobile-detect";
import { WebSocketConnectionType } from "./types";
import { usePoseManager } from "./KinoCamManager";
import { AuthContext, AuthData } from "../contexts/AuthContext";
import { ExerciseFinishData } from "../pages/ExerciseGuidedExecution";
import KinoCamLib from "./KinoCamLib";
interface DomRefs {
  outputVideo: string;
  inputVideo: string;
  outputCanvas: string;
  castButton: string;
}

interface HookParams {
  exerciseId: number;
  pauseCameraCallback?: () => void;
  playCameraCallback?: () => void;
}
interface UseCameraManagerParams {
  exerciseId: number;
  loginData: any;
  cameraInUse: string;
  exerciseTemplate: any;
  domRefs: DomRefs;
  webSocketConnectionType: WebSocketConnectionType;
  isPracticeRun?: boolean;
  exerciseFinishCallback?: (points: ExerciseFinishData) => void;
}

/**
 * Custom hook to manage the camera and the PoseManager lifecycle in a React component.
 *
 * @param {HookParams} params - Parameters for initializing the camera manager.
 *
 * @returns {{ requestManager: (newParams: UseCameraManagerParams) => void }}
 * - Returns the requestManager function to handle updating the manager when parameters change.
 */
const useCameraManager = ({
  exerciseId,
  playCameraCallback,
  pauseCameraCallback,
}: HookParams) => {
  const { poseManager, setPoseManager, poseInstance, playSound } =
    usePoseManager();
  const [cachedParams, setCachedParams] =
    useState<UseCameraManagerParams | null>(null);
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [videoIsPaused, setIsVideoPaused] = useState<boolean>(false);
  const [queuedRequestRef, setQueuedRequestRef] =
    useState<UseCameraManagerParams | null>(null); // Queue for pending request
  const currentStreamRef = useRef<MediaStream | null>(null);

  let cameraInUse = useRef("");
  let nativeWidth = useRef(640);
  let nativeHeight = useRef(360);
  const poseManagerRef = useRef(poseManager);

  /**
   * Function to manage the request to update the camera manager.
   * It checks if the camera is initialized and whether the parameters have changed before updating the manager.
   *
   * @param {UseCameraManagerParams} newParams - New parameters to update the manager with.
   */
  const requestManager = useCallback(
    (newParams: UseCameraManagerParams) => {
      if (!isCameraInitialized || poseInstance === null) {
        setQueuedRequestRef(newParams);
        return;
      }

      const hasParamsChanged =
        cachedParams == null ||
        (Object.keys(newParams) as (keyof UseCameraManagerParams)[]).some(
          (key) => newParams[key] !== cachedParams[key]
        );

      if (hasParamsChanged && poseInstance !== null) {
        setCachedParams(newParams);
        createManager(newParams);
      }
    },
    [isCameraInitialized, cachedParams, poseInstance]
  );

  /**
   * Function to manage the media stream, initialize the camera, and set the necessary dimensions.
   */
  const manageStream = () => {
    // const isLandscape =
    //   screen.orientation?.type?.startsWith("landscape") ||
    //   window.innerWidth > window.innerHeight;

    nativeWidth.current = 640;
    nativeHeight.current = 360;

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          // aspectRatio: 16 / 9,
          width: 640,
          height: 360,
          // frameRate: { ideal: 24, max: 24 },
          deviceId: cameraInUse.current,
          // facingMode: "user",
        },
      })
      .then((stream) => {
        const videoTrack = stream.getVideoTracks()[0];
        const { width, height } = videoTrack.getSettings();
        nativeWidth.current = width || nativeWidth.current;
        nativeHeight.current = height || nativeHeight.current;
        currentStreamRef.current = stream;
        setIsCameraInitialized(true);
        // After initializing the camera, check if there was a queued request
        if (queuedRequestRef && poseInstance) {
          requestManager(queuedRequestRef);
          setQueuedRequestRef(null); // Clear the queued request
        }
      });
  };

  const pauseCamera = () => {
    poseManagerRef.current?.handleCameraState("pauseCamera");
  };

  const sendStateCamera = () => {
    poseManagerRef.current?.handleCameraState("initial");
  };
  const playCamera = () => {
    poseManager?.handleCameraState("playCamera");
  };

  /**
   * Function to create or update the PoseManager with the provided parameters.
   *
   * @param {UseCameraManagerParams} params - Parameters for creating or updating the PoseManager.
   */
  const createManager = useCallback(
    (params: UseCameraManagerParams) => {
      let newPoseManager = null;

      if (poseManager) {
        poseManager.cleanup();
        setPoseManager(null);
      }

      //log WebSocketConnectionType
      console.log("WebSocketConnectionType", params.webSocketConnectionType);
      //log exercise is_walkthrough
      console.log("is_walkthrough", params.exerciseTemplate.is_walkthrough);

      newPoseManager = KinoCamLib.createKinoModel({
        kinoModelType: params.exerciseTemplate.is_walkthrough
          ? "walkthrough"
          : "patient",
        selectedExercise: params.exerciseTemplate,
        account: params.loginData,
        isPracticeRun: params.isPracticeRun || false,
        cameraId: params.cameraInUse,
        poseInstance: poseInstance,
        domRefs: {
          outputVideo: "output_video",
          inputVideo: "input_video",
          outputCanvas: "output_canvas",
          castButton: "cast_button",
        },
        modelParams: {
          pauseCamera: pauseCamera,
          finishCallback: params.exerciseFinishCallback,
        },
      });

      setPoseManager(newPoseManager);
      poseManagerRef.current = newPoseManager;

      return;
    },
    [setPoseManager, poseInstance]
  );

  // Effect to start video stream and initialize PoseManager when read
  useEffect(() => {
    console.log("poseManager", poseManager);
    if (poseManager && currentStreamRef.current) {
      if (
        !currentStreamRef.current ||
        !currentStreamRef.current.getVideoTracks().length
      ) {
        throw new Error("No video tracks available");
      }

      console.log("nativeHeight", nativeHeight);
      console.log("nativeWidth", nativeWidth);
      poseManager.startVideoStream(
        currentStreamRef.current,
        nativeWidth.current,
        nativeHeight.current
      );
      poseManager.initPose();

      //do not start on load
      // setTimeout(() => {
      //   poseManager.sendStartMessage();
      // }, 100);
    }
  }, [poseManager, currentStreamRef.current]);

  // const playOutputVideo = () => {
  //   (document.getElementById("output_video") as HTMLVideoElement)?.play();
  // };
  // const pauseOutputVideo = () => {
  //   (document.getElementById("output_video") as HTMLVideoElement)?.pause();
  //   setIsVideoPaused(true);
  //
  // };
  // Effect to manage camera initialization and stream management on component mount
  useEffect(() => {
    if (!isCameraInitialized)
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices: MediaDeviceInfo[]) => {
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          cameraInUse.current = videoDevices[0].deviceId;
          manageStream();
        });

    return () => {
      if (poseManagerRef.current) {
        poseManagerRef.current.cleanup();
        setPoseManager(null);
        setQueuedRequestRef(null);
        if (currentStreamRef.current) {
          currentStreamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
          currentStreamRef.current = null;
        }
      }
    };
  }, []);

  useEffect(() => {}, [isCameraInitialized]);

  useEffect(() => {
    if (isCameraInitialized && poseInstance != null)
      if (queuedRequestRef) {
        requestManager(queuedRequestRef);
        setQueuedRequestRef(null);
      }
  }, [isCameraInitialized, queuedRequestRef, poseInstance]);

  return {
    requestManager,
    videoIsPaused,
    playCamera,
    pauseCamera,
    sendStateCamera,
  };
};

export default useCameraManager;
