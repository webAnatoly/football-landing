    /* конфигурация */
    var width = 309; // ширина изображения/карточки
    var count = 2 // количество изображений/карточек для сдвига

    var carousel = document.getElementById('carousel');
    var list = carousel.querySelector('.carousel ul');
    var listElems = carousel.querySelectorAll('.carousel li');


    var position = 0; // текущий сдвиг влево

    carousel.querySelector('.carousel__btn--left').onclick = function () {
      // сдвиг влево
      // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
      position = Math.min(position + width * count, 160 + 36);
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.carousel__btn--right').onclick = function () {
      // сдвиг вправо
      // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
      position = Math.max(position - width * count, -width * (listElems.length - count));
      list.style.marginLeft = position + 'px';
    };