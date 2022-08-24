import { nameInput, jobInput } from "./constants.js";

export default class UserInfo {
    constructor(dataSelector) {
        this._nameContainer = document.querySelector(dataSelector.name);
        this._jobContainer = document.querySelector(dataSelector.job);
    }

    getUserInfo() {
        const objectUserInfo = {
            name: this._nameContainer.textContent,
            description: this._jobContainer.textContent
        };
        return objectUserInfo;
    }

    setUserInfo() {
        this._nameContainer.textContent = nameInput.value;
        this._jobContainer.textContent = jobInput.value;
    };
}