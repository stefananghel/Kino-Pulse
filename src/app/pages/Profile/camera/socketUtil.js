export const Action = {
  Start: "start",
  StartExercise: "start_exercise",
  Cancel: "cancel",
  Redo: "redo",
  ProcessData: "process_data",
  ProcessFail: "process_fail",
  ParseFail: "parse_fail",
  ParseOk: "parse_ok",
  ProcessOk: "process_ok",
  StopDetected: "stop_detected",
  Stopped: "stopped",
  WaitTime: "wait_time",
  StageTestExercise: "stage_test_exercise",
  StageDetected: "stage_detected",
  Save: "save",
  SaveFailed: "save_fail",
  SaveOk: "save_ok",
  TestExercise: "test_exercise",
  None: "no_action",
  Moving: "moving",
  Exercise: "exercise",
  StartWaitTime: "start_wait_time",
  TestExerciseCompleted: "test_exercise_completed",
  ExerciseStretch: "exercise_stretch",
  CameraUpdate: "camera_update",
};

export function isValidAction(value) {
  return Object.values(Action).includes(value);
}

export const isMessageDataReceived = (message) => {
  if (message instanceof Object && ("action" in message || "wait_time" in message)) {
    return true;
  }
  return false;
};

export const getRepetitionsValue = (message) => {
  const actions = message.actions.find((data) => "repetitions" in data);
  return actions && actions.repetitions ? actions.repetitions : null;
};
