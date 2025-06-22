import { Action } from "./socketUtil";

export default class SocketMessageTherapistTest {
  constructor() {
    this.actions = [];
  }

  hasActions() {
    return this.actions && this.actions.length > 0;
  }

  hasStatus() {
    const index = this.getActionPositionByName("status");
    return this.hasActions() && index != -1 && this.actions[index].status ? true : false;
  }

  hasWaitTime() {
    return this.hasActions() && this.actions[0].wait_time ? true : false;
  }

  hasStage() {
    return this.hasActions() && this.actions[0].stage ? true : false;
  }

  hasTargetPoints() {
    const index = this.getActionPositionByName("target_points");
    return this.hasActions() && index > -1 ? true : false;
  }

  getStatus() {
    const index = this.getActionPositionByName("status");
    let value = this.hasStatus() ? this.actions[index].status : Action.None;
    return value;
  }

  getWaitTime() {
    let value = this.hasWaitTime() ? this.actions[0].wait_time : null;
    return value;
  }

  getStage() {
    let value = this.hasStage() ? this.actions[0].stage : "";
    return value;
  }

  getTargetPoints() {
    const index = this.getActionPositionByName("target_points");
    let value = this.hasTargetPoints() ? this.actions[index].target_points : "";
    return value;
  }

  getActionPositionByName(propertyName) {
    let targetIndex = -1;
    if (!this.actions) return targetIndex;
    for (let i = 0; i < this.actions.length; i++) {
      if (this.actions[i].hasOwnProperty(propertyName)) {
        targetIndex = i;
        break;
      }
    }
    return targetIndex;
  }
}
