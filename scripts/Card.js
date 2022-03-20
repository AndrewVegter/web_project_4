import { openPopup } from "./utils.js";
export default class Card {
    constructor(heading, link, cardSelector) {
        this._heading = heading;
        this._link = link;
        this._cardSelector = cardSelector;
        this._isLiked = false;
        this._container = document.querySelector(".gallery__container");
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".gallery__cell").cloneNode(true);
        return cardElement;
    }

    _initiateCard() {
        this._initiatedCard = this._getTemplate();
        this._title = this._initiatedCard.querySelector(".gallery__title");
        this._image = this._initiatedCard.querySelector(".gallery__image");
        this._like = this._initiatedCard.querySelector(".gallery__button");
        this._delete = this._initiatedCard.querySelector(".gallery__delete-button");
        this._title.textContent = this._heading;
        this._image.alt = `A picture of ${this._heading}.`;
        this._image.src = this._link;
        this._setEventListeners();
        return this._initiatedCard;
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
        this._initiatedCard.remove();
    }

    _expandCard() {
        const popupImageVeil = document.querySelector("#image-container");
        const popupImage = popupImageVeil.querySelector(".popup__image");
        const popupImageTitle = popupImageVeil.querySelector(".popup__image-title");
        popupImage.src = this._link;
        popupImage.alt = this._image.alt;
        popupImageTitle.textContent = this._heading;
        openPopup(popupImageVeil);
    }

    renderCard() {
        const card = this._initiateCard();
        this._container.prepend(card);
    }
}