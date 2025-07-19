import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//@ts-ignore
import { KinoCamLib } from './KinoCamLib.js'; // Adjust the import path as necessary
import { Pose } from '@mediapipe/pose';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramDetailsService } from 'src/app/services/program-details.service';

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

   constructor(
      private route: ActivatedRoute,
      private programDetailsService: ProgramDetailsService,
      private router: Router
   ) { }

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
      const newPoseManager = KinoCamLib.createKinoModel({
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


      //getusermedia and attach to video element
      const videoElement = document.getElementById('input_video') as HTMLVideoElement;
      if (!videoElement) {
         console.error('Video element not found');
         return;
      }
      navigator.mediaDevices.getUserMedia({ video: true })
         .then((stream) => {
            newPoseManager.startVideoStream(
               stream, 640, 360
            );
            newPoseManager.setup();

            newPoseManager.handleCameraState("playCamera");
         })
         .catch((error) => {
            console.error('Error accessing webcam:', error);
         });



   }

   handleBackNavigation() {

      this.disposeVideo();

      this.router.navigate(['/wdetail', this.programId]);
   }


   private disposeVideo() {
      const inputVideo = document.getElementById('input_video') as HTMLVideoElement;
      if (inputVideo && inputVideo.srcObject) {
         const stream = inputVideo.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
         inputVideo.srcObject = null;
      }
      const outputVideo = document.getElementById('output_video') as HTMLVideoElement;
      if (outputVideo && outputVideo.srcObject) {
         const stream = outputVideo.srcObject as MediaStream;
         stream.getTracks().forEach(track => track.stop());
         outputVideo.srcObject = null;
      }
   }
}
