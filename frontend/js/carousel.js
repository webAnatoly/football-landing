(function () {
  /* конфигурация */
  var width = 34.5; // ширина слайда (ширина карточки 30.9 + margin-right 3.6)
  var count = 3 // количество слайдов для сдвига для десктоп версии

  var carousel = document.getElementById('carousel');
  var list = carousel.querySelector('.carousel ul');
  var indicators = carousel.querySelector('.carousel__indicators');
  var listElems = carousel.querySelectorAll('.carousel li');

  var position = 0; // текущий сдвиг влево

  carousel.querySelector('.carousel__btn--left').onclick = function () {
    // сдвиг вправо
    // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
    position = Math.min(position + width * count, 0);
    list.style.marginLeft = position + 'rem';
  };

  carousel.querySelector('.carousel__btn--right').onclick = function () {
    // сдвиг влево
    // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
    position = Math.max(position - width * count, -width * (listElems.length - count));
    list.style.marginLeft = position + 'rem';
  };

  function centerCard(viewPort, modifier) {
    // сдвинуть весь ul таким образом, чтобы карточка оказалась по центру
    var cardWidth = parseInt(getComputedStyle(document.querySelector('.card')).width);

    if (!modifier) { // для мобилы сдвигать так, чтобы одна карточка была по центру
      list.style.transform = 'translateX(' + (viewPort - cardWidth) / 2 + 'px)';
    } else { // для планшета сдвигать так, чтобы две карточки были по центру
      list.style.transform = 'translateX(' + (viewPort - (cardWidth * 2) - modifier) / 2 + 'px)';
    }
  }

  function changeParametres() {
    var screen = window.innerWidth;
    if (screen < 600) { // phones - для телефонов двигать по одной карточке
      position = 0;
      count = 1;
      centerCard(screen);
    } else if (screen < 1200) { // tablets - для планшетов двигать по две карточки
      count = 2;
      var modifier = parseInt(getComputedStyle(document.querySelector('div.carousel__row ul li')).marginRight);
      centerCard(screen, modifier);
    } else {
      count = 3; // desctop - для десктопа двигать по три карточки
    }
  }

  // Определить кол-во фрагментов для показа. Например если слайдер из 9 карточек и показываться будет по три карточки, то фрагментов будет 9/3 = 3
  function getQuantityFragments(divisor) {
    var fragments = Math.ceil(listElems.length / divisor);
    return fragments;
  }

  // обработчик клика на индикаторе
  function clickHandler(event) {
    if (event.target.dataset) {
      console.log(event.target.dataset.indicatorKey);
      // тут надо от текущего елемента пройти циклом и удалить все предыдущие классы css цветов
      // и потом от текущего добавить новые от тёмного к светлом
      // так же нужно перелеснуть слайды, если кликнули на третьем, то перелестуть на третий фрагмент и т.д.
    }
  }

  // В соответствии с кол-вом фрагментов(шагов) сгенерить и добавить дивы с классом 'carousel__indicators__indicator' и data-indicator-key каждому div'y
  function createIndicators(howMuch) {
    if (typeof howMuch !== "number") { return }
    var wrapper = document.createElement('div');
    for (var n = 0; n < howMuch; n += 1) {
      var div = document.createElement('div');
      div.className = "carousel__indicators__indicator";
      div.dataset.indicatorKey = n;
      div.addEventListener('click', clickHandler);
      wrapper.appendChild(div);
    }
    // перед вставкой удалить прошлый элементы
    var prev = indicators.firstElementChild;
    if (prev) {
      indicators.removeChild(indicators.firstElementChild);
    }
    indicators.appendChild(wrapper);
  }

  // функция разукрашивает индикаторы путём добавления css классов
  function colorIndicators(currentIndex) { 
    indicators = document.querySelectorAll('.carousel__indicators__indicator');
    indicators.forEach(function(div) {
      if(Number(div.dataset.indicatorKey) === 1) {
        div.classList.add("indicator-color-7");
        console.log(div.classList);
      } else {
        div.classList.add("indicator-color-3");
      }
    })
  }

  window.addEventListener('resize', function() {
    changeParametres();
    createIndicators(getQuantityFragments(count));
    setTimeout(function(){ colorIndicators(1) }, 0); // обернул в setTimeout, чтобы функция colorIndicators сработала, только после завершения функции createIndicators
  })
  document.addEventListener('DOMContentLoaded', function() {
    changeParametres();
    createIndicators(getQuantityFragments(count));
    setTimeout(function(){ colorIndicators(1) }, 0); // обернул в setTimeout, чтобы функция colorIndicators сработала, только после завершения функции createIndicators
  });
})();


// [TO DO] Реализовать следующий функционал:
// 1. При загрузке и ресайзе страницы определять кол-во фрагментов/шагов слайдера. Т.е. если картинок в слайдере 9 и мы собираемся их показывать по 3 штуки, то кол-во фрагментов/шагов будет три.
// 2. В соответствии с кол - вом фрагментов(шагов) сгенерить и добавить в дум div с классом 'carousel__indicators__indicator' и data-indicator-key каждому div'y
// 3. В массиве или объекте учитывать кол-во фрагментов и какой именно фрагмент/шаг сейчас показывается
// 4. Текущему индикатору присвоить самый темный цвет, остальным (влево и вправо) пошагово светлее, светлее и т.д. Всего семь цветов. Присваивать можно циклом, через classList.add();

// 5. Вычислить позиции для всех фрагментов.
// 6. Навесить обработчики клика на каждый индикатор со смещением по клику на вычисленную позицию.