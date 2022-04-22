import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, link) {
        this._popupImage = this._popupElement.querySelector(".popup__image");
        this._popupImageTitle = this._popupElement.querySelector(".popup__image-title");
        this._popupImage.src = link;
        this._popupImage.alt = `Image of ${title}`;
        this._popupImageTitle.textContent = title;
        super.open();
    }
}