import "./index.css";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { validationObj, initialCards, cardSelectorList, inputName, 
  inputAbout, editButton, addButton, formSelectors, userSelectors } from "../scripts/utils/constants.js";

const userBio = new UserInfo({ selectors: userSelectors });

const bioForm = new PopupWithForm("#edit-container", (data) => {
  userBio.setUserInfo({ name: data.input1, job: data.input2 })
  bioForm.close();
});

const addCard = (cardData) => {
  const cardItem = new Card({ data: cardData, clickHandler: (title, link) => {popupImage.open(title, link)}}, cardSelectorList);
  const cardElement = cardItem.initiateCard();
  return cardElement;
}//since this function is very specifically used to set up and govern the interactions of 2 classes it belongs here, right?//

const addForm = new PopupWithForm("#add-container", (data) => {
  const translatedValues = {name: data.input1, link: data.input2};
  const card = addCard(translatedValues);
  cardList.addItem(card);
  addForm.close();
})

const popupImage = new PopupWithImage("#image-container");

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = addCard(item);
    cardList.addItem(card);
  }
}, ".gallery__container");

formSelectors.forEach((selector) => {
  const validatedForm = new FormValidator(selector, validationObj);
  validatedForm.enableValidation();
});

cardList.renderItems();

bioForm.setEventListeners();

addForm.setEventListeners();

popupImage.setEventListeners();

editButton.addEventListener("click", () => {
  const inputPrefills = userBio.getUserInfo();
  inputName.value = inputPrefills.name;
  inputAbout.value = inputPrefills.job;
  bioForm.open();
});

addButton.addEventListener("click", () => {
  addForm.open();
})

