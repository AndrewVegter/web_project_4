import Popup from "./Popup.js";
import { popupImage, popupImageTitle } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(title, link) {
        popupImage.src = link;
        popupImage.alt = `Image of ${title}`;
        popupImageTitle.textContent = title;
        super.open();
    }
}