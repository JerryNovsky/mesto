export default class UserInfo {
    constructor(nameSelector, jobSelector, avatarSelector) {
        this._userName = document.querySelector(nameSelector);
        this._userAbout = document.querySelector(jobSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        };
    }


    setAvatar(userInfo) {
        this._userAvatar.src = userInfo.avatar
    }

    setUserInfo(userInfo) {
        this._userName.textContent = userInfo.name;
        this._userAbout.textContent = userInfo.about;

    }

};