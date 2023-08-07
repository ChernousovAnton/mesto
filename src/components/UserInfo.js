export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._nameEl = document.querySelector(nameSelector);
    this._aboutEl = document.querySelector(aboutSelector);
    this._avatarSelectorEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameEl.textContent,
      about: this._aboutEl.textContent,
    }
  }

  setUserInfo(data) {
    this._nameEl.textContent = data.name;
    this._aboutEl.textContent = data.about;
    if (data.hasOwnProperty("avatar")) this._avatarSelectorEl.src = data.avatar;
  }
}