import "./index.css";
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import UserInfo from "../scripts/components/UserInfo.js";
import { validationObj, cardSelectorList, inputName, 
  inputJob, editButton, addButton, formSelectors, userSelectors, avatarButton } from "../scripts/utils/constants.js";

const userBio = new UserInfo({ selectors: userSelectors });

const projectApi = new Api("https://around.nomoreparties.co/v1/group-12", "1ef576b8-6d38-4f6c-aed4-fbb58187f608");

var me = await projectApi.getUserInfo();

var focusedObj = null;

userBio.setUserInfo(me)

userBio.setUserAvatar(me.avatar)

const initialCardList = await projectApi.getInitialCards();

const bioForm = new PopupWithForm("#edit-container", (data) => {
  bioForm.renderLoading(true);
  projectApi.updateUserData(data).then((res) => {
    me = res;
    userBio.setUserInfo(res);
  }).finally(() => {
    bioForm.renderLoading(false);
    bioForm.close();
  })
});

const addCard = (cardData) => {
  const cardItem = new Card({ data: cardData, 
  clickHandler: (title, link) => {popupImage.open(title, link)}, 
  likeHandler: (obj) => {
    if (!obj.isLiked) {
      obj.likeCard();
      projectApi.likeCard(obj.id)
      .then((res) => obj.setLikeCount(res.likes.length))}
    else {
      obj.unlikeCard();//it just feels bad putting this behind the server response, like the website is lagging, but I wil if I must//
      projectApi.unlikeCard(obj.id)
      .then((res) => obj.setLikeCount(res.likes.length))}
    }, 
  deleteHandler: (obj) => {
    focusedObj = obj;
    deleteConfirmaton.open();
  }, 
  userObj: me}, 
  cardSelectorList);
  if (cardData.owner._id === me._id) {
    const cardElement = cardItem.initiateCard(true);
    return cardElement;
  }
  const cardElement = cardItem.initiateCard(false);
  return cardElement;
}

const addForm = new PopupWithForm("#add-container", (data) => {
  addForm.renderLoading(true);
  projectApi.addNewCard(data).then((res) => {
    return addCard(res);
  }).then((element) => {
    cardList.addItem(element);
  }).finally(() => {
    addForm.renderLoading(false);
    addForm.close();
  })
})

const avatarForm = new PopupWithForm("#avatar-container", (data) => {
  avatarForm.renderLoading(true);
  projectApi.updateUserAvatar(data).then((res) => {
    userBio.setUserAvatar(res.avatar);
    me = res;
  }).finally(() => {
    avatarForm.renderLoading(false);
    avatarForm.close();
  })
})

const deleteConfirmaton = new PopupWithConfirmation("#delete-container", () => {
  projectApi.deleteCard(focusedObj.id).then(focusedObj.deleteCard())
  deleteConfirmaton.close();
  focusedObj = null;
})

const popupImage = new PopupWithImage("#image-container");

const cardList = new Section({
  items: initialCardList,
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

avatarForm.setEventListeners();

deleteConfirmaton.setEventListeners();

popupImage.setEventListeners();

editButton.addEventListener("click", () => {
  const inputPrefills = userBio.getUserInfo();
  bioForm.open();
  inputName.value = inputPrefills.name;
  inputJob.value = inputPrefills.about;
});

addButton.addEventListener("click", () => {
  addForm.open();
})

avatarButton.addEventListener("click", () => {
  avatarForm.open();
})

