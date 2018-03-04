'use strict';

(function () {
  window.getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.deleteChildren = function (el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }
  };
})();
