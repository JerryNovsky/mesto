export default class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._nameContainer = document.querySelector(nameSelector);
        this._jobContainer = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            name: this._nameContainer.textContent,
            job: this._jobContainer.textContent
        };
    }

    setUserInfo({ name, job }) {
        this._nameContainer.textContent = name;
        this._jobContainer.textContent = job;
    };

}