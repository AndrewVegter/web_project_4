export default class UserInfo {
    constructor({ selectors }) {
        this._selectors = selectors;
        this._userName = document.querySelector(this._selectors.nameSelector);
        this._userJob = document.querySelector(this._selectors.jobSelector);
        this._userAvatar = document.querySelector(this._selectors.imageSelector);
    }

    getUserInfo() {
        return {name: this._userName.textContent, about: this._userJob.textContent}
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}