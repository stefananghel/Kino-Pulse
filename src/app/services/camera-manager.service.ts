import { Injectable } from '@angular/core';
import * as Pose from '@mediapipe/pose';

@Injectable({ providedIn: 'root' })
export class CameraManagerService {
  private outputVideo: HTMLVideoElement | null = null;
  private inputVideo: HTMLVideoElement | null = null;
  private pose: any = null; // MediaPipe Pose instance
  private stream: MediaStream | null = null;
  private poseCallback: ((results: any) => void) | null = null;

  constructor() {}

  initializeCamera(refs: { outputVideo: HTMLVideoElement; inputVideo: HTMLVideoElement }) {
    this.outputVideo = refs.outputVideo;
    this.inputVideo = refs.inputVideo;
    this.startCamera();
  }

  async startCamera() {
    if (!this.outputVideo || !this.inputVideo) return;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      this.outputVideo.srcObject = this.stream;
      this.outputVideo.play();
      this.inputVideo.srcObject = this.stream;
      this.inputVideo.play();
      this.setupPose();
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }

  setupPose() {
    if (!this.inputVideo) return;
    // Create MediaPipe Pose instance
    this.pose = new Pose.Pose({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    this.pose.onResults((results: any) => {
      this.handlePoseResults(results);
    });
    this.startPoseDetection();
  }

  async startPoseDetection() {
    if (!this.inputVideo || !this.pose) return;
    const video = this.inputVideo;
    const pose = this.pose;
    // Use requestAnimationFrame loop for real-time detection
    const detect = async () => {
      if (video.readyState >= 2) {
        await pose.send({ image: video });
      }
      requestAnimationFrame(detect);
    };
    detect();
  }

  handlePoseResults(results: any) {
    // Draw pose landmarks or handle results as needed
    // Example: draw on a canvas overlay (not shown here)
    // You can port drawUtil.js logic here 
  }

  // Add play/pause and other exercise/camera logic as needed
  playCamera() {
    this.outputVideo?.play();
    this.inputVideo?.play();
  }

  pauseCamera() {
    this.outputVideo?.pause();
    this.inputVideo?.pause();
  }
}
