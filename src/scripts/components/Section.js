export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item, isNew) {
        const card = this._renderer(item)
        if (isNew) return this._container.prepend(card); //no more scrolling to the bottom to see if my card saved/deleted/stayed liked
        return this._container.append(card);
    }
}