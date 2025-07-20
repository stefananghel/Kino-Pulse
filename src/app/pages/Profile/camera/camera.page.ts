import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//@ts-ignore
import { KinoCamLib } from './KinoCamLib.js'; // Adjust the import path as necessary
import { Pose } from '@mediapipe/pose';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramDetailsService } from 'src/app/services/program-details.service';
import { HtmlVideoHandler } from './video-utils/htmlVideoHandler';

@Component({
   selector: 'app-camera',
   templateUrl: './camera.page.html',
   styleUrls: ['./camera.page.scss'],
})
export class Camera implements OnInit {
   programId?: number;
   exerciseId?: number;
   program: any;
   exercise: any;
   newPoseManager: any;
   showOverlay: boolean = true; // Overlay state
   cameraInitializedWithIntro: boolean = false; // Tracks if camera was initialized with intro

   constructor(
      private route: ActivatedRoute,
      private programDetailsService: ProgramDetailsService,
      private router: Router
   ) { }

   ngOnDestroy() {
      console.info('[Camera] Cleaning up resources on destroy.');
      HtmlVideoHandler.disposeVideos();
   }

   async ngOnInit() {
      this.programId = Number(this.route.snapshot.paramMap.get('programid'));
      this.exerciseId = Number(this.route.snapshot.paramMap.get('id'));

      // Fetch program details and exercise
      if (this.programId) {
         try {
            const programDetails: any = await this.programDetailsService.getProgramDetails(this.programId);
            this.program = programDetails.data;
            if (this.program && this.program.exercises && this.exerciseId) {
               this.exercise = this.program.exercises.find((ex: any) => ex.id === this.exerciseId);

            }
         } catch (error) {
            console.error('Error fetching program or exercise:', error);
         }
      }

      // Only initialize newPoseManager if not already initialized
      if (!this.newPoseManager) {
         const account = {
            "id": 242,
            "login": "bogdan-patient02@kino.care",
            "admin": false,
            "firstname": "Sandra",
            "lastname": "Johnson",
            "mail": "bogdan-patient02@kino.care",
            "created_on": "2023-11-12T12:25:16Z",
            "last_login_on": "2025-06-17T16:10:00Z",
            "api_key": "85a677eb87368077d167b1e42c3f3727f69c40a3",
            "custom_fields": [
               {
                  "id": 8,
                  "name": "is_therapist",
                  "value": "0"
               },
               {
                  "id": 10,
                  "name": "policy_cookies",
                  "value": "0"
               },
               {
                  "id": 11,
                  "name": "policy_terms_and_conditions",
                  "value": "0"
               },
               {
                  "id": 12,
                  "name": "policy_privacy",
                  "value": "0"
               },
               {
                  "id": 24,
                  "name": "consent_marketing_phone",
                  "value": "0"
               },
               {
                  "id": 25,
                  "name": "consent_marketing_email",
                  "value": "0"
               },
               {
                  "id": 26,
                  "name": "consent_marketing_partners",
                  "value": "0"
               },
               {
                  "id": 40,
                  "name": "mr_ms",
                  "value": "Ms"
               },
               {
                  "id": 47,
                  "name": "weight",
                  "value": ""
               },
               {
                  "id": 48,
                  "name": "height",
                  "value": ""
               },
               {
                  "id": 49,
                  "name": "date_of_birth",
                  "value": ""
               },
               {
                  "id": 68,
                  "name": "is_therapist_admin",
                  "value": "0"
               },
               {
                  "id": 71,
                  "name": "user_therapist_id",
                  "value": "121"
               },
               {
                  "id": 78,
                  "name": "record",
                  "value": "0"
               },
               {
                  "id": 84,
                  "name": "change_password",
                  "value": ""
               },
               {
                  "id": 92,
                  "name": "profile_picture",
                  "value": "https://appv2.kino.care/resources/patient_profile_pictures/242_MTc0NzY2NjcwNTg1Ng==.png"
               },
               {
                  "id": 103,
                  "name": "profile_points",
                  "value": "7284"
               },
               {
                  "id": 104,
                  "name": "old_profile_points",
                  "value": "7087"
               },
               {
                  "id": 110,
                  "name": "done_tutorial",
                  "value": ""
               },
               {
                  "id": 112,
                  "name": "phone_number",
                  "value": ""
               },
               {
                  "id": 113,
                  "name": "done_tutorials",
                  "value": ""
               }
            ]
         };
         const cameraId = "default_camera_id";
         const configPose = {
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.8,
            selfieMode: false,
            enableSegmentation: false,
            smoothSegmentation: false,
         };
         let newPoseModel = new Pose({
            locateFile: (file) => `https://resources.kino.care/scripts/libs/${file}`,
         });
         newPoseModel.setOptions(configPose as any);
         this.newPoseManager = KinoCamLib.createKinoModel({
            kinoModelType: 'patient',
            selectedExercise: this.exercise,
            account: account,
            isPracticeRun: false,
            cameraId: cameraId,
            poseInstance: newPoseModel,
            domRefs: {
               outputVideo: "output_video",
               inputVideo: "input_video",
               outputCanvas: "output_canvas",
               castButton: "cast_button",
            },
            modelParams: {
               pauseCamera: (pauseCamera: boolean) => {
                  // console.info('[Camera] Paused:', pauseCamera, ".");
               },
               finishCallback: (finishCallback: () => void) => {
                  // console.log('Finish callback called:', finishCallback);
               }
            },
         });
      }
   }

   handleBackNavigation() {
      HtmlVideoHandler.clearCanvas(document.getElementById('output_canvas') as HTMLCanvasElement);
      HtmlVideoHandler.disposeVideos();
      this.router.navigate(['/wdetail', this.programId]);
   }

   startSession() {
      // Only request fullscreen here, triggered by play button click
      HtmlVideoHandler.requestFullscreenForContainer();
      console.info('[Camera] Starting session with exercise:', this.cameraInitializedWithIntro);
      if (!this.cameraInitializedWithIntro) {
         console.info('[Camera] Camera already initialized with intro video.');
         this.showOverlay = false;
         this.cameraInitializedWithIntro = true;
         HtmlVideoHandler.playIntroThenSwitchToCamera(
            'output_video',
            this.exercise.videoUrl,
            (stream) => {
               this.newPoseManager.startVideoStream(stream, 640, 360);
               this.newPoseManager.setup();
               this.newPoseManager.handleCameraState("pauseCamera");
               console.info('[Camera] Camera stream started successfully.');
               HtmlVideoHandler.togglePauseVideos();
            }
         );
      }
      else {
         this.togglePauseVideo();
      }
   }

   togglePauseVideo() {
      const paused = HtmlVideoHandler.togglePauseVideos();
      if (paused) {
         HtmlVideoHandler.exitFullscreenForContainer();
      }
      this.showOverlay = paused;
   }
}
