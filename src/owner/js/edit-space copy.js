/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

// #region ===Global Variables===
const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad'];
const scrollContent = mobileDevice.some((e) => navigator.userAgent.match(e)) ? window : document.querySelector('.main-content');
const itemNameArr = ['usage', 'default-amenity', 'other-amenity', 'recording-gear', 'renting-gear', 'rule'];
const switchIdArr = ['#recording-gear', '#renting-gear'];
const parentNodeArr = itemNameArr.map((item) => document.querySelector(`#${item}-node`));
const addBtnArr = itemNameArr.map((item) => document.querySelector(`#${item}-add`));
const templateArr = itemNameArr.map((item) => document.querySelector(`#${item}-template`));
let accordionIdx = 0;
// #endregion

// #region ===Global Function===
function setItemDataIndex(itemName = '') {
  const itemNodeArr = document.querySelectorAll(`.${itemName}`);

  itemNodeArr.forEach((item, idx) => {
    item.setAttribute(`data-${itemName}`, idx);
  });
}

function setBtnDataIndex(itemName = '') {
  const btnList = itemName === 'thumbnail' ? document.querySelectorAll(`.${itemName} .delete-thumbnail`) : document.querySelectorAll(`.${itemName} .control-btn`);

  btnList.forEach((btn, idx) => {
    btn.setAttribute(`data-${itemName}-btn`, idx);
  });
}

function setDeleteBtn(deleteBtn, itemName, parentNode) {
  deleteBtn.addEventListener('click', () => {
    const btnIndex = deleteBtn.getAttribute(`data-${itemName}-btn`);
    const targetItem = document.querySelectorAll(`.${itemName}`)[btnIndex];
    parentNode.removeChild(targetItem);

    setItemDataIndex(itemName);
    setBtnDataIndex(itemName);
  });
}

function setAddBtn() {
  addBtnArr.forEach((addBtn, idx) => {
    addBtn.addEventListener('click', () => {
      const itemName = itemNameArr[idx];
      const parentNode = parentNodeArr[idx];
      const templateClone = templateArr[idx].content.cloneNode(true);
      const deleteBtn = templateClone.querySelector('.control-btn');

      setDeleteBtn(deleteBtn, itemName, parentNode);
      parentNode.appendChild(templateClone);

      setItemDataIndex(itemName);
      setBtnDataIndex(itemName);
    });
  });
}

function setTimeSwitch() {
  const switchArr = document.querySelectorAll('.day-check');
  const startTimeArr = document.querySelectorAll('.start-time');
  const endTimeArr = document.querySelectorAll('.end-time');
  switchArr.forEach((item, idx) => {
    item.addEventListener('change', () => {
      startTimeArr[idx].classList.toggle('invisible');
      endTimeArr[idx].classList.toggle('invisible');
      item.blur();
    });
  });
}

function setToggleSwitch() {
  switchIdArr.forEach((id) => {
    const node = document.querySelector(`${id}-check`);
    node.addEventListener('change', () => {
      const target = document.querySelector(`${id}-node`);
      target.classList.toggle('d-none');
      node.blur();
    });
  });
}

function wordsCounter(el, parentId = '') {
  const wordsCount = el.value.trim().length;
  const counter = document.querySelector(`#${parentId} .words-counter`);
  const maxCount = +el.getAttribute('maxlength');
  counter.innerText = `${wordsCount}/${maxCount}`;

  if (wordsCount === maxCount) {
    el.classList.add('input-invalid');
  } else {
    el.classList.remove('input-invalid');
  }
}

function setStepBtn() {
  const contentIdArr = ['#info-content', '#price-content', '#amenity-content', '#rules-content', '#description-content'];
  const nextStepBtnArr = document.querySelectorAll('.next-step');
  const preStepBtnArr = document.querySelectorAll('.pre-step');
  const targetNodeArr = contentIdArr.map((id) => document.querySelector(id));

  nextStepBtnArr.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetNode = targetNodeArr[accordionIdx + 1];
      const nowNodes = targetNodeArr[accordionIdx];

      // eslint-disable-next-line no-undef
      const bsCollapseClose = new bootstrap.Collapse(nowNodes, {
        toggle: true,
      });
      // eslint-disable-next-line no-undef
      const bsCollapseOpen = new bootstrap.Collapse(targetNode, {
        toggle: true,
      });
    });
  });

  preStepBtnArr.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      const targetNode = targetNodeArr[accordionIdx - 1];
      const nowNodes = targetNodeArr[accordionIdx];

      // eslint-disable-next-line no-undef
      const bsCollapseClose = new bootstrap.Collapse(nowNodes, {
        toggle: true,
      });
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        const bsCollapseOpen = new bootstrap.Collapse(targetNode, {
          toggle: true,
        });
      }, 200);
    });
  });
}

// scroll to top
const accordionCollapses = document.querySelectorAll('.accordion-collapse');
const FIRST_ITEM_OFFSET_TOP = accordionCollapses[0].offsetTop + 5;

accordionCollapses.forEach((item, index) => {
  item.addEventListener('shown.bs.collapse', (e) => {
    accordionIdx = index;

    const SCROLL_OFFSET = item.offsetTop - FIRST_ITEM_OFFSET_TOP;

    scrollContent.scroll({
      top: SCROLL_OFFSET,
      left: 0,
      behavior: 'smooth',
    });
  });
});

setAddBtn();
setTimeSwitch();
setToggleSwitch();
setStepBtn();

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
const briefDescription = document.querySelector('#brief-description');
briefDescription.addEventListener('input', (e) => {
  const inputElement = e.target;
  wordsCounter(inputElement, 'info-content');
});

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
const uploadBtn = document.querySelector('#thumbnail-add');
const fileInput = document.querySelector('#image-upload');
const thumbnailNode = document.querySelector('#thumbnail-node');

function createThumbnail(fileUrlArr) {
  fileUrlArr.forEach((url) => {
    const clone = document.querySelector('#thumbnail-template').content.cloneNode(true);
    const deleteBtn = clone.querySelector('.delete-thumbnail');
    const image = clone.querySelector('.image-container');
    const uploadBtnNode = document.querySelector('.upload-btn');

    image.setAttribute('style', `background-image: url('${url}')`);
    deleteBtn.addEventListener('click', (e) => {
      const target = e.target.parentNode;
      thumbnailNode.removeChild(target);
      setItemDataIndex('thumbnail');
      setBtnDataIndex('thumbnail');
    });

    // setDeleteBtn(deleteBtn, 'thumbnail', thumbnailNode);
    thumbnailNode.insertBefore(clone, uploadBtnNode);
    setItemDataIndex('thumbnail');
    setBtnDataIndex('thumbnail');
  });
}

fileInput.addEventListener('change', (e) => {
  const fileUrlArr = [...e.target.files].map((file) => URL.createObjectURL(file));
  createThumbnail(fileUrlArr);
});

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

// eslint-disable-next-line no-undef
const sortable = Sortable.create(thumbnailNode, {
  draggable: '.thumbnail',
  swapThreshold: 1,
  animation: 200,
  easing: 'cubic-bezier(1, 0, 0, 1)',
});

// #endregion

// #region ===時租定價===
const cost = {
  capacity: '',
  minHour: '',
  usageList: [],
  operatingTime: [],
};

// ---空間限制
const capacityInput = document.querySelector('#capacity');
capacityInput.addEventListener('keyup', (e) => {
  const rule = '^[0-9]*$';
  const regex = new RegExp(rule);
  const value = +e.target.value;

  if (regex.test(value)) {
    capacityInput.classList.remove('input-invalid');
  } else {
    capacityInput.classList.add('input-invalid');
  }
});
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
function recordingHandler(el) {

}

// ---設備租借
function rentingHandler(el) {

}
// #endregion

// #region ===場地公約===

// #endregion

// #region ===場地特點===

// #endregion
