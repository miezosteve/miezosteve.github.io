const parentNode = document.querySelector('#customer-node');

for (let i = 0; i < 8; i++) {
  const clone = document.querySelector('#customer-template').content.cloneNode(true);
  parentNode.appendChild(clone);
}
