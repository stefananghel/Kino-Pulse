export default class SocketMessageTherapistRecord {
  constructor() {
    this.action = null;
    this.wait_time = null;
  }

  getStatus() {
    return this.action;
  }
  getWaitTime() {
    return this.wait_time;
  }

  setStatus(action) {
    this.action = action;
  }

  setWaitTime(wait_time) {
    this.wait_time = wait_time;
  }
}
