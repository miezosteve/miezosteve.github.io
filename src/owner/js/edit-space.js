// eslint-disable-next-line func-names
(function () {
  const imageUpload = document.querySelector('#image-upload');
  const fileSelectBtn = document.querySelector('#file-select');
  const uploadZone = document.querySelector('#upload-zone');
  const addElement = (templateId = '', nodeId = '') => {
    const clone = document.querySelector(templateId).content.cloneNode(true);
    const node = document.querySelector(nodeId);
    node.appendChild(clone);
  };

  fileSelectBtn.addEventListener('click', (e) => {
    imageUpload.click();
    e.preventDefault();
  });

  // 用途定價
  // -- Add
  const usageAddBtn = document.querySelector('#usage-add');
  usageAddBtn.addEventListener('click', () => {
    addElement('#usage-template', '#usage-node');
  });

  // 營業時間
  // -- Toggle
  const dayNodeList = ['#mon', '#tue', '#wed', '#thu', '#fri', '#sat', '#sun'];
  dayNodeList.forEach((node, index) => {
    const day = document.querySelector(`${node} .day-check`);
    const startTime = document.querySelectorAll('.start-time')[index];
    const endTime = document.querySelectorAll('.end-time')[index];

    day.addEventListener('change', (e) => {
      startTime.classList.toggle('invisible');
      endTime.classList.toggle('invisible');
      day.blur();
    });
  });

  // 基礎設備
  // -- Add
  const defaultAmenityAddBtn = document.querySelector('#default-amenity-add');
  defaultAmenityAddBtn.addEventListener('click', () => {
    addElement('#default-amenity-template', '#default-amenity-node');
  });

  // 自訂設備
  // -- Add
  const otherAmenityAddBtn = document.querySelector('#other-amenity-add');
  otherAmenityAddBtn.addEventListener('click', () => {
    addElement('#other-amenity-template', '#other-amenity-node');
  });

  // 錄音設備
  // -- Toggle
  const recordingToggle = document.querySelector('#recording-provide-check');
  const recordingNode = document.querySelector('#recording-gear-node');
  recordingToggle.addEventListener('change', () => {
    recordingNode.classList.toggle('d-none');
    recordingToggle.blur();
  });
  // -- Add
  const recordingGearAddBtn = document.querySelector('#recording-gear-add');
  recordingGearAddBtn.addEventListener('click', () => {
    addElement('#recording-gear-template', '#recording-gear-node');
  });

  // 設備租借
  // -- Toggle
  const rentToggle = document.querySelector('#rent-check');
  const rentNode = document.querySelector('#rentable-gear-node');
  rentToggle.addEventListener('change', () => {
    rentNode.classList.toggle('d-none');
    rentToggle.blur();
  });
  // -- Add
  const rentableGearAddBtn = document.querySelector('#rentable-gear-add');
  rentableGearAddBtn.addEventListener('click', () => {
    addElement('#rentable-gear-template', '#rentable-gear-node');
  });
}());
