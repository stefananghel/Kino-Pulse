const defaultConfigPose = {
  modelComplexity: 1,
  smoothLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.8,
  selfieMode: false,
  enableSegmentation: false,
  smoothSegmentation: false,
};
import { Pose } from '@mediapipe/pose';

let poseInstance: Pose | null = null;

export function getCachedPose(options?: any): Pose {
  if (!poseInstance) {
    poseInstance = new Pose({
      locateFile: (file: string) => `https://resources.kino.care/scripts/libs/${file}`,
    });
    poseInstance.setOptions(options || defaultConfigPose);
  }
  return poseInstance;
}

export function clearCachedPose() {
  poseInstance = null;
}
