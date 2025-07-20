import { PatientKinoModel } from "./PatientKinoModel";
import { WalkthroughKinoModel } from "./WalkthroughKinoModel";
import { BaseKinoModel } from "./BaseKinoModel";

class KinoCamLib {
  constructor() {
    if (KinoCamLib.instance) {
      return KinoCamLib.instance;
    }
    KinoCamLib.instance = this;
    this.kinoModelList = [];
    return this;
  }

  static getInstance() {
    if (!KinoCamLib.instance) {
      KinoCamLib.instance = new KinoCamLib();
    }
    return KinoCamLib.instance;
  }

  static getModelClass(kinoModelType) {    
    switch (kinoModelType) {
      case "patient":
        return PatientKinoModel;
      // case "therapist_test":
      //   return TherapistTestKinoModel;
      // case "therapist_record":
      //   return TherapistRecordKinoModel;
      case "walkthrough":
        return WalkthroughKinoModel;

      default:
        return BaseKinoModel;
    }
  }

  /**
   * Create a KinoModel instance
   * @param {Object} params - The parameters for creating a KinoModel instance
   * @param {string} params.kinoModelType - The type of KinoModel to create
   * @param {Object} params.selectedExercise - The selected exercise
   * @param {*} params.account - The account object of the user which is instantiating the model
   * @param {boolean} params.isPracticeRun - Whether the run is a practice run
   * @param {string} params.cameraId - The camera ID
   * @param {Pose | null} params.poseInstance - The pose instance
   * @param {Object} params.domRefs - The DOM references
   * @param {*} params.modelParams - The model specific parameters
   * @returns {KinoModel} The KinoModel instance
   * */
  static createKinoModel(params) {
    console.info("[KinoCamLib]", params.kinoModelType.toUpperCase(), "Model Creation Started.");
    if (!params || !params.kinoModelType) {
      throw new Error("Invalid parameters for creating KinoModel instance");
    }
    const {
      kinoModelType,
      selectedExercise,
      account,
      isPracticeRun,
      cameraId,
      poseInstance,
      domRefs,
      modelParams,
    } = params;
    const ModelClass = KinoCamLib.getModelClass(kinoModelType);

    const instance = new ModelClass(
      selectedExercise,
      account,
      isPracticeRun,
      cameraId,
      poseInstance,
      domRefs,
      modelParams
    );

    return new Proxy(instance, {
      apply(target, thisArg, argumentsList) {
        return target.call(...argumentsList);
      },
    });
  }
}


export { KinoCamLib };