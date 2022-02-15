/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

// #region ===Global Function===
function setItemDataSet(itemName = '') {
  const itemList = document.querySelectorAll(`.${itemName}`);
  itemList.forEach((item, index) => {
    item.setAttribute(`data-${itemName}`, index);
  });
}

function setBtnDataSet(itemName = '') {
  const btnList = document.querySelectorAll(`.${itemName} .control-btn`);
  btnList.forEach((item, index) => {
    item.setAttribute(`data-${itemName}-btn`, index);
  });
}

function appendTemplate(el, itemName = '') {
  const templateId = `#${itemName}-template`;
  const nodeId = `${itemName}-node`;
  const itemIndex = document.querySelectorAll(`.${itemName}`).length;

  const clone = document.querySelector(templateId).content.cloneNode(true);
  document.querySelector(`#${nodeId}`).appendChild(clone);
  setItemDataSet(itemName);
  setBtnDataSet(itemName);
}

function removeElement(el, itemName = '') {
  const nodeId = `#${itemName}-node`;
  const itemIndex = el.getAttribute(`data-${itemName}-btn`);
  const targetItem = document.querySelectorAll(`.${itemName}`)[itemIndex];
  document.querySelector(nodeId).removeChild(targetItem);
  setItemDataSet(itemName);
  setBtnDataSet(itemName);
}

function wordsCounter(el, parentId = '') {
  const wordsCount = el.value.trim().length;
  const counter = document.querySelector(`#${parentId} .words-counter`);
  const maxCount = el.getAttribute('maxlength');
  counter.innerText = `${wordsCount}/${maxCount}`;

  if (wordsCount === +maxCount) {
    el.classList.toggle('input-invalid');
  }
}
// #endregion

// #region ===空間資訊===
const info = {
  name: '',
  location: {
    city: '',
    district: '',
    address: '',
  },
  description: '',
  activities: [],
  photo: [],
};
// ---名稱
function spaceNameHandler(el) {

}

// ---地址
function cityHandler(el) {

}
function districtHandler(el) {

}
function addressHandler(el) {

}

// ---介紹
function descriptionHandler(el) {

}
function descriptionWordsCounter(el) {
  wordsCounter(el, 'info-content');
}

// ---活動
function activityHandler(el) {
  const { activities } = info;
  if (!activities.includes(el.value)) {
    activities.push(el.value);
    return;
  }

  const idx = activities.indexOf(el.value);
  activities.splice(idx, 1);
}

// ---照片
const uploadZone = document.querySelector('#upload-zone');
function uploadHandler(e) {
  const imageUpload = document.querySelector('#image-upload');
  imageUpload.click();
  e.preventDefault();
}
function showThumbnail(files) {
  const uploadBtn = document.querySelector('.upload-btn');
  const fileArr = [...files];
  const urlList = fileArr.map((file) => URL.createObjectURL(file));
  urlList.forEach((url) => {
    const clone = document.querySelector('#thumbnail-template').content.cloneNode(true);
    const thumbnail = clone.querySelector('.thumbnail');
    thumbnail.setAttribute('style', `background-image: url(${url})`);
    uploadZone.insertBefore(clone, uploadBtn);
  });
}
function deleteThumbnail(el) {
  uploadZone.removeChild(el.parentNode);
}
// #endregion

// #region ===時租定價===
const cost = {
  capacity: '',
  minHour: '',
  usageList: [],
  operatingTime: [],
};

// ---空間限制
function capacityHandler(el) {

}
function minHourHandler(el) {

}

// ---用途定價
const newUsage = {
  idx: 0,
  forWhat: '',
  unitPrice: '',
};
function usageHandler(el) {

}

// ---營業時間
function timeSwitchHandler(el) {
  const day = el.parentNode.parentNode.id;
  const startTimeSelect = document.querySelector(`#${day} .start-time`);
  const endTimeSelect = document.querySelector(`#${day} .end-time`);

  startTimeSelect.classList.toggle('invisible');
  endTimeSelect.classList.toggle('invisible');
  el.blur();
}
function startTimeHandler(el) {

}
function endTimeHandler(el) {

}
// #endregion

// #region ===設施設備===
const amenity = {
  default: [],
  other: [],
  recording: [],
  renting: [],
};

// ---基礎設備
function defaultAmenityHandler(el) {

}

// ---自訂設備
function otherAmenityHandler(el) {

}

// ---錄音設備
function recordingSwitchHandler() {
  const targetNode = document.querySelector('#recording-gear-node');

  targetNode.classList.toggle('d-none');
}
function recordingHandler(el) {

}

// ---設備租借
function rentingSwitchHandler() {
  const targetNode = document.querySelector('#renting-gear-node');

  targetNode.classList.toggle('d-none');
}
function rentingHandler(el) {

}
// #endregion

// #region ===場地公約===

// #endregion

// #region ===場地特點===

// #endregion

