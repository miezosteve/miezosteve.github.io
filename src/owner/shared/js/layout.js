// eslint-disable-next-line func-names
(function () {
  const burgerBtn = document.querySelector('.burger');
  const activeBurgerBtn = () => {
    burgerBtn.classList.toggle('active');
  };
  burgerBtn.addEventListener('click', activeBurgerBtn);

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
