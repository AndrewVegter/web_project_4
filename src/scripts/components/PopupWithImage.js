import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, link) {
        const popupImage = this._popupElement.querySelector(".popup__image");
        const popupImageTitle = this._popupElement.querySelector(".popup__image-title");
        popupImage.src = link;
        popupImage.alt = `Image of ${title}`;
        popupImageTitle.textContent = title;
        super.open();
    }
}