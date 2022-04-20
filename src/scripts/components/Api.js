export default class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `${this._token}`
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getInitialCards() {
         return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `${this._token}`
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    updateUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `${this._token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            
    }

    updateUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `${this._token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: `${this._token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                if (res.ok) return res.json();
                return Promise.reject(`Error: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._token}`
            }
        })
    }

    likeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "PUT",
            headers: {
                authorization: `${this._token}`
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    unlikeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
            method: "Delete",
            headers: {
                authorization: `${this._token}`
            }
        })
        .then((res) => {
            if (res.ok) return res.json();
            return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
    }
}