export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {name: this._nameEl.textContent, job: this._jobEl.textContent}
  }

  setUserInfo(data) {
    this._nameEl.textContent = data.name;
    this._jobEl.textContent = data.job;
  }
}