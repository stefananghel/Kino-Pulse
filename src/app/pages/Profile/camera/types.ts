import { Pose } from "@mediapipe/pose";

export enum WebSocketConnectionType {
  RecordExercise,
  TestExercise,
  PatientExercise,
  WalkthroughExercise,
}

export type PoseManagerType = "therapist_record" | "therapist_test";

export interface PoseManager {
  type: PoseManagerType;
  socket: WebSocket | null;

  setup(): void;
  initProgressMatrix(): void;
  initImages(): void;
  createImageMap(size: number, folder: string): Record<number, HTMLImageElement>;
  createRepImageArray(numImages: number): HTMLImageElement[];
  initPose(): void;
  onResults(results: any): void;
  getSocketUrl(): string | undefined;
  initWebSocket(): void;
  wsConnect(url: string): void;
  sendSocketMessage(message: any): void;
  handleSocketMessage(data: any): void;
  initCamera(): void;
  handleVideoSize(settings: MediaTrackSettings): void;
  startVideoStream(
    stream: MediaStream,
    nativeWidth: number,
    nativeHeight: number
  ): Promise<void>;
  cleanup(): void;
  handleVideoStream(stream: MediaStream): void;
  processFrame(): void;
  getSocketMessage(results: any): any;
  processLandmarks(
    angles: any,
    landmarks: any,
    mask: any[],
    canvasCtx: CanvasRenderingContext2D
  ): void;
  setUIScope(receivedStatus: any[]): void;
  setSoundScope(receivedStatus: any[]): void;
  sendStartMessage: () => void;
  updateCamera: (params: any) => void;
  pauseCamera: () => void;
  recordedChunks: [];
  saveExercise?: (exerciseId: string) => void;
  toggleSkeleton?: (value: boolean) => void;
  toggleAngles?: (value: boolean) => void;
  toggleJointNames?: (value: boolean) => void;
  handleCameraState(status: string): void;
}

export interface KinoCamLibParams {
  kinoModelType: PoseManagerType;
  selectedExercise: string;
  isPracticeRun: boolean;
  account: any;
  cameraId: string;
  poseInstance: Pose | null;
  domRefs: {
    outputVideo: string;
    inputVideo: string;
    outputCanvas: string;
    castButton: string;
  };
  modelParams: {
    exerciseTemplate?: any;
    setActionSheetMessage: (message: string) => void;
    setActionSheetIsOpen: (isOpen: boolean) => void;
    setActionSheet: (sheet: any) => void;
    pauseCamera: () => void;
    playCamera: () => void;
    setTotalNoOfStages: (stages: number) => void;
    saveExercise: () => void;
    playSoundConfirmationRef?: React.RefObject<HTMLAudioElement>;
    playSoundRef?: React.RefObject<HTMLAudioElement>;
    isStretch?: boolean;
    startRecordProgress?: () => void;
    setRecordStageProgress?: (progress: number) => void;
    interval?: number;
    testExercise?: () => void;
    processStageImages?: () => void;
    saveThumbnail?: () => void;
  };
}

export interface UseCameraManagerParams {
  exerciseId: string;
  loginData: any;
  cameraInUse: string;
  exerciseTemplate: any;
  setActionSheetMessage: (message: string) => void;
  setActionSheetIsOpen: (isOpen: boolean) => void;
  setActionSheet: (sheet: any) => void;
  pauseCamera: () => void;
  playCamera: () => void;
  setTotalNoOfStages: (stages: number) => void;
  saveExerciseTemplateService: () => void;
  playSoundConfirmationRef?: React.RefObject<HTMLAudioElement>;
  playSoundRef?: React.RefObject<HTMLAudioElement>;
  startRecordProgress?: () => void;
  setRecordStageProgress?: (progress: number) => void;
  interval?: number;
  testExercise?: () => void;
  processStageImages?: () => void;
  saveThumbnail?: () => void;
  webSocketConnectionType: WebSocketConnectionType;
}
