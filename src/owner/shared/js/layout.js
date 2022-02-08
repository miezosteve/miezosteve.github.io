// eslint-disable-next-line func-names
(function () {
  const burgerBtn = document.querySelector('.burger');
  const activeBurgerBtn = () => {
    burgerBtn.classList.toggle('active');
  };
  const setBodyOverflow = () => {
    const body = document.querySelector('body');
    body.classList.toggle('overflow-hidden');
  };
  burgerBtn.addEventListener('click', () => {
    activeBurgerBtn();
    setBodyOverflow();
  });

  const thisYear = {
    data() {
      return {
        thisYear: new Date().getFullYear(),
      };
    },
  };

  // eslint-disable-next-line no-undef
  Vue.createApp(thisYear).mount('#footer');
}());
