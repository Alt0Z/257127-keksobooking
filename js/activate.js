'use strict';

(function () {
  window.mainPinButton = document.querySelector('.map__pin--main');
  window.address = document.querySelector('#address');
  window.address.value = '0, 0';

  window.isMapActive = function () {
    window.map.classList.contains('map--faded');
  };

  window.getCoords = function (pin) {
    var box = pin.getBoundingClientRect();

    return {
      top: (box.top + pageYOffset) - window.MAIN_PIN_HEIGHT,
      left: (box.left + pageXOffset) - window.MAIN_PIN_WIDTH / 2
    };

  };
})();
