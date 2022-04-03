export default class UserInfo {
    constructor({ selectors }) {
        this._selectors = selectors;
        this._userName = document.querySelector(this._selectors.nameSelector);
        this._userJob = document.querySelector(this._selectors.jobSelector);
    }

    getUserInfo() {
        return {name: this._userName.textContent, job: this._userJob.textContent}
    }

    setUserInfo({ name, job }) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }
}