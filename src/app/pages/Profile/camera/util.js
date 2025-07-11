import { POSE_LANDMARKS_ALL as POSE_LANDMARKS } from "./constants.js";
import { POSE_CONNECTIONS, TARGET_LMARK_MAPPING } from "./constants.js";

/**
 * Rounds a number to the nearest half decade.
 * @param {number} number - The number to round.
 * @returns {string} The rounded number, formatted to one decimal place.
 */
function roundToHalfDecade(number) {
  var halfDecade = 0.5;
  var rounded = Math.round(number / halfDecade) * halfDecade;
  return rounded.toFixed(1);
}

/**
 * Calculates the angle between three points in degrees.
 * @param {number[]} a - The coordinates of the first point.
 * @param {number[]} b - The coordinates of the second point (vertex).
 * @param {number[]} c - The coordinates of the third point.
 * @returns {number} The angle in degrees.
 */
export const calculate_angle = (a, b, c) => {
  var radians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  var angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return Math.round(angle, 2);
};

/**
 * Generates an array of angles from pose landmarks.
 * @param {Object} results - The results object containing pose landmarks.
 * @param {Array} scope - The scope array to filter angles.
 * @param {boolean} returnRaw - Whether to return raw angles or filtered angles.
 * @returns {Array} An array of angles.
 */
export const getAnglesArray = (results, scope, returnRaw, mask) => {
  if (
    !results ||
    !results.poseLandmarks ||
    results.poseLandmarks.length === 0
  ) {
    console.warn("Get Angles : No pose landmarks available.");
    return [];
  }

  const safeLandmark = (index) => {
    const landmark = results.poseLandmarks[index];
    if (!landmark) {
      console.warn(`Landmark at index ${index} is missing.`);
      return [0, 0]; // Provide default values or handle appropriately.
    }
    return [landmark.x, landmark.y];
  };

  let arr = [];
  let arrTmp = [];
  let angles = [];

  let l_shoulder = safeLandmark(POSE_LANDMARKS.LEFT_SHOULDER);

  let l_elbow = safeLandmark(POSE_LANDMARKS.LEFT_ELBOW);

  let l_wrist = safeLandmark(POSE_LANDMARKS.LEFT_WRIST);

  let r_shoulder = safeLandmark(POSE_LANDMARKS.RIGHT_SHOULDER);

  let r_elbow = safeLandmark(POSE_LANDMARKS.RIGHT_ELBOW);

  let r_wrist = safeLandmark(POSE_LANDMARKS.RIGHT_WRIST);

  let l_hip = safeLandmark(POSE_LANDMARKS.LEFT_HIP);

  let l_knee = safeLandmark(POSE_LANDMARKS.LEFT_KNEE);

  let l_ankle = safeLandmark(POSE_LANDMARKS.LEFT_ANKLE);

  let r_index = safeLandmark(POSE_LANDMARKS.RIGHT_FOOT_INDEX);

  let r_hip = safeLandmark(POSE_LANDMARKS.RIGHT_HIP);

  let r_knee = safeLandmark(POSE_LANDMARKS.RIGHT_KNEE);

  let r_ankle = safeLandmark(POSE_LANDMARKS.RIGHT_ANKLE);

  let l_index = safeLandmark(POSE_LANDMARKS.LEFT_FOOT_INDEX);

  let r_eye = safeLandmark(POSE_LANDMARKS.RIGHT_EYE);

  let l_eye = safeLandmark(POSE_LANDMARKS.LEFT_EYE);

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_ELBOW,
      roundToHalfDecade(calculate_angle(r_wrist, r_elbow, r_shoulder))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_ELBOW,
      roundToHalfDecade(calculate_angle(l_wrist, l_elbow, l_shoulder))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_SHOULDER,
      roundToHalfDecade(calculate_angle(r_elbow, r_shoulder, r_hip))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_SHOULDER,
      roundToHalfDecade(calculate_angle(l_elbow, l_shoulder, l_hip))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_SHOULDER,
      roundToHalfDecade(calculate_angle(r_hip, r_shoulder, l_shoulder))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_SHOULDER,
      roundToHalfDecade(calculate_angle(l_hip, l_shoulder, r_shoulder))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_SHOULDER,
      roundToHalfDecade(calculate_angle(r_elbow, r_shoulder, l_shoulder))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_SHOULDER,
      roundToHalfDecade(calculate_angle(l_elbow, l_shoulder, r_shoulder))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_HIP,
      roundToHalfDecade(calculate_angle(r_shoulder, r_hip, r_knee))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_HIP,
      roundToHalfDecade(calculate_angle(l_shoulder, l_hip, l_knee))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_HIP,
      roundToHalfDecade(calculate_angle(l_hip, r_hip, r_knee))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_HIP,
      roundToHalfDecade(calculate_angle(r_hip, l_hip, l_knee))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_HIP,
      roundToHalfDecade(calculate_angle(r_shoulder, r_hip, l_hip))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_HIP,
      roundToHalfDecade(calculate_angle(l_shoulder, l_hip, r_hip))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_KNEE,
      roundToHalfDecade(calculate_angle(r_hip, r_knee, r_ankle))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_KNEE,
      roundToHalfDecade(calculate_angle(l_hip, l_knee, l_ankle))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_ANKLE,
      roundToHalfDecade(calculate_angle(r_knee, r_ankle, r_index))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_ANKLE,
      roundToHalfDecade(calculate_angle(l_knee, l_ankle, l_index))
    )
  );

  angles.push(
    new Map().set(
      POSE_LANDMARKS.RIGHT_HIP,
      360 - roundToHalfDecade(calculate_angle(r_shoulder, r_hip, r_knee))
    )
  );
  angles.push(
    new Map().set(
      POSE_LANDMARKS.LEFT_HIP,
      360 - roundToHalfDecade(calculate_angle(l_shoulder, l_hip, l_knee))
    )
  );

  if (!mask[20]) {
    let eye_point = findMidpoint(r_eye, l_eye);
    let neck_point = findMidpoint(r_shoulder, l_shoulder);
    let hip_point = findMidpoint(r_hip, l_hip);

    angles.push(
      new Map().set(
        POSE_LANDMARKS.NOSE,
        roundToHalfDecade(calculate_angle(eye_point, neck_point, hip_point))
      )
    );
  } else {
    angles.push(new Map().set(POSE_LANDMARKS.NOSE, -10));
  }
  if (!mask[21]) {
    angles.push(
      new Map().set(
        POSE_LANDMARKS.NOSE,
        roundToHalfDecade(
          calculateAngleBetweenVectors(r_eye, l_eye, r_shoulder, l_shoulder)
        )
      )
    );
  } else {
    angles.push(new Map().set(POSE_LANDMARKS.NOSE, -10));
  }

  const inScopeAngles = [];
  if (returnRaw) {
    return angles;
  } else {
    for (let i = 0; i < scope.length; i++) {
      if (scope[i] != 0) {
        inScopeAngles.push(angles[i]);
      } else {
        inScopeAngles.push(new Map().set(0, 0));
      }
    }

    return inScopeAngles;
  }
};

/**
 * Computes the visibility of three points.
 * @param {number} a - The visibility of the first point.
 * @param {number} b - The visibility of the second point.
 * @param {number} c - The visibility of the third point.
 * @returns {boolean} Whether all three points are visible.
 */
export const computeVisibility = (a, b, c) => {
  if (a == undefined || b == undefined || c == undefined) return false;

  if (a > 0.5 && b > 0.5 && c > 0.5) {
    return true;
  } else {
    return false;
  }
};

/**
 * Finds a point A on the line BC such that the distance from C to A is d.
 * @param {Object} B - The coordinates of point B.
 * @param {Object} C - The coordinates of point C.
 * @param {number} d - The distance from C to A.
 * @returns {Object} The coordinates of point A.
 */
export const findPointA = (B, C, d) => {
  let length = Math.sqrt((C.x - B.x) ** 2 + (C.y - B.y) ** 2);
  let ratio = d / length;

  let xA = C.x + ratio * (B.x - C.x);
  let yA = C.y + ratio * (B.y - C.y);

  return { x: xA, y: yA };
};

/**
 * Gets a point on the line segment between two points at a specified distance from one point.
 * @param {Object} pointA - The coordinates of the first point.
 * @param {Object} pointB - The coordinates of the second point.
 * @param {number} distanceFromB - The distance from point B to the desired point.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {Object} The coordinates of the desired point.
 */
export const getPointOnLine = (pointA, pointB, distanceFromB, ctx) => {
  let dirVec = {
    x: pointA.x - pointB.x,
    y: pointA.y - pointB.y,
  };

  let magnitude = Math.sqrt(dirVec.x * dirVec.x + dirVec.y * dirVec.y);

  let unitVec = {
    x: dirVec.x / magnitude,
    y: dirVec.y / magnitude,
  };

  let scaledVec = {
    x: unitVec.x * distanceFromB,
    y: unitVec.y * distanceFromB,
  };

  let resultPoint = {
    x: pointB.x + scaledVec.x,
    y: pointB.y + scaledVec.y,
  };

  return resultPoint;
};

/**
 * Gets the landmark name by its index.
 * @param {number} index - The index of the landmark.
 * @returns {string|null} The name of the landmark or null if not found.
 */
export const getLandmarkName = (index) => {
  for (const key in POSE_LANDMARKS) {
    if (POSE_LANDMARKS[key] === index) {
      return key;
    }
  }
  return null;
};

/**
 * Calculates the Euclidean distance between two points.
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The Euclidean distance.
 */
export const euclideanDistance = (x1, y1, x2, y2) => {
  var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
};

export const findMidpointCoordinate = (point1, point2, mid) => {
  if (mid !== 0) {
    return {
      x: (point1.x + point2.x) / 2,
      y: ((point1.y + point2.y) / 2 + mid.y) / 2,
      z: (point1.z + point2.z) / 2,
    };
  } else {
    return {
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
      z: (point1.z + point2.z) / 2,
    };
  }
};

export const findMidpoint = (point1, point2) => {
  // Returns the midpoint between two coordinates
  // Assuming point1 and point2 are arrays in the form [x, y, z]
  let midpoint = [];
  for (let i = 0; i < point1.length; i++) {
    midpoint.push((point1[i] + point2[i]) / 3);
  }
  return midpoint;
};

export const vectorSubtract = (a, b) => {
  return [a[0] - b[0], a[1] - b[1]];
};

export const dotProduct = (a, b) => {
  return a[0] * b[0] + a[1] * b[1];
};

export const vectorNorm = (v) => {
  return Math.sqrt(dotProduct(v, v));
};

export const calculateAngleBetweenVectors = (p1L1, p2L1, p1L2, p2L2) => {
  const vector1 = vectorSubtract(p2L1, p1L1);
  const vector2 = vectorSubtract(p2L2, p1L2);

  const norm1 = vectorNorm(vector1);
  const norm2 = vectorNorm(vector2);

  if (norm1 === 0 || norm2 === 0)
    throw new Error("One of the vectors is of zero length");

  const vector1Normalized = vector1.map((component) => component / norm1);
  const vector2Normalized = vector2.map((component) => component / norm2);

  const dot = dotProduct(vector1Normalized, vector2Normalized);

  const angleRad = Math.acos(Math.min(Math.max(dot, -1), 1));

  return angleRad * (180 / Math.PI);
};

/**
 * Filters pose landmarks.
 * @param {Object[]} poseLandmarks - The array of pose landmarks.
 * @returns {Object[]} The filtered pose landmarks.
 */
export const filterLandmarks = (poseLandmarks) => {
  const filteredLandmarks = poseLandmarks;

  if (filteredLandmarks !== undefined) {
    const midpointShld = findMidpointCoordinate(
      filteredLandmarks[POSE_LANDMARKS.LEFT_SHOULDER],
      filteredLandmarks[POSE_LANDMARKS.RIGHT_SHOULDER],
      0
    );
    filteredLandmarks.push({
      visibility: filteredLandmarks[POSE_LANDMARKS.NOSE].visibility, // Customize 'id' based on your requirements
      x: (filteredLandmarks[POSE_LANDMARKS.NOSE].x + midpointShld.x) / 2,
      y: (filteredLandmarks[POSE_LANDMARKS.NOSE].y + midpointShld.y) / 2,
      z: filteredLandmarks[POSE_LANDMARKS.NOSE].z,
    });

    filteredLandmarks.push({
      visibility: filteredLandmarks[POSE_LANDMARKS.NOSE].visibility, // Customize 'id' based on your requirements
      x: midpointShld.x,
      y: midpointShld.y,
      z: midpointShld.z,
    });
  }

  return filteredLandmarks;
};

/**
 * Calculates the angle in radians between three points.
 * @param {Object} a - The coordinates of the first point.
 * @param {Object} b - The coordinates of the second point (vertex).
 * @param {Object} c - The coordinates of the third point.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {number} The angle in radians.
 */
export const calcAng = (a, b, c, ctx) => {
  var radians =
    Math.atan2(
      (c.y - b.y) * ctx.canvas.height,
      (c.x - b.x) * ctx.canvas.width
    ) -
    Math.atan2((a.y - b.y) * ctx.canvas.height, (a.x - b.x) * ctx.canvas.width);

  return radians;
};

/**
 * Calculates the angle between the start and center points relative to the x-axis.
 * @param {Object} start - The coordinates of the start point.
 * @param {Object} center - The coordinates of the center point.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @returns {number} The angle in radians.
 */
export const calculateAngle = (start, center, ctx) => {
  let st = -1 * start.x * ctx.canvas.width;
  let cent = -1 * center.x * ctx.canvas.width;
  let angle = Math.atan2((start.y - center.y) * ctx.canvas.height, st - cent);

  return angle;
};

/**
 * Compares angles with a target angle using a mask and movement array.
 * @param {number[]} angles - The array of angles to compare.
 * @param {number[]} target - The array of target angles.
 * @param {boolean[]} mask - The array of mask values.
 * @param {boolean[]} movement - The array of movement values.
 * @returns {number[]} - The array of comparison results.
 */
export const compareAngles = (angles, target, mask, movement, margin) => {
  if (
    angles.length !== 20 ||
    target.length !== 20 ||
    mask.length !== 20 ||
    margin.length !== 20
  ) {
    // throw new Error("Unexpected array lengths!");
    // console.error(
    //   "Unexpected array lengths",
    //   angles.length,
    //   target.length,
    //   mask.length,
    //   margin.length
    // );
  }

  // Initialize result array.
  let results = [];
  // Iterate through the length of the arrays.
  for (let i = 0; i < 20; i++) {
    // If the mask is true, add null to results and skip to the next iteration.
    if (mask[i]) {
      results.push(null);
      continue;
    }

    // Compare the values using the specified threshold.
    if (movement[i]) {
      if (Math.abs(angles[i] - target[i]) <= margin[i]) {
        results.push(0);
      } else {
        results.push(-1);
      }
    } else {
      results.push(1);
    }
  }
  // console.log(results);
  return results;
};

/**
 * Maps an accuracy percentage to a corresponding image index.
 *
 * @param {number} accuracyPercentage - The accuracy percentage to map, ranging from 0 to 100.
 * @returns {number} The corresponding image index, ranging from 0 to 5.
 */
export const mapAccuracyToImages = (accuracyPercentage) => {
  accuracyPercentage = Math.min(100, Math.max(0, accuracyPercentage));

  return accuracyPercentage ? Math.round((accuracyPercentage / 100) * 5) : 0;
};

/**
 * Calculates the difference in seconds between a given timestamp and the current time.
 *
 * @param {number} timestamp - The timestamp to compare, in milliseconds.
 * @returns {number} The difference in seconds between the given timestamp and the current time.
 */
export const getSecondsDifference = (timestamp) => {
  const currentTimestamp = Date.now();
  const differenceInMilliseconds = timestamp - currentTimestamp;
  return Math.floor(differenceInMilliseconds / 1000);
};

/**
 * Checks if a given element is active based on its presence in the uiStatus matrix.
 *
 * @param {number} element - The element to check for activity status.
 * @param {Array<Array<number>>} uiStatus - The current state of various UI components.
 * @returns {boolean} - Returns `true` if the element is found in any of the sub-arrays within uiStatus,
 *                      indicating that the element is active, or `false` otherwise.
 */
export const isElementActive = (element, uiStatus) => {
  for (let i = 0; i < uiStatus.length; i++) {
    if (uiStatus[i].includes(element)) {
      return true;
    }
  }
  return false;
};

/**
 * Plays a sound effect.
 * @param {HTMLAudioElement} sound - The sound file to play.
 */
export const playAudio = (sound) => {
  sound.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export const playAudioElement = (soundElementId) => {
  //    document.getElementById("audio-test")?.play();
  // console.log("Playing sound element with ID:", soundElementId);
  // document.getElementById(soundElementId).play().catch((error) => {
  //   console.error("Error playing sound:", error);
  // });
  document.getElementById(soundElementId).play();
};

/**
 * Flashes the page with a specified color for a given duration.
 * @param {string} color - The color to flash the page.
 * @param {number} duration - The duration of the flash in seconds.
 */
export const flashPage = (color, duration) => {
  document.body.classList.add("flash");
  document.body.style.backgroundColor = color + "!important";

  setTimeout(function () {
    document.body.classList.remove("flash");
    document.body.style.backgroundColor = "";
  }, duration * 1000);
};

export const getTargetChildElementNames = (target_points) => {
  const targetPoints = target_points;
  const resultArray = new Array(23).fill(false);
  //console.log("Setting target_lmarks", targetPoints);
  for (const key in targetPoints) {
    if (targetPoints.hasOwnProperty(key)) {
      const index = parseInt(key, 10);
      if (index < 23) {
        resultArray[index] = true;
      }
    }
  }
  return resultArray;
};

export const drawLandmarksAndConnections = (
    state,
    canvasCtx,
    filteredLandmarks,
    i,
    bulaRadius,
    lineWidth,
    startLandmark,
    endLandmark,
    target_lmarks,
    drawJointNames,
    uiStatus,
    canvasElement
  ) => {
    let connectionColor = "white";
    if (target_lmarks !== undefined && state === "exercise") {
      if (
        target_lmarks[TARGET_LMARK_MAPPING.indexOf(POSE_CONNECTIONS[i][0])] ===
          true ||
        target_lmarks[TARGET_LMARK_MAPPING.indexOf(POSE_CONNECTIONS[i][1])] ===
          true
      ) {
        startLandmark = filteredLandmarks[POSE_CONNECTIONS[i][0]];
        endLandmark = filteredLandmarks[POSE_CONNECTIONS[i][1]];
      }

      for (let i = 0; i < filteredLandmarks.length; i++) {
        if (target_lmarks.length > 0 && target_lmarks[i] === true) {
          canvasCtx.beginPath();
          canvasCtx.arc(
            filteredLandmarks[TARGET_LMARK_MAPPING[i]].x *
              canvasCtx.canvas.width,
            filteredLandmarks[TARGET_LMARK_MAPPING[i]].y *
              canvasCtx.canvas.height,
            bulaRadius * 1.5,
            0,
            2 * Math.PI
          );
          canvasCtx.fillStyle = "red";
          canvasCtx.fill();
          canvasCtx.strokeStyle = "red";
          canvasCtx.lineWidth = lineWidth;
          canvasCtx.stroke();
        }
      }
    } else {
      startLandmark = filteredLandmarks[POSE_CONNECTIONS[i][0]];
      endLandmark = filteredLandmarks[POSE_CONNECTIONS[i][1]];
    }

    //Common for both ex and not
    // Draw start landmark
    canvasCtx.beginPath();
    canvasCtx.arc(
      startLandmark.x * canvasCtx.canvas.width,
      startLandmark.y * canvasCtx.canvas.height,
      bulaRadius,
      0,
      2 * Math.PI
    );
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();
    canvasCtx.strokeStyle = "#6d863b";
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.stroke();

    // Draw end landmark
    canvasCtx.beginPath();
    canvasCtx.arc(
      endLandmark.x * canvasCtx.canvas.width,
      endLandmark.y * canvasCtx.canvas.height,
      bulaRadius,
      0,
      2 * Math.PI
    );
    canvasCtx.fillStyle = "white";
    canvasCtx.fill();
    canvasCtx.strokeStyle = "#6d863b";
    canvasCtx.lineWidth = lineWidth;
    canvasCtx.stroke();

    // Draw connection
    if (startLandmark !== undefined && endLandmark !== undefined) {
      canvasCtx.beginPath();
      canvasCtx.moveTo(
        startLandmark.x * canvasCtx.canvas.width,
        startLandmark.y * canvasCtx.canvas.height
      );
      canvasCtx.lineTo(
        endLandmark.x * canvasCtx.canvas.width,
        endLandmark.y * canvasCtx.canvas.height
      );

      if (isElementActive(i, uiStatus)) {
        canvasCtx.strokeStyle = connectionColor;
        canvasCtx.lineWidth = lineWidth;
      } else {
        canvasCtx.strokeStyle = "white";
        canvasCtx.lineWidth = lineWidth;
      }
      canvasCtx.stroke();
    }

    if ((startLandmark || endLandmark) && drawJointNames === true) {
      const startLandmarkName = getLandmarkName(POSE_CONNECTIONS[i][0]);
      canvasCtx.font = "bold 52px Arial"; // set the font

      canvasCtx.scale(-1, 1);

      const x = startLandmark.x * canvasElement.width;
      const y = startLandmark.y * canvasElement.height;

      canvasCtx.fillText(startLandmarkName, -x, y - 20);
      canvasCtx.scale(-1, 1);
    }
  }