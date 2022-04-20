export default class Card {
    constructor({ data, clickHandler, likeHandler, deleteHandler, userObj }, selectors) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this.id = data._id;
        this._selectors = selectors;
        this._handleCardClick = clickHandler;
        this._handleLikeClick = likeHandler;
        this._handleDeleteClick = deleteHandler;
        this._userID = userObj._id;
        this.isLiked = false;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._selectors.templateSelector).content.querySelector(this._selectors.cardSelector).cloneNode(true);
        return cardElement;
    }

    _checkLikes() {
        this._likes.forEach((like) => {
            if (like._id == this._userID) this.isLiked = true;
        })
    }

    initiateCard(isUserCard) {
        this._checkLikes();
        this._cardElement = this._getTemplate();
        const title = this._cardElement.querySelector(this._selectors.titleSelector);
        this._image = this._cardElement.querySelector(this._selectors.imageSelector);
        this._like = this._cardElement.querySelector(this._selectors.likeSelector);
        if (this.isLiked) { 
            this._like.classList.add(this._selectors.likeActiveClass)
        };
        this._likeCount = this._cardElement.querySelector(this._selectors.likeCountSelector);
        this.setLikeCount(this._likes.length);
        this._delete = this._cardElement.querySelector(this._selectors.deleteSelector);
        title.textContent = this._name;
        this._image.alt = `A picture of ${this._name}.`;
        this._image.src = this._link;
        if (isUserCard) {
            this._setEventListeners(true);
            return this._cardElement;
        }
        this._delete.remove();
        this._setEventListeners(false);
        return this._cardElement;
    }

    setLikeCount(likeCount) {
        return this._likeCount.textContent = likeCount;
    }

    _setEventListeners(isUserCard) {
        this._like.addEventListener("click", () => {
            this._handleLikeClick(this);
        })
        this._image.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        })
        if (isUserCard) {
        this._delete.addEventListener("click", () => {
            this._handleDeleteClick(this);
        })}
    }

    likeCard() {
        this._like.classList.add(this._selectors.likeActiveClass);
        this.isLiked = true;
    }

    unlikeCard() {
        this._like.classList.remove(this._selectors.likeActiveClass);
        this.isLiked = false;
    }

    deleteCard() {
        //this._cardElement = null; this doesn't work//
        this._cardElement.remove();
    }
}