(function () {
  /* конфигурация */
  var width = 30.9; // ширина изображения/карточки
  var count = 2 // количество изображений/карточек для сдвига
  var offset = 16.0 + 3.6; // отступ

  var carousel = document.getElementById('carousel');
  var list = carousel.querySelector('.carousel ul');
  var listElems = carousel.querySelectorAll('.carousel li');

  var position = 0; // текущий сдвиг влево

  carousel.querySelector('.carousel__btn--left').onclick = function () {
    // сдвиг влево
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position + width * count, offset);
    list.style.marginLeft = position + 'rem';
  };

  carousel.querySelector('.carousel__btn--right').onclick = function () {
    // сдвиг вправо
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position - width * count, -width * (listElems.length - count));
    list.style.marginLeft = position + 'rem';
  };

  function changeParametres() {
    var screen = window.innerWidth;
    if (screen < 600) {
      count = 1;
    }
  }

  window.addEventListener('resize', changeParametres);
  document.addEventListener('DOMContentLoaded', changeParametres);
})();