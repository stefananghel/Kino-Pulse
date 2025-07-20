export class HtmlVideoHandler {
    static stopAndDispose(videoElement: HTMLVideoElement | null) {
        if (videoElement && videoElement.srcObject) {
            const stream = videoElement.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
        }
    }

    static clearCanvas(canvasElement: HTMLCanvasElement | null) {
        if (canvasElement) {
            const ctx = canvasElement.getContext('2d');
            ctx?.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
    }

    static disposeVideos() {
        const inputVideo = document.getElementById('input_video') as HTMLVideoElement;
        HtmlVideoHandler.stopAndDispose(inputVideo);
        const outputVideo = document.getElementById('output_video') as HTMLVideoElement;
        HtmlVideoHandler.stopAndDispose(outputVideo);
    }

    static pauseCamera() {
        const inputVideo = document.getElementById('input_video') as HTMLVideoElement;
        if (inputVideo && !inputVideo.paused) {
            console.info('[Camera] Input Video Paused.');
            inputVideo.pause();
        }
        const outputVideo = document.getElementById('output_video') as HTMLVideoElement;
        if (outputVideo && !outputVideo.paused) {
            console.info('[Camera] Output Video Paused.');
            outputVideo.pause();
        }
    }

    static setupCameraStream(videoElementId: string, onStream: (stream: MediaStream) => void, onError?: (error: any) => void) {
        const videoElement = document.getElementById(videoElementId) as HTMLVideoElement;
        if (!videoElement) {
            console.error('Video element not found');
            if (onError) onError('Video element not found');
            return;
        }
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoElement.srcObject = stream;
                if (onStream) onStream(stream);
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
                if (onError) onError(error);
            });
    }

    static playIntroThenSwitchToCamera(videoElementId: string, introVideoUrl: string, onCameraStream: (stream: MediaStream) => void, onError?: (error: any) => void) {
        const videoElement = document.getElementById(videoElementId) as HTMLVideoElement;
        if (!videoElement) {
            console.error('Video element not found');
            if (onError) onError('Video element not found');
            return;
        }

        // Helper to switch to camera stream
        const switchToCameraStream = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoElement.src = '';
                    videoElement.srcObject = stream;
                    if (onCameraStream) onCameraStream(stream);
                })
                .catch((error) => {
                    console.error('Error accessing webcam:', error);
                    if (onError) onError(error);
                });
        };

        // If no intro video, start camera stream immediately
        if (!introVideoUrl) {
            switchToCameraStream();
            return;
        }

        // Play intro video
        videoElement.srcObject = null;
        videoElement.src = introVideoUrl;
        videoElement.load();
        videoElement.play().catch((err) => {
            console.error('Error playing intro video:', err);
        });

        videoElement.onended = switchToCameraStream;
    }

}
