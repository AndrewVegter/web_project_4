import { openPopup } from "./utils/utils.js";
import { popupImageVeil, popupImage, popupImageTitle } from "./index.js";

export default class Card {
    constructor(heading, link, cardSelector) {
        this._heading = heading;
        this._link = link;
        this._cardSelector = cardSelector;
        this._isLiked = false;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".gallery__cell").cloneNode(true);
        return cardElement;
    }

    _initiateCard() {
        this._cardElement = this._getTemplate();
        const title = this._cardElement.querySelector(".gallery__title");
        this._image = this._cardElement.querySelector(".gallery__image");
        this._like = this._cardElement.querySelector(".gallery__button");
        this._delete = this._cardElement.querySelector(".gallery__delete-button");
        title.textContent = this._heading;
        this._image.alt = `A picture of ${this._heading}.`;
        this._image.src = this._link;
        this._setEventListeners();
        return this._cardElement;
    }

    _setEventListeners() {
        this._like.addEventListener("click", () => {
            this._likeCard();
        })
        this._delete.addEventListener("click", () => {
            this._deleteCard();
        })
        this._image.addEventListener("click", () => {
            this._expandCard();
        })
    }

    _likeCard() {
        this._like.classList.toggle("gallery__button_active");
        this._isLiked = !this._isLiked;
    }

    _deleteCard() {
        this._cardElement.remove();
    }

    _expandCard() {
        popupImage.src = this._link;
        popupImage.alt = this._image.alt;
        popupImageTitle.textContent = this._heading;
        openPopup(popupImageVeil);
    }

    renderCard(container) {
        const card = this._initiateCard();
        container.prepend(card);
    }
}