/**
 * Function to record video from canvas
 * @param {*} canvas
 * @param {*} param1
 * @param {*} callback
 * @returns
 */
const record = (
  canvas,
  {
    timeslice,
    mimeType = "video/webm",
    audioBitsPerSecond = 0,
    videoBitsPerSecond = 25000000,
  },
  callback
) =>
  new Promise((resolve, reject) => {
    try {
      const stream = canvas.captureStream();
      const blobs = [];
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond,
        videoBitsPerSecond,
      });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          blobs.push(event.data);
        }
        callback(new Blob(event.data, { type: mimeType }));
      };

      recorder.start();
    } catch (e) {
      reject(e);
    }
  });
export { record };
