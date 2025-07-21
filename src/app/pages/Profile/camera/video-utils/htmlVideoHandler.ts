export class HtmlVideoHandler {
    static stopAndDispose(videoElement: HTMLVideoElement | null) {
        if (videoElement && videoElement.srcObject) {
            // Pause the video before disposing
            try { videoElement.pause(); } catch (e) { }
            videoElement.onerror = null;
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

    static playIntroThenSwitchToCamera(videoElementId: string, introVideoUrl: string,
        onCameraStream: (stream: MediaStream) => void,
        onError?: (error: any) => void) {
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

    static togglePauseVideos(): boolean {

        const inputVideo = document.getElementById('input_video') as HTMLVideoElement;
        const outputVideo = document.getElementById('output_video') as HTMLVideoElement;

        var { inputVideoIsPlaying, outputVideoIsPlaying } = HtmlVideoHandler.getVideoIsPlaying(inputVideo, outputVideo);

        let paused = !inputVideoIsPlaying;
        if (inputVideo && !inputVideo.paused && inputVideoIsPlaying) {
            inputVideo.pause();
            paused = true;
        } else if (inputVideo) {
            inputVideo.play();
            paused = false;
        }
        if (outputVideo && !outputVideo.paused && outputVideoIsPlaying) {
            outputVideo.pause();
            paused = true;
        } else if (outputVideo) {
            outputVideo.play();
            paused = false;
        }
        return paused;
    }

    static getVideoIsPlaying(inputVideo: HTMLVideoElement, outputVideo: HTMLVideoElement) {
        var inputVideoIsPlaying = inputVideo.currentTime > 0 && !inputVideo.paused && !inputVideo.ended
            && inputVideo.readyState > inputVideo.HAVE_CURRENT_DATA;
        var outputVideoIsPlaying = outputVideo.currentTime > 0 && !outputVideo.paused && !outputVideo.ended
            && outputVideo.readyState > outputVideo.HAVE_CURRENT_DATA;
        return { inputVideoIsPlaying, outputVideoIsPlaying };
    }

    static requestFullscreenForContainer() {
        const container = document.getElementById('full-screen-container');
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if ((container as any).webkitRequestFullscreen) {
                (container as any).webkitRequestFullscreen();
            }
        }
    }

    static exitFullscreenForContainer() {
        if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            }
        }
    }

}
